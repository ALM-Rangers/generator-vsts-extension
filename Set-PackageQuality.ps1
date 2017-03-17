param
(
        [ValidateSet("nuget","npm")][string] $feedType = "nuget",
        [string] $feedName="",
        [string] $packageId="",
        [string] $packageVersion="",
        [string] $packageQuality="",
        [switch] $pester
)

#global variables
$account = ($env:SYSTEM_TEAMFOUNDATIONSERVERURI -replace "https://(.*)\.visualstudio\.com/", '$1').split('.')[0]
$basepackageurl = ("https://{0}.pkgs.visualstudio.com/DefaultCollection/_apis/packaging/feeds" -f $account)

Write-Debug  "basepackageurl=$basepackageurl"

<#
.Synopsis
Creates either a Basic Authentication token or a Bearer token depending on where the method is called from VSTS. 
When you send a Personal Access Token that you generate in VSTS it uses this one. Within the VSTS pipeline it uses env:System_AccessToken 
#>
function New-VSTSAuthenticationToken
{
    [CmdletBinding()]
    [OutputType([object])]
         
    $accesstoken = "";
    if([string]::IsNullOrEmpty($env:System_AccessToken)) 
    {
        if([string]::IsNullOrEmpty($env:PersonalAccessToken))
        {
            throw "No token provided. Use either env:PersonalAccessToken for Localruns or use in VSTS Build/Release (System_AccessToken)"
        } 
        Write-Debug $($env:PersonalAccessToken)
        $userpass = ":$($env:PersonalAccessToken)"
        $encodedCreds = [System.Convert]::ToBase64String([System.Text.Encoding]::ASCII.GetBytes($userpass))
        $accesstoken = "Basic $encodedCreds"
    }
    else 
    {
        $accesstoken = "Bearer $env:System_AccessToken"
    }

    return $accesstoken;
}


function Set-PackageQuality
{
    [CmdletBinding()]
    [OutputType([object])]
    param
    (
        [string] $feedType="nuget",
        [string] $feedName="",
        [string] $packageId="",
        [string] $packageVersion="",
        [string] $packageQuality=""
        
    )

    $token = New-VSTSAuthenticationToken
    
    #API URL is slightly different for npm vs. nuget...
    switch($feedType)
    {
        "npm" { $releaseViewURL = "$basepackageurl/$feedName/npm/$packageId/versions/$($packageVersion)?api-version=3.0-preview.1" }
        "nuget" { $releaseViewURL = "$basepackageurl/$feedName/nuget/packages/$packageId/versions/$($packageVersion)?api-version=3.0-preview.1" }
        default { $releaseViewURL = "$basepackageurl/$feedName/nuget/packages/$packageId/versions/$($packageVersion)?api-version=3.0-preview.1" }
    }
    
    #Queue a new build for this definition
    $json = @{
        views = @{
            op = "add"
            path = "/views/-"
            value = "$packageQuality"
        }
    }
    
    $response = Invoke-RestMethod -Uri $releaseViewURL -Headers @{Authorization = $token} -ContentType "application/json" -Method Patch -Body (ConvertTo-Json $json)
    return $response
}


if (-not $pester)
{
    Set-PackageQuality -feedType $feedType -feedName $feedName -packageId $packageId -packageVersion $packageVersion -packageQuality $packageQuality
}