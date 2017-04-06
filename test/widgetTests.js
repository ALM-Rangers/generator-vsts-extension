'use strict';
var path = require('path');
const sinon = require(`sinon`);
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var crypto = require('crypto');
var promise;
var spawnStub;

describe('generator-team-services-extension:widget', function () {

      var testPath = path.join(__dirname, '../TestsResults/' + crypto.randomBytes(20).toString('hex'));
      console.log(testPath);
      before(function () {
            return helpers.run(path.join(__dirname, '../generators/widget'))
                  .inDir(testPath)
                  .withPrompts({
                        extName: "Test1",
                        extId: "TestId1",
                        extDescription: "Description of the extension",
                        publisherId: "fabrikam",
                        widgetId: "widgetid1",
                        widgetFriendlyName: "widget 1",
                        widgetDescription: "Description of my widget",
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

      it('Extension directory should be created', function () {
            assert.file(testPath + '/TestId1/');
      });





      it('creates files', () => {
            var root = testPath + '\\TestId1\\TestId1\\';
            assert.file([
                  root + 'gruntfile.js',
                  root + 'TestId1.csproj',
                  root + 'typings.json',
                  root + 'package.json',
                  root + 'vss-extension.json',
                  root + 'test/TestSpec.js',
                  root + '.vscode/tasks.json',
                  root + 'src/main.ts',
                  root + 'src/configuration.ts',
                  root + 'static/index.html',
                  root + 'static/configuration.html',
                  root + 'static/images/logo.png',
                  root + 'static/images/screen1.png',
                  root + 'static/css/app.css',
                  root + 'license.md',
                  root + 'overview.md',
                  root + 'ThirdPartyNotices.txt',
            ]);
            assert.fileContent(root + 'vss-extension.json', /"id": "TestId1"/);
            assert.fileContent(root + 'vss-extension.json', /"name": "Test1"/);
          




      })

      it(`npm install should be called`, () => {
            assert.equal(1, spawnStub.withArgs(`npm`, [`install`], { stdio: ['pipe', 'pipe', process.stderr] }).callCount, `npm install was not be called`);
      });

      it(`npm run build should be called`, () => {
            assert.equal(1, spawnStub.withArgs(`npm`, [`run`, 'build'], { stdio: ['pipe', 'pipe', process.stderr] }).callCount, `npm run build was not be called`);
      });



});