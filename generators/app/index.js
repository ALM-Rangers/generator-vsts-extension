// This is the main entry point of the generator.  The heavy lifting is done in the
// sub generator vsts.  I separated them so I could compose with language generators.
const url = require('url');
const util = require('./utility');
const yosay = require('yosay');
var chalk = require('chalk');
const generators = require('yeoman-generator');


function construct() {
   // Calling the super constructor is important so our generator is correctly set up
   generators.Base.apply(this, arguments);

   // Order is important
   // These are position based arguments for this generator. If they are not provided
   // via the command line they will be queried during the prompting priority
   this.argument('type', { type: String, required: false, desc: 'Extension type to create (hub, taskitem or widgetitem)' });
}


// Store all the values collected from the command line so we can pass to 
// sub generators. I also use this to determine which data I still need to
// prompt for.
function init() {
    this.log(yosay('Welcome to Team Services Extensions\n' + 'v.' + this.rootGeneratorVersion()));

}


// Collect any missing data from the user.
function input() {


   // Collect any missing data from the user.
   // This gives me access to the generator in the
   // when callbacks of prompt
   let cmdLnInput = this;

   return this.prompt([
      {
         type: 'list',
         name: 'type',
         store: true,
         message: 'What type of extension do you want to create?',
         default: cmdLnInput.type,
         choices: [
            {
               name: 'Extension Hub',
               value: 'hub'
            },
            {
               name: 'Build/Release custom Task',
               value: 'taskitem'
            },
            {
               name: 'Widget dashboard',
               value: 'widget'
            }
         ],
         when: function () {
            return cmdLnInput.type === undefined;
         }
      }

   ]).then(function (answers) {
      // Transfer answers to global object for use in the rest of the generator
      this.type = util.reconcileValue(answers.type, cmdLnInput.type);
      this.extName = util.reconcileValue(answers.extName, cmdLnInput.extName);
   }.bind(this));
}

// Based on the users answers compose all the required generators.
function configGenerators() {
   if (this.type === 'hub') {
       this.composeWith('team-services-extension:hub');
   } else if (this.type === 'taskitem') {
       this.composeWith('team-services-extension:taskitem');
   } else if (this.type === 'widget') {
       this.composeWith('team-services-extension:widget');
   }

}

module.exports = generators.Base.extend({
   // The name `constructor` is important here
   constructor: construct,

   // 1. Your initialization methods (checking current project state, getting configs, etc)
   initializing: init,

   // 2. Where you prompt users for options (where you'd call this.prompt())
   prompting: input,

   // 3. Saving configurations and configure the project (creating .editorconfig files and other metadata files)
   configuring: configGenerators,

   // 4. default - If the method name doesn't match a priority, it will be pushed to this group.

   // 5. Where you write the generator specific files (routes, controllers, etc)
   writing: undefined,

   // 6. conflicts - Where conflicts are handled (used internally)

   // 7. Where installation are run (npm, bower)
   install: undefined,

   // 8. Called last, cleanup, say good bye, etc
   end: undefined
});