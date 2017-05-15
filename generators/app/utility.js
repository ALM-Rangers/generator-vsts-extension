function reconcileValue(first, second, fallback) {
      return first ? first : (second ? second : fallback);
}


function validateRequired(input, msg) {
      return !input ? msg : true;
}

function validateExtensionId(input) {
      if (!input) {
            return `You must provide a id for your extension`
      } else {
            if (input.indexOf(' ') >= 0) {
                  return `The extension Id not containt space`;
            } else {
                  return true;
            }
      }
}

function validateExtensionName(input) {
      return validateRequired(input, `You must provide a name for your extension`);
}

function validateExtensionType(input) {
      return validateRequired(input, `You must provide a type for your extension`);
}

function validateHubPoint(input) {
      return validateRequired(input, `You must select a hub point`);
}

function validateActionPoint(input) {
      return validateRequired(input, `You must select a action point`);
}


function validateActionMenuArea(input) {
      return validateRequired(input, `You must select a menu area`);
}



function validateTaskName(input) {
      return validateRequired(input, `You must provide a name for your task`);
}
function validateTaskFiendlyName(input) {
      return validateRequired(input, `You must provide a friendly name for your task`);
}

function validateTaskType(input) {
      return validateRequired(input, `You must provide a type for your task`);
}

function validateTaskVisibility(input) {
      return validateRequired(input, `You must provide a visibility for your task`);
}

function validateTaskScripting(input) {
      return validateRequired(input, `You must provide a script mode for your task`);
}

function validateWidgetId(input) {
      return validateRequired(input, `You must provide an Id for your widget`);
}
function validateWidgetFriendlyName(input) {
      return validateRequired(input, `You must provide a friendly name for your widget`);
}

function getHubPoint() {
      return [
            { name: 'Home', value: setHubPoint('ms.vss-web.home-hub-group') },
            { name: 'Code', value: setHubPoint('ms.vss-code-web.code-hub-group') },
            { name: 'Work', value: setHubPoint('ms.vss-work-web.work-hub-group') },
            { name: 'Build', value: setHubPoint("ms.vss-build-web.build-hub-group,ms.vss-build-web.build-release-hub-group") },
            { name: 'Release', value: setHubPoint('ms.vss-releaseManagement-web.hub-group-rm,ms.vss-build-web.build-release-hub-group') },
            { name: 'Test', value: setHubPoint('ms.vss-test-web.test-hub-group') },
            { name: 'Project Collection Admin', value: setHubPoint('ms.vss-web.collection-admin-hub-group') },
            { name: 'Project Admin', value: setHubPoint('ms.vss-web.project-admin-hub-group') }];
}

function setHubPoint(points) {
      var listtarget = [];
      var point = points.split(',')
      point.forEach(function (element) {
            listtarget.push(element)
      }, this);
      return listtarget;

}

function setJsonTaskScript(scriptMode, taskname) {
      var jsonproperty = "";
      if (scriptMode == "PowerShell") {
            jsonproperty = {
                  "PowerShell3": { "target": "$(currentDirectory)\\" + taskname + ".ps1", "argumentFormat": "", "workingDirectory": "$(currentDirectory)" }
            }
      } else if (scriptMode == "TypeScript") {
            jsonproperty = {
                  "Node": {
                        "target": "" + taskname + ".js"

                  }
            }
      }
      return jsonproperty;
}

module.exports = {

      // Exports the portions of the file we want to share with files that require
      // it.

      reconcileValue: reconcileValue,
      validateExtensionName: validateExtensionName,
      validateExtensionId: validateExtensionId,
      validateExtensionType: validateExtensionType,
      validateHubPoint: validateHubPoint,
      validateActionPoint: validateActionPoint,
      validateActionMenuArea: validateActionMenuArea,
      validateTaskName: validateTaskName,
      validateTaskFiendlyName: validateTaskFiendlyName,
      validateTaskType: validateTaskType,
      validateTaskVisibility: validateTaskVisibility,
      validateTaskScripting :validateTaskScripting,
      getHubPoint: getHubPoint,
      setJsonTaskScript: setJsonTaskScript


};