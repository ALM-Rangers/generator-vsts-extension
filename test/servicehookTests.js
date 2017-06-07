'use strict';
var path = require('path');
const sinon = require(`sinon`);
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var crypto = require('crypto');
var promise;
var spawnStub;

describe('generator-team-services-extension-servicehook', function () {

      var testPath = path.join(__dirname, '../TestsResults/' + crypto.randomBytes(20).toString('hex'));
      console.log(testPath);
      before(function () {
            return helpers.run(path.join(__dirname, '../generators/servicehook'))
                  .inDir(testPath)
                  .withPrompts({
                        extName: "Test1",
                        extId: "TestId1",
                        extDescription: "Description of the extension",
                        publisherId: "fabrikam",
                        extensionType: "ms.vss-web.hub",
                        hubPoint: "ms.vss-code-web.code-hub-group",
                        useAITelemetry: true,
                        consumername : "servicehookconsumerName",
                        friendlyName :"serviceHook1",
                        serviceDescription : "description of my service hook extension",
                        events : [ 'Build completed', 'Release abandoned', 'Code checked in' ],
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

      it('generator-team-services-extension-servicehook:Extension directory should be created', function () {
            assert.file(testPath + '/TestId1/');
      });


      it('generator-team-services-extension-servicehook:creates files', () => {
            var root = testPath + '\\TestId1\\TestId1\\';
            assert.file([
                  root + 'TestId1.csproj',
                  root + 'package.json',
                  root + 'vss-extension.json',
                  root + 'static/images/logo.png',
                  root + 'static/images/screen1.png',
                  root + 'license.md',
                  root + 'overview.md',                
                  root + 'ThirdPartyNotices.txt',
            ]);
            assert.fileContent(root + 'vss-extension.json', /"id": "TestId1"/);
            assert.fileContent(root + 'vss-extension.json', /"name": "Test1"/)
            assert.fileContent(root + 'vss-extension.json', /"type": "ms.vss-servicehooks.consumer"/)

      })

      it(`generator-team-services-extension-servicehook:npm install should be called`, () => {
            assert.equal(1, spawnStub.withArgs(`npm`, [`install`], { stdio: ['pipe', 'pipe', process.stderr] }).callCount, `npm install was not be called`);
      });

      it(`generator-team-services-extension-servicehook:npm run package should be called`, () => {
            assert.equal(1, spawnStub.withArgs(`npm`, [`run`, 'package'], { stdio: ['pipe', 'pipe', process.stderr] }).callCount, `npm run package was not be called`);
      });

});