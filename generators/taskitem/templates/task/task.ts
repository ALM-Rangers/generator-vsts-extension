import tl = require('vsts-task-lib/task');
//npm install vsts-task-lib

try {

    // Get task parameters
    let variable1: string = tl.getPathInput('variable1', false, true);
    let variable2: string = tl.getInput('variable2', true);

    //do your actions

}
catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
}