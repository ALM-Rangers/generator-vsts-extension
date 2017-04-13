# Team Services extension code generator

![VSTS](https://almrangers.visualstudio.com/_apis/public/build/definitions/7f3cfb9a-d1cb-4e66-9d36-1af87b906fe9/137/badge) | [![NPM](https://nodei.co/npm/generator-team-services-extension.png?mini=true)](https://www.npmjs.com/package/generator-team-services-extension)

> ![Gears](Gears.png) Interested how our CI/CD pipeline works behind the scenes? 
>
> Read [Set up a CI/CD pipeline for your Yeoman generator package](https://blogs.msdn.microsoft.com/visualstudioalmrangers/2017/04/12/set-up-a-cicd-pipeline-for-your-yeoman-generator-package/) to learn more. 

## Capabilities

**generator-team-services-extension** is a [Yeoman](http://yeoman.io/) generator that creates an extension for Visual Studio Team Services or Team Foundation Server.

The extension type can be :
- New hub extension
- Custom build or release task
- Widget dashboard

## Requirements

- [Node.js](http://nodejs.org/) with [NPM](https://www.npmjs.com/), Minimum version 6.9.5 LTS (https://nodejs.org/)
- [Yeoman](http://yeoman.io/) : npm install -g yo
- [Grunt](https://www.npmjs.com/package/grunt) : npm install -g grunt
- [Tfx-cli](https://www.npmjs.com/package/tfx-cli) : npm install -g tfx-cli
- [typescript (necessary for new hub extension)](https://www.npmjs.com/package/typescript) : npm install -g typescript

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

## Execute Unit Tests
- on the generator folder run this command

```bash
mocha test
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

We thank the following contributor(s): **Josh Garverick** and **Mikael Krief**

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
- [gulp](https://www.npmjs.com/package/gulp)
- [gulp-eslint](https://www.npmjs.com/package/gulp-eslint)
- [gulp-istanbul](https://www.npmjs.com/package/gulp-istanbul)
- [gulp-jshint](https://www.npmjs.com/package/gulp-jshint)
- [gulp-mocha](https://www.npmjs.com/package/gulp-mocha)
- [gulp-nsp](https://www.npmjs.com/package/gulp-nsp)
- [gulp-plumber](https://www.npmjs.com/package/gulp-plumber)
- [gulp-spawn-mocha](https://www.npmjs.com/package/gulp-spawn-mocha)
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
- [grunt-contrib-copy](https://www.npmjs.com/package/grunt-contrib-copy)
- [grunt-contrib-jasmine](https://www.npmjs.com/package/grunt-contrib-jasmine)
- [grunt-exec](https://www.npmjs.com/package/grunt-exec)
- [jasmine](https://www.npmjs.com/package/jasmine)
- [rimraf](https://www.npmjs.com/package/rimraf)
- [tfx-cli](https://www.npmjs.com/package/tfx-cli)

The DevOps assets folder contains scripts we have sourced from 3rd parties

- [Set-PackageQuality.ps1](https://roadtoalm.com/2017/01/16/programmatically-promote-your-package-quality-with-release-views-in-vsts/), by René van Osnabrugge
