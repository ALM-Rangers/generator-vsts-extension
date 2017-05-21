'use strict';
const path = require('path');
const util = require(`../app/utility`);
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var uuid = require('uuid');
var ejs = require('ejs');

function construct() {
      // Calling the super constructor is important so our generator is correctly set up
      generators.Base.apply(this, arguments);

      this.argument('extName', { type: String, required: false, desc: 'Name of the extension' });
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
                  message: 'Please enter an ID of your extension:',
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
                  message: 'Please enter the name of your Marketplace publisher ID:',
                  default: 'fabrikam',
                  when: answers => {
                        return cmdLnInput.publisherId === undefined;
                  }
            },

            {
                  type: 'input',
                  name: 'connsumername',
                  message: 'Please enter the consumer name (Id) of your service hooks:',
                  store: true,
                  default: 'consumer',
                  validate: util.validateTaskName,
                  when: answers => {
                        return cmdLnInput.taskName === undefined;
                  }
            }, {
                  type: 'input',
                  name: 'friendlyName',
                  message: 'Please enter the friendly (display) name of your consumer service:',
                  store: true,
                  default: 'My Task',
                  validate: util.validateTaskFiendlyName,
                  when: answers => {
                        return cmdLnInput.friendlyName === undefined;
                  }
            }, {
                  type: 'input',
                  name: 'serviceDescription',
                  message: 'Please enter a description for your consumer service:',
                  store: true,
                  default: 'My Task makes tasks great again',
                  when: answers => {
                        return cmdLnInput.taskDescription === undefined;
                  }
            },
            {
                  type: 'checkbox',
                  name: 'events',
                  message: 'Please select the service hooks events:',
                  choices: ['Build completed', 'Release created', 'Release abandoned', 'Release deployment approval completed', 'Release deployment approval pending',
                        'Release deployment completed', 'Release deployment started', 'Code checked in', 'Code pushed', 'Pull request created', 'Pull request merge commit created',
                        'Pull request updated', 'Work item commented on', 'Work item created', 'Work item deleted', 'Work item restored', 'Work item updated'
                  ],
                  store: true,
                  when: answers => {
                        return cmdLnInput.events === undefined;
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
            }]).then(function (a) {
                  // Transfer answers to local object for use in the rest of the generator
                  this.extName = util.reconcileValue(a.extName, cmdLnInput.extName);
                  this.extId = util.reconcileValue(a.extId, cmdLnInput.extId);
                  this.extDescription = util.reconcileValue(a.extDescription, cmdLnInput.extDescription);
                  this.publisherId = util.reconcileValue(a.publisherId, cmdLnInput.publisherId);
                  this.connsumername = util.reconcileValue(a.connsumername, cmdLnInput.connsumername);
                  this.friendlyName = util.reconcileValue(a.friendlyName, cmdLnInput.friendlyName);
                  this.events = util.reconcileValue(a.events, cmdLnInput.events);
                  this.serviceDescription = util.reconcileValue(a.serviceDescription, cmdLnInput.serviceDescription);
                  this.useVS = util.reconcileValue(a.useVS, cmdLnInput.useVS);
            }.bind(this));
}


function writeFiles() {

      var tokens = {
            ExtensionName: this.extName,
            PublisherId: this.publisherId,
            Description: this.extDescription,
            ExtensionID: this.extId,
            connsumername: this.connsumername,
            events: util.setEventsText(this.events).normalize(),
            guid: uuid(),
            taskDescription: this.taskDescription,
            friendlyName: this.friendlyName
      }

      var src = this.sourceRoot();
      var root = this.extId;
      var extensionFolder = root + "/" + this.extId
      if (!this.useVS) {
            extensionFolder = root
      }

      this.fs.copy(
            this.templatePath('static/**/*'),
            this.destinationPath(extensionFolder + '/static/')
      );

      this.fs.copyTpl(
            this.templatePath('vss-extension.json'),
            this.destinationPath(extensionFolder + '/vss-extension.json'), tokens
      );
      this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath(extensionFolder + '/package.json'),
            tokens
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

      //Copy gitignore
      this.fs.copyTpl(
            this.templatePath('file.gitignore'),
            this.destinationPath(this.extId + '/' + '.gitignore')
      );

      if (this.useVS) {
            this.fs.copyTpl(
                  this.templatePath('extId.csproj'),
                  this.destinationPath(extensionFolder + '/' + this.extId + '.csproj'), tokens
            );


            this.fs.copyTpl(
                  this.templatePath('extId.sln'),
                  this.destinationPath(this.extId + '/' + this.extId + '.sln'), tokens
            );

      }
}

function install() {
      var npmdir = process.cwd() + '/' + this.extId;
      process.chdir(npmdir);
      //console.log(JSON.stringify(this.taskScope));
      this.installDependencies();
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


      this.log(`+ Running npm run package for vsix generating`);

      this.spawnCommandSync('npm', ['run', 'package'], { stdio: ['pipe', 'pipe', process.stderr] });

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
