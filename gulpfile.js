const gulp = require('gulp');
const mocha = require('gulp-spawn-mocha');
const jshint = require('gulp-jshint');
var istanbul = require('gulp-istanbul');
var gulpNSP = require('gulp-nsp');
var plumber = require('gulp-plumber');

gulp.task('test', function () {
   return gulp
      .src('test/*Tests.js')
      .pipe(plumber())
      .pipe(mocha({
         istanbul: true,
         reporter: "xunit-file"
      }))
      .pipe(istanbul.writeReports(
         {
            dir: './coverage',
            reporters: ['cobertura','html'],
            reportOpts: { dir: './coverage' }
         }
      ))
      .pipe(gulp.dest('./dist'));
});


gulp.task('lint',['test'], function () {
   return gulp
      .src('{generators,test}/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
})

//To check your project 
gulp.task('nsp', function (cb) {
  gulpNSP({package: __dirname + '/package.json'}, cb);
});

gulp.task('default', function () {
   // place code for your default task here
   var watcher = gulp.watch('{generators,test}/**/*.js', ['lint']);
   watcher.on('change', function (event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
   });
});