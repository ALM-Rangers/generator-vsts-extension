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
         type: 'list',
         name: 'extensionType',
         store: true,
         message: 'Please select the type of Hub extension you would like to create:',
         default: 'ms.vss-web.hub',
         validate: util.validateExtensionType,
         choices: [
            { name: 'New Hub', value: 'ms.vss-web.hub' },
            { name: 'Menu action', value: 'ms.vss-web.action' }
         ],
         when: answers => {
            return cmdLnInput.extensionType === undefined;
         }
      }, {
         type: 'list',
         name: 'hubPoint',
         store: true,
         message: 'Please select the type of hub group you would like to target:',
         validate: util.validateHubPoint,
         choices: util.getHubPoint,
         when: answers => {
            return (answers.extensionType === 'ms.vss-web.hub' || cmdLnInput.extensionType === 'ms.vss-web.hub') && cmdLnInput.hubPoint === undefined;
         },
      }, {
         type: 'list',
         name: 'menuPoint',
         store: true,
         default: 'Code',
         validate: util.validateActionPoint,
         message: 'Please select the type of menu you would like to target:',
         choices: ['Home', 'Code', 'Work', 'Build', 'Release', 'Test', 'Admin'],
         when: answers => {
            return answers.extensionType === 'ms.vss-web.action' && cmdLnInput.menuPoint === undefined;
         }
      }, {
         type: 'list',
         name: 'menuPointType',
         store: true,
         message: 'Please select the menu area you would like to target:',
         validate: util.validateActionMenuArea,
         choices: [
            {
               name: 'Collection overview toolbar',
               value: 'ms.vss-admin-web.collection-overview-toolbar-menu'
            },
            { name: 'Collection overview projects grid', value: 'ms.vss-admin-web.projects-grid-menu' },
            { name: 'Project overview toolbar', value: 'ms.vss-admin-web.project-overview-toolbar-menu' },
            { name: 'Project overview teams grid', value: 'ms.vss-admin-web.teams-grid-menu' }],
         when: answers => {
            return answers.menuPoint === 'Home';
         }
      }, {

         type: 'list',
         name: 'menuPointType',
         store: true,
         validate: util.validateActionMenuArea,
         message: 'Please select the menu area you would like to target:',
         choices: [
            { name: 'Completed build menu', value: 'ms.vss-build-web.completed-build-menu' },
            { name: 'Build definitions menu', value: 'ms.vss-build-web.build-definition-menu' }],
         when: answers => {
            return answers.menuPoint == 'Build';
         }

      }, {

         type: 'list',
         name: 'menuPointType',
         store: true,
         validate: util.validateActionMenuArea,
         message: 'Please select the menu area you would like to target:',
         choices: [
            { name: 'Release definition explorer context menu', value: 'ms.vss-releaseManagement-web.release-definition-explorer-context-menu' },
            { name: 'Release definition explorer toolbar menu', value: 'ms.vss-releaseManagement-web.release-definition-explorer-toolbar-menu' },
            { name: 'Release summary toolbar menu', value: 'ms.vss-releaseManagement-web.release-editor-tool-bar-menu' },
            { name: 'Release summary tab', value: 'ms.vss-releaseManagement-web.release-details-view' },
            { name: 'Release summary section', value: 'ms.vss-releaseManagement-web.release-details-summary-tab' }],
         when: answers => {
            return answers.menuPoint == 'Release';
         }
      }, {

         type: 'list',
         name: 'menuPointType',
         store: true,
         validate: util.validateActionMenuArea,
         message: 'Please select the menu area you would like to target:',
         choices: [
            { name: 'Source item (grid) menu', value: 'ms.vss-code-web.source-grid-item-menu' },
            { name: 'Source item (tree) menu', value: 'ms.vss-code-web.source-tree-item-menu' },
            { name: 'Source item (grid and tree) menu', value: 'ms.vss-code-web.source-item-menu' },
            { name: 'Change list item menu', value: 'ms.vss-code-web.change-list-item-menu' },
            { name: 'Change list summary item menu', value: 'ms.vss-code-web.change-list-summary-item-menu' },
            { name: 'Git branches tree menu', value: 'ms.vss-code-web.git-branches-tree-menu' },
            { name: 'Git branches summary menu', value: 'ms.vss-code-web.git-branches-summary-grid-menu' },
            { name: 'Git branches diff summary menu', value: 'ms.vss-code-web.git-branches-summary-grid-diff-menu' }],
         when: answers => {
            return answers.menuPoint == 'Code';
         }
      }, {

         type: 'list',
         name: 'menuPointType',
         store: true,
         validate: util.validateActionMenuArea,
         message: 'Please select the menu area you would like to target:',
         choices: [
            { name: 'Test run toolbar', value: 'ms.vss-test-web.test-run-toolbar-menu' },
            { name: 'Test run grid menu', value: 'ms.vss-test-web.test-run-grid-menu' },
            { name: 'Test plan suites toolbar', value: 'ms.vss-test-web.test-plans-suites-toolbar' },
            { name: 'Test plan suites tree menu', value: 'ms.vss-test-web.test-plans-suites-context' },
            { name: 'Test plan hub pivot tab', value: 'ms.vss-test-web.test-plan-pivot-tabs' }],
         when: answers => {
            return answers.menuPoint == 'Test';
         }
      }, {

         type: 'list',
         name: 'menuPointType',
         store: true,
         validate: util.validateActionMenuArea,
         default: `ms.vss-work-web.work-item-query-menu`,
         message: 'Please select the menu area you would like to target:',
         choices: [
            { name: 'Work item query menu', value: 'ms.vss-work-web.work-item-query-menu' },
            { name: 'Work item query results toolbar menu', value: 'ms.vss-work-web.work-item-query-results-toolbar-menu' },
            { name: 'Work item toolbar', value: 'ms.vss-work-web.work-item-toolbar-menu' },
            { name: 'Backlog item menu', value: 'ms.vss-work-web.backlog-item-menu' },
            { name: 'Sprint board pivot filter menu', value: 'ms.vss-work-web.sprint-board-pivot-filter-menu' },
            { name: 'Board pivot filter menu', value: 'ms.vss-work-web.backlog-board-pivot-filter-menu' },
            { name: 'Card menu', value: 'ms.vss-work-web.backlog-board-card-item-menu' },
            { name: 'Product backlog tab', value: 'ms.vss-work-web.product-backlog-tabs' },
            { name: 'Iteration backlog tab', value: 'ms.vss-work-web.iteration-backlog-tabs' },
            { name: 'Portfolio backlog pane', value: 'ms.vss-work-web.portfolio-backlog-toolpane' },
            { name: 'Product backlog pane', value: 'ms.vss-work-web.requirement-backlog-toolpane' },
            { name: 'Iteration backlog pane', value: 'ms.vss-work-web.iteration-backlog-toolpane' }],
         when: answers => {
            return answers.menuPoint == 'Work';
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
         this.extensionType = util.reconcileValue(answers.extensionType, cmdLnInput.extensionType);
         this.hubPoint = util.reconcileValue(answers.hubPoint, cmdLnInput.hubPoint);
         this.menuPoint = util.reconcileValue(answers.menuPoint, cmdLnInput.menuPoint);
         this.menuPointType = util.reconcileValue(answers.menuPointType, cmdLnInput.menuPointType);
         this.useVS = util.reconcileValue(answers.useVS, cmdLnInput.useVS);
      }.bind(this));
}

function writeFiles() {

   var tokens = {
      ExtensionName: this.extName,
      PublisherId: this.publisherId,
      ExtensionType: this.extensionType,
      TargetType: this.extensionType == 'ms.vss-web.hub' ? JSON.stringify(this.hubPoint) : JSON.stringify(this.menuPointType),
      Description: this.extDescription,
      ExtensionID: this.extId
   };

   var src = this.sourceRoot();
   var root = this.extName;
   var extensionFolder = root + "/" + this.extName
   if(!this.useVS){
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
         this.destinationPath(root + '/' +'.gitignore')
   );

   //Copy all assets for the extension
   this.fs.copy(
      this.templatePath('src/**/*'),
      this.destinationPath(extensionFolder + '/src/')
   );

   this.fs.copy(
      this.templatePath('static/**/*'),
      this.destinationPath(extensionFolder + '/static/')
   );

   this.fs.copy(
      this.templatePath('css/**/*'),
      this.destinationPath(extensionFolder + '/css/')
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
      this.templatePath('settings.tfx.json'),
      this.destinationPath(extensionFolder + '/settings.tfx.json'), tokens
   );

   this.fs.copyTpl(
      this.templatePath('gruntfile.js'),
      this.destinationPath(extensionFolder + '/gruntfile.js')
   );

   this.fs.copyTpl(
      this.templatePath('typings.json'),
      this.destinationPath(extensionFolder + '/typings.json')
   );

   if (this.useVS) {
      this.fs.copyTpl(
         this.templatePath('extId.csproj'),
         this.destinationPath(extensionFolder + '/' + this.extName + '.csproj')
      );


      this.fs.copyTpl(
         this.templatePath('extId.sln'),
         this.destinationPath(root + '/' + this.extName + '.sln'), tokens
      );

   }

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

   this.log(`+ Running grunt copy`);
   this.spawnCommandSync('grunt', ['copy'], { stdio: ['pipe', 'pipe', process.stderr] });

   this.log(`+ Running grunt for compile typescript and create package for vsix generating`);
   process.chdir(that.destinationRoot() + "\\" + extensionFolder);
   this.spawnCommandSync('grunt', ['exec:typescriptCompile'], { stdio: ['pipe', 'pipe', process.stderr] });
   this.spawnCommandSync('grunt', ['exec:package'], { stdio: ['pipe', 'pipe', process.stderr] });

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
