# Yeoman-extension-code-generator
>  Team Foundation Server and Team Services extension code generator.

## Build status
![VSTS](https://almrangers.visualstudio.com/_apis/public/build/definitions/7f3cfb9a-d1cb-4e66-9d36-1af87b906fe9/137/badge)

## Capabilities
Generator-vsts-ext is [Yeoman](http://yeoman.io/) generator that create an extension for Visual Studio Team Services or Team Foundation Server.

The extension type can be :
- New hub extension
- Custom build or release task

## Requirements
- [Node.js](http://nodejs.org/) with [NPM](https://www.npmjs.com/), Minimum version 6.9.5 LTS (https://nodejs.org/)
- [Yeoman](http://yeoman.io/) : npm install -g yo
- [Grunt](https://www.npmjs.com/package/grunt) : npm install -g grunt
- [Tfx-cli](https://www.npmjs.com/package/tfx-cli) : npm install -g tfx-cli
- [typescript (necessary for new hub extension)](https://www.npmjs.com/package/typescript) : npm install -g typescript

## Installation
First, install the generator

```bash
npm install -g generator-vsts-ext
```

Then generate your new extension project:

```bash
yo vsts-ext
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
gulp test
```

## Getting To Know Yeoman
 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

## Contributors
We thank the following contributor(s) : Josh Garverick and Mikael Krief

#Contribute
Contributions to this project are welcome. Here is how you can contribute:  

- Submit bugs and help us verify fixes  
- Submit pull requests for bug fixes and features and discuss existing proposals   

Please refer to [Contribution guidelines](.github/CONTRIBUTING.md) and the [Code of Conduct](.github/COC.md) for more details.

#Notices
Building this solution will download other software, subject to the third party license terms that are between you and the third party.

And npm dependencies list are :

- [chalk](https://www.npmjs.com/package/chalk)
- [eslint](https://www.npmjs.com/package/eslint)
- [eslint-config-xo-space :
(https://www.npmjs.com/package/eslint-config-xo-space](https://na01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Feslint-config-xo-space&data=02%7C01%7Cwillys%40microsoft.com%7C907c9b82cf61412f6b0508d457419347%7C72f988bf86f141af91ab2d7cd011db47%7C1%7C0%7C636229386549017901&sdata=IT0a%2BkuReH%2BJiMVd8hAhCXBbHxJ%2FseZxw7FIL0xptqA%3D&reserved=0)
- [fs-extra](https://www.npmjs.com/package/fs-extra](https://na01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ffs-extra&data=02%7C01%7Cwillys%40microsoft.com%7C907c9b82cf61412f6b0508d457419347%7C72f988bf86f141af91ab2d7cd011db47%7C1%7C0%7C636229386549017901&sdata=iuN1N%2BCf%2BvLl1YSaR81McxtxN2nwDtQM%2BZKfxBeDIm4%3D&reserved=0)
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