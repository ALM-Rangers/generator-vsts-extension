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
         message: 'Please enter the name of your marketplace publisher ID:',
         default: 'fabrikam',
         when: answers => {
             return cmdLnInput.publisherId === undefined;
         }
      },

      {
         type: 'input',
         name: 'taskName',
         message: 'Please enter the name of your task:',
         store: true,
         default: 'MyTask',
         validate: util.validateTaskName,
         when: answers => {
            return cmdLnInput.taskName === undefined;
         }
      }, {
         type: 'input',
         name: 'friendlyName',
         message: 'Please enter the friendly (display) name of your task:',
         store: true,
         default: 'My Task',
         validate: util.validateTaskFiendlyName,
         when: answers => {
            return cmdLnInput.friendlyName === undefined;
         }
      }, {
         type: 'input',
         name: 'taskDescription',
         message: 'Please enter a description for your task:',
         store: true,
         default: 'My Task makes tasks great again',
         when: answers => {
            return cmdLnInput.taskDescription === undefined;
         }
      }, {
         type: 'list',
         name: 'taskType',
         message: 'Please select the type of task you would like to create:',
         choices: ['Build', 'Deploy', 'Package', 'Test', 'Utility'],
         validate: util.validateTaskType,
         when: answers => {
            return cmdLnInput.taskType === undefined;
         }
      }, {
         type: 'checkbox',
         name: 'taskScope',
         message: 'Please select the visibility level for your task (check all that apply):',
         choices: ["Build", "Release"],
         validate: util.validateTaskVisibility,
         when: answers => {
            return cmdLnInput.taskScope === undefined;
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
         this.taskName = util.reconcileValue(a.taskName, cmdLnInput.taskName);
         this.friendlyName = util.reconcileValue(a.friendlyName, cmdLnInput.friendlyName);
         this.taskDescription = util.reconcileValue(a.taskDescription, cmdLnInput.taskDescription);
         this.taskType = util.reconcileValue(a.taskType, cmdLnInput.taskType);
         this.taskScope = util.reconcileValue(a.taskScope, cmdLnInput.taskScope);
         this.useVS = util.reconcileValue(a.useVS, cmdLnInput.useVS);
      }.bind(this));
}


function writeFiles() {



   var tokens = {
      ExtensionName: this.extName,
      PublisherId: this.publisherId,
      Description: this.extDescription,
      ExtensionID: this.extId,
      taskName: this.taskName,
      guid: uuid(),
      visibility: JSON.stringify(this.taskScope),
      category: this.taskType,
      taskDescription: this.taskDescription,
      friendlyName: this.friendlyName
   }

   var src = this.sourceRoot();
   var root = this.extName;
   var extensionFolder = root + "/" + this.extName
   if(!this.useVS){
      extensionFolder = root
   }
   var taskFolder = extensionFolder + "/" + this.taskName

   this.fs.copy(
      this.templatePath('static/**/*'),
      this.destinationPath(extensionFolder + '/static/')
   );

   this.fs.copyTpl(
      this.templatePath('Task/task.ps1'),
      this.destinationPath(taskFolder + '/' + this.taskName + '.ps1'), tokens

   );

   this.fs.copyTpl(
      this.templatePath('Task/task.json'),
      this.destinationPath(taskFolder + '/task.json'), tokens

   );
   this.fs.copy(
      this.templatePath('Task/icon.png'),
      this.destinationPath(taskFolder + '/icon.png')
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
         this.destinationPath(this.extName  + '/' +'.gitignore')
   );

   if (this.useVS) {
      this.fs.copyTpl(
         this.templatePath('extId.csproj'),
         this.destinationPath(extensionFolder + '/' + this.extName + '.csproj'), tokens
      );


      this.fs.copyTpl(
         this.templatePath('extId.sln'),
         this.destinationPath(this.extName + '/' + this.extName + '.sln'), tokens
      );

   }
}

function install() {
   var npmdir = process.cwd() + '/' + this.extName;
   process.chdir(npmdir);
   console.log(JSON.stringify(this.taskScope));
   this.installDependencies();
}


function install() {

   var done = this.async();
   var that = this;
   var extensionFolder = this.extName + "/" + this.extName
    if(!this.useVS){
      extensionFolder = this.extName
   }

   process.chdir(`${extensionFolder}`);
   this.log(`+ Running npm install on ${extensionFolder}`);

   // I don't want to see the output of this command
   this.spawnCommandSync('npm', ['install'], { stdio: ['pipe', 'pipe', process.stderr] });

   this.log(`+ Running npm run package for vsix generating`);
   process.chdir(that.destinationRoot() + "\\" + extensionFolder);
   this.spawnCommandSync('npm', ['run','package'], { stdio: ['pipe', 'pipe', process.stderr] });

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
