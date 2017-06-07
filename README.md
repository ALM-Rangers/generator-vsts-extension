# Team Services extension code generator

![VSTS](https://almrangers.visualstudio.com/_apis/public/build/definitions/7f3cfb9a-d1cb-4e66-9d36-1af87b906fe9/137/badge) | [![NPM](https://nodei.co/npm/generator-team-services-extension.png?mini=true)](https://www.npmjs.com/package/generator-team-services-extension)

> ![Gears](Gears.png) Interested how our CI/CD pipeline works? Read [Set up a CI/CD pipeline for your Yeoman generator package](https://blogs.msdn.microsoft.com/visualstudioalmrangers/2017/04/12/set-up-a-cicd-pipeline-for-your-yeoman-generator-package/) to learn more. 

## Capabilities

**generator-team-services-extension** is a [Yeoman](http://yeoman.io/) generator that creates an extension for Visual Studio Team Services or Team Foundation Server.

The extension type can be :
- New hub extension
- Custom build or release task
- Widget dashboard
- Service hooks consumer

## Requirements

- [Node.js](http://nodejs.org/) with [NPM](https://www.npmjs.com/), Minimum version 6.9.5 LTS (https://nodejs.org/)
- [Yeoman](http://yeoman.io/) : npm install -g yo
- (Optional) Microsoft Azure subscription for monitoring with Application Insights

## Installation

First, install the generator

```bash
npm install -g generator-team-services-extension
```

Then generate your new extension project:

```bash
yo team-services-extension
```

## Test this generator locally

- clone this repository
- with command prompt navigate to the package folder and run this command for link npm package on this folder
Use [npm link](https://docs.npmjs.com/cli/link)

```bash
npm link
```
## Debug this generator using [Visual Studio Code](https://code.visualstudio.com/)
- Click **Debug** in the VS Code **Activity Bar**
- Click Configure (gear icon right to Configuration dropdown)
- Select **Node.js**
- From the configuration dropdown click **Add Configuration** 
- Popup will show with a list of available configruations, select **Node.js: Yeoman generator**
- Change **args** value to generator name: **team-services-extension**

The final configuration should looks like below

```bash
{    
    "version": "0.2.0",
    
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Yeoman generator",
            "program": "${workspaceRoot}/node_modules/yo/lib/cli.js",
            "args": [
                "team-services-extension"
            ],
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen"
        }
    ]
}
```

## Execute Unit Tests
- on the generator folder run this command

```bash
npm run test
```

## Getting started

### Generated templates

We've included **//TODO:** placeholders in the generated license, thirdpartynotices, and overview files to guide you through the changes you need to make.

### Visual Studio Teams Service Web Extension

Take a look at the information on getting started with extensions, RESTful APIs, SDK, and the marketplace. I

- [Overview](https://www.visualstudio.com/en-us/docs/integrate/extensions/overview)
- [RESTful API Library](https://www.visualstudio.com/en-us/docs/integrate/api/overview)
- [SDK](https://github.com/Microsoft/vss-web-extension-sdk)
- [VSTS Marketplace](https://marketplace.visualstudio.com/VSTS)
- [Samples](https://github.com/Microsoft/vsts-extension-samples)

### Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## Contributions

### Team

We thank the following contributor(s): **Josh Garverick** , **Mikael Krief** and **Hosam Kamel**

### Contributions are welcome

Here is how you can contribute to this project:  

- Submit bugs and help us verify fixes  
- Submit pull requests for bug fixes and features and discuss existing proposals   

Please refer to [Contribution guidelines](.github/CONTRIBUTING.md) and the [Code of Conduct](.github/COC.md) for more details.

### Notices

Building this solution will download other software, subject to the third party license terms that are between you and the third party.

And npm dependencies list are :

- [chalk](https://www.npmjs.com/package/chalk)
- [eslint](https://www.npmjs.com/package/eslint)
- [eslint-config-xo-space](https://www.npmjs.com/package/eslint-config-xo-space)
- [fs-extra](https://www.npmjs.com/package/fs-extra)
- [Istanbul](https://www.npmjs.com/package/istanbul)
- [jshint](https://www.npmjs.com/package/jshint)
- [Mocha](https://www.npmjs.com/package/mocha)
- [Sinon](https://www.npmjs.com/package/sinon)
- [snyk](https://www.npmjs.com/package/snyk)
- [Typescript](https://www.npmjs.com/package/typescript)
- [uuid](https://www.npmjs.com/package/uuid)
- [xunit-file](https://www.npmjs.com/package/xunit-file)
- [yeoman-assert](https://www.npmjs.com/package/yeoman-assert)
- [yeoman-generator](https://www.npmjs.com/package/yeoman-generator)
- [Yeoman-test](https://www.npmjs.com/package/yeoman-test)
- [Yo](https://www.npmjs.com/package/yo)
- [yosay](https://www.npmjs.com/package/yosay)

The generated extensions needs these 3 rd libraries

- [applicationinsights-js](https://www.npmjs.com/package/applicationinsights-js)
- [rimraf](https://www.npmjs.com/package/rimraf)
- [tfx-cli](https://www.npmjs.com/package/tfx-cli)
- [cpx](https://www.npmjs.com/package/cpx)
- [ts-loader](https://www.npmjs.com/package/ts-loader)
- [Typescript](https://www.npmjs.com/package/typescript)
- [tslint](https://www.npmjs.com/package/tslint)
- [tslint-loader](https://www.npmjs.com/package/tslint-loader)
- [webpack](https://www.npmjs.com/package/webpack)
- [telemetryclient-team-services-extension](https://www.npmjs.com/package/telemetryclient-team-services-extension)