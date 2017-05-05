import tl = require('vsts-task-lib/task');
//npm install vsts-task-lib

// Get task parameters
let variable1: string = tl.getPathInput('variable1', false, true);
let variable2: string = tl.getInput('variable2', true);



async function run() {
    try {
        //do your actions
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
