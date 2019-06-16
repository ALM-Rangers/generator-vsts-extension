'use strict';
var path = require('path');
const sinon = require(`sinon`);
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var crypto = require('crypto');
var promise;
var spawnStub;

describe('generator-team-services-extension-task-Powershell', function () {

  var testPath = path.join(__dirname, '../TestsResults/' + crypto.randomBytes(20).toString('hex'));
  console.log(testPath);
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/taskitem'))
      .inDir(testPath)
      .withPrompts({
        extName: "TestextTask1",
        extId: "TestextTaskId1",
        extDescription: "Description of the task extension",
        publisherId: "fabrikam",
        taskName: "taskName1",
        friendlyName: "task 1",
        taskDescription: "Description of my task",
        taskType: "Deploy",
        taskScope: "Build",
        taskScripting: "PowerShell",
        useVS: true
      })
      .on(`error`, e => {
        assert.fail(e);
      })
      .on(`ready`, function (generator) {
        // This is called right before `generator.run()` is called
        // Stub the calls to spawnCommandSync
        spawnStub = sinon.stub(generator, `spawnCommandSync`);
      });
  });

  it('generator-team-services-extension-task-Powershell:Extension directory should be created', function () {
    assert.file(testPath + '/TestextTaskId1/');
  });





  it('generator-team-services-extension-task-Powershell:creates files', () => {
    var root = testPath + '/TestextTaskId1/TestextTaskId1/';
    var taskPath = root + 'taskName1/';
    assert.file([
      root + 'TestextTaskId1.csproj',
      root + 'package.json',
      root + 'vss-extension.json',
      root + 'static/images/logo.png',
      root + 'static/images/Screen1.png',
      root + 'license.md',
      root + 'overview.md',
      root + 'ThirdPartyNotices.txt',
      taskPath + 'taskName1.ps1',
      taskPath + 'task.json',
      taskPath + 'icon.png'
    ]);
    assert.fileContent(root + 'vss-extension.json', /"id": "TestextTaskId1"/);
    assert.fileContent(root + 'vss-extension.json', /"name": "TestextTask1"/);
  });

  it(`generator-team-services-extension-task-Powershell:npm install should be called`, () => {
    assert.equal(1, spawnStub.withArgs(`npm`, [`install`], { stdio: ['pipe', 'pipe', process.stderr] }).callCount, `npm install was not be called`);
  });


  it(`generator-team-services-extension-task-Powershell:npm run package should be called`, () => {
    assert.equal(1, spawnStub.withArgs(`npm`, ['run', 'package'], { stdio: ['pipe', 'pipe', process.stderr] }).callCount, `npm run package was not be called`);
  });

});



describe('generator-team-services-extension-task-TypeScript', function () {

  var testPath = path.join(__dirname, '../TestsResults/' + crypto.randomBytes(20).toString('hex'));
  console.log(testPath);
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/taskitem'))
      .inDir(testPath)
      .withPrompts({
        extName: "TestextTask1",
        extId: "TestextTaskId1",
        extDescription: "Description of the task extension",
        publisherId: "fabrikam",
        taskName: "taskName1",
        friendlyName: "task 1",
        taskDescription: "Description of my task",
        taskType: "Deploy",
        taskScope: "Build",
        taskScripting: "TypeScript",
        useVS: true
      })
      .on(`error`, e => {
        assert.fail(e);
      })
      .on(`ready`, function (generator) {
        // This is called right before `generator.run()` is called
        // Stub the calls to spawnCommandSync
        spawnStub = sinon.stub(generator, `spawnCommandSync`);
      });
  });

  it('generator-team-services-extension-task-TypeScript:Extension directory should be created', function () {
    assert.file(testPath + '/TestextTaskId1/');
  });


  it('generator-team-services-extension-task-TypeScript:creates files', () => {
    var root = testPath + '/TestextTaskId1/TestextTaskId1/';
    var taskPath = root + 'taskName1/';
    assert.file([
      root + 'TestextTaskId1.csproj',
      root + 'package.json',
      root + 'vss-extension.json',
      root + 'static/images/logo.png',
      root + 'static/images/Screen1.png',
      root + 'license.md',
      root + 'overview.md',
      root + 'ThirdPartyNotices.txt',
      root + 'tsconfig.json',
      taskPath + 'taskName1.ts',
      taskPath + 'package.json',
      taskPath + 'task.json',
      taskPath + 'icon.png'
    ]);

    assert.fileContent(root + 'vss-extension.json', /"id": "TestextTaskId1"/);
    assert.fileContent(root + 'vss-extension.json', /"name": "TestextTask1"/);
  });

  it(`generator-team-services-extension-task-TypeScript:npm install should be called`, () => {
    assert.equal(1, spawnStub.withArgs(`npm`, [`install`], { stdio: ['pipe', 'pipe', process.stderr] }).callCount, `npm install was not be called`);
  });

  it(`generator-team-services-extension-task-TypeScript:npm run install-task-lib should be called`, () => {
    assert.equal(1, spawnStub.withArgs(`npm`, ['run', 'install-task-lib'], { stdio: ['pipe', 'pipe', process.stderr] }).callCount, `npm run install-task-lib was not be called`);
  });

  it(`generator-team-services-extension-task-TypeScript:npm run package should be called`, () => {
    assert.equal(1, spawnStub.withArgs(`npm`, ['run', 'package'], { stdio: ['pipe', 'pipe', process.stderr] }).callCount, `npm run package was not be called`);
  });

});
