
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
   grunt.initConfig({
      pkg: grunt.file.readJSON("package.json"),
      settings: grunt.file.readJSON("settings.tfx.json"),
      exec: {
         package: {
            command: "tfx extension create --manifest-globs <%%= settings.package.manifestGlobs %> --rev-version",
            stdout: true,
            stderr: true
         },
         update: {
            command: "npm up --save-dev",
            stdout: true,
            stderr: true
         },
         publish: {
            command: "tfx extension publish --manifest-globs <%%= settings.package.manifestGlobs %> --share-with <%%= settings.publish.shareWith %> --token <%%= settings.publish.token %>",
            stdout: true,
            stderr: true
         }
      }
   });

   grunt.loadNpmTasks("grunt-exec");



};