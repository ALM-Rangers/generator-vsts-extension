#
# <%= taskName %>.ps1
#
[CmdletBinding(DefaultParameterSetName = 'None')]
param(
	[string][Parameter(Mandatory=$true)] $variable1, 
	[string] $variable2
)

Write-Host "Starting <%= taskName %>"

#Run Save-Module -Name VstsTaskSdk -Path .\ for get the Powershell VSTS SDK
# see https://github.com/Microsoft/vsts-task-lib/tree/master/powershell/Docs
#Trace-VstsEnteringInvocation $MyInvocation

try {
Write-Host "variable 1: "$variable1
Write-Host "variable 2: "$variable2


} catch {

} finally {
	#Trace-VstsLeavingInvocation $MyInvocation
}

Write-Host "Ending <%= taskName %>"