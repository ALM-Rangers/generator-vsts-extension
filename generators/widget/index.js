'use strict';
const path = require('path');
const util = require(`../app/utility`);
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

function construct() {
      // Calling the super constructor is important so our generator is correctly set up
      generators.Base.apply(this, arguments);

      this.argument('extName', { type: String, required: false, desc: 'Name of the extension' });
      this.argument('extId', { type: String, required: false, desc: 'Id of the extension' });
      this.argument('extDescription', { type: String, required: false, desc: 'Description of the extension' });
      this.argument('publisherId', { type: String, required: false, desc: 'Your Marketplace publisher ID' });

}

function input() {

      // Collect any missing data from the user.
      // This gives me access to the generator in the
      // when callbacks of prompt
      let cmdLnInput = this;

      return this.prompt([
            {
                  type: 'input',
                  name: 'extName',
                  store: true,
                  message: 'Please enter the (friendly) name of your extension:',
                  validate: util.validateExtensionName,
                  default: 'My Extension',
                  when: answers => {
                        return cmdLnInput.extName === undefined;
                  }
            }, {
                  type: 'input',
                  name: 'extId',
                  store: true,
                  message: 'Please enter the ID of your extension:',
                  default: 'myextension',
                  validate: util.validateExtensionId,
                  when: answers => {
                        return cmdLnInput.extId === undefined;
                  }
            }, {
                  type: 'input',
                  name: 'extDescription',
                  store: true,
                  message: 'Please enter a description of your extension:',
                  default: 'My extension makes hubs great again',
                  when: answers => {
                        return cmdLnInput.extDescription === undefined;
                  }
            }, {
                  type: 'input',
                  name: 'publisherId',
                  store: true,
                  message: 'Please enter the name of your Marketplace Publisher ID:',
                  default: 'fabrikam',
                  when: answers => {
                        return cmdLnInput.publisherId === undefined;
                  }
            },


            {
                  type: 'input',
                  name: 'widgetId',
                  message: 'Please enter the name (Id) of your widget dashboard:',
                  store: true,
                  default: 'MyWidget',
                  validate: util.validateWidgetId,
                  when: answers => {
                        return cmdLnInput.widgetId === undefined;
                  }
            }, {
                  type: 'input',
                  name: 'widgetFriendlyName',
                  message: 'Please enter the friendly (display) name of your widget dashboard:',
                  store: true,
                  default: 'My Widget',
                  validate: util.validateWidgetFriendlyName,
                  when: answers => {
                        return cmdLnInput.widgetFriendlyName === undefined;
                  }
            }, {
                  type: 'input',
                  name: 'widgetDescription',
                  message: 'Please enter a description for your widget dashboard:',
                  store: true,
                  default: 'My Widget display some informations on my dashboard',
                  when: answers => {
                        return cmdLnInput.widgetDescription === undefined;
                  }
            },
            {
                  type: 'confirm',
                  name: 'useAITelemetry',
                  store: true,
                  message: 'Do you intend to use Application Insight telemetry ?',
                  when: answers => {
                        return cmdLnInput.useAITelemetry === undefined;
                  }
            },
            {
                  type: 'confirm',
                  name: 'setAIkey',
                  store: true,
                  message: 'Do you want to configure this extension with your Application Insight Instrumentation key ?',
                  when: answers => {
                        return answers.useAITelemetry === true;
                  }
            },
            {
                  type: 'input',
                  name: 'AIkey',
                  store: true,
                  message: 'Please enter your Application Insight Instrumentation Key:',
                  when: answers => {
                        return answers.setAIkey === true;
                  }
            },
            {
                  type: 'confirm',
                  name: 'useVS',
                  store: true,
                  message: 'Do you intend to use Visual Studio ?',
                  when: answers => {
                        return cmdLnInput.useVS === undefined;
                  }
            }]).then(function (answers) {
                  // Transfer answers to local object for use in the rest of the generator
                  this.extName = util.reconcileValue(answers.extName, cmdLnInput.extName);
                  this.extId = util.reconcileValue(answers.extId, cmdLnInput.extId);
                  this.extDescription = util.reconcileValue(answers.extDescription, cmdLnInput.extDescription);
                  this.publisherId = util.reconcileValue(answers.publisherId, cmdLnInput.publisherId);
                  this.widgetId = util.reconcileValue(answers.widgetId, cmdLnInput.widgetId);
                  this.widgetFriendlyName = util.reconcileValue(answers.widgetFriendlyName, cmdLnInput.widgetFriendlyName);
                  this.widgetDescription = util.reconcileValue(answers.widgetDescription, cmdLnInput.widgetDescription);
                  // Application Insight Telemetry
                  this.useAITelemetry = util.reconcileValue(answers.useAITelemetry, cmdLnInput.useAITelemetry);
                  this.setAIkey = util.reconcileValue(answers.setAIkey, cmdLnInput.setAIkey);
                  this.AIkey = util.reconcileValue(answers.AIkey, cmdLnInput.AIkey);
                  // ----------------------------
                  this.useVS = util.reconcileValue(answers.useVS, cmdLnInput.useVS);
            }.bind(this));
}

function writeFiles() {

      var tokens = {
            ExtensionName: this.extName,
            PublisherId: this.publisherId,
            Description: this.extDescription,
            ExtensionID: this.extId,
            WidgetId: this.widgetId,
            WidgetFriendlyName: this.widgetFriendlyName,
            WidgetDescription: this.widgetDescription,
            UseAITelemetry: this.useAITelemetry,
            InstrumentationKey: this.setAIkey == true ? this.AIkey : "__InstrumentationKey__"
      };

      var src = this.sourceRoot();
      var root = this.extId;
      var extensionFolder = root + "/" + this.extId
      if (!this.useVS) {
            extensionFolder = root
      }


      //Copy vscode folder
      this.fs.copy(
            this.templatePath('.vscode/**/*'),
            this.destinationPath(extensionFolder + '/.vscode/')
      );

      //Copy gitignore
      this.fs.copyTpl(
            this.templatePath('file.gitignore'),
            this.destinationPath(root + '/' + '.gitignore')
      );

      //Copy all assets for the extension
      this.fs.copyTpl(
            this.templatePath('src/main.ts'),
            this.destinationPath(extensionFolder + '/src/main.ts'), tokens
      );

      this.fs.copyTpl(
            this.templatePath('src/configuration.ts'),
            this.destinationPath(extensionFolder + '/src/configuration.ts'), tokens
      );

      if (this.useAITelemetry) {
            this.fs.copyTpl(
                  this.templatePath('src/telemetryClientSettings.ts'),
                  this.destinationPath(extensionFolder + '/src/telemetryClientSettings.ts'), tokens
            );
      }

      this.fs.copy(
            this.templatePath('static/images/*'),
            this.destinationPath(extensionFolder + '/static/images/')
      );

      this.fs.copy(
            this.templatePath('static/css/*'),
            this.destinationPath(extensionFolder + '/static/css/')
      );

      this.fs.copyTpl(
            this.templatePath('static/index.html'),
            this.destinationPath(extensionFolder + '/static/index.html'), tokens
      );

      this.fs.copyTpl(
            this.templatePath('static/configuration.html'),
            this.destinationPath(extensionFolder + '/static/configuration.html'), tokens
      );

      this.fs.copyTpl(
            this.templatePath('vss-extension.json'),
            this.destinationPath(extensionFolder + '/vss-extension.json'), tokens
      );
      this.fs.copyTpl(
            this.templatePath('license.md'),
            this.destinationPath(extensionFolder + '/license.md'), tokens
      );

      this.fs.copyTpl(
            this.templatePath('overview.md'),
            this.destinationPath(extensionFolder + '/overview.md'), tokens
      );

      this.fs.copyTpl(
            this.templatePath('ThirdPartyNotices.txt'),
            this.destinationPath(extensionFolder + '/ThirdPartyNotices.txt')
      );

      //Copy Tests folders
      this.fs.copy(
            this.templatePath('test/**/*'),
            this.destinationPath(extensionFolder + '/test/')
      );

      //Copy others files


      this.fs.copyTpl(
            this.templatePath('readme.md'),
            this.destinationPath(extensionFolder + '/readme.md'),
            tokens
      );

      this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath(extensionFolder + '/package.json'),
            tokens
      );

      this.fs.copyTpl(
            this.templatePath('tsconfig.json'),
            this.destinationPath(extensionFolder + '/tsconfig.json'),
            tokens
      );


      this.fs.copyTpl(
            this.templatePath('typings.json'),
            this.destinationPath(extensionFolder + '/typings.json')
      );

      this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath(extensionFolder + '/webpack.config.js')
      );

      this.fs.copyTpl(
            this.templatePath('tslint.json'),
            this.destinationPath(extensionFolder + '/tslint.json')
      );

      if (this.useVS) {
            this.fs.copyTpl(
                  this.templatePath('extId.csproj'),
                  this.destinationPath(extensionFolder + '/' + this.extId + '.csproj')
            );


            this.fs.copyTpl(
                  this.templatePath('extId.sln'),
                  this.destinationPath(root + '/' + this.extId + '.sln'), tokens
            );

      }

}


function install() {

      var done = this.async();
      var that = this;
      var extensionFolder = this.extId + "/" + this.extId
      if (!this.useVS) {
            extensionFolder = this.extId
      }

      process.chdir(`${extensionFolder}`);
      this.log(`+ Running npm install on ${extensionFolder}`);

      // I don't want to see the output of this command
      this.spawnCommandSync('npm', ['install'], { stdio: ['pipe', 'pipe', process.stderr] });

      this.log(`+ Running npm build for transpile typescript and create package for vsix generating`);

      this.spawnCommandSync('npm', ['run', 'build'], { stdio: ['pipe', 'pipe', process.stderr] });

      done();
      this.log(`Done`);
}


module.exports = generators.Base.extend({
      // 1. Your initialization methods (checking current project state, getting configs, etc)
      initializing: undefined,

      // 2. Where you prompt users for options (where you'd call this.prompt())
      prompting: input,

      // 3. Saving configurations and configure the project (creating .editorconfig files and other metadata files)
      configuring: undefined,

      // 4. default - If the method name doesn't match a priority, it will be pushed to this group.

      // 5. Where you write the generator specific files (routes, controllers, etc)
      writing: writeFiles,

      // 6. conflicts - Where conflicts are handled (used internally)

      // 7. Where installation are run (npm, bower)
      install: install,

      // 8. Called last, cleanup, say good bye, etc
      end: undefined
});
