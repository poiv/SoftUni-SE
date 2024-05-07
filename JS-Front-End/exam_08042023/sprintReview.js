function solve(array) {
    let n = Number(array.shift());
    let count = 0;

    let assignees = [];

    while (count < n) {
        let [assignee, taskId, title, status, estimatedPoints] = array.shift().split(':');

        let foundAssignee = assignees.find((a) => a.assignee === assignee);
        if (foundAssignee) {
            foundAssignee.tasks.push({taskId, title, status, estimatedPoints: Number(estimatedPoints)});
        } else {
            assignees.push({assignee, tasks: [{taskId, title, status, estimatedPoints: Number(estimatedPoints)}]});
        }

        count++;
    }

    for (const commandInput of array) {
        let splitInput = commandInput.split(':');
        let command = splitInput.shift();
        let assignee = splitInput.shift();
        switch (command) {
            case 'Add New':
                let [taskId, title, status, estimatedPoints] = splitInput;
                let task = {taskId, title, status, estimatedPoints: Number(estimatedPoints)};
                addNewTask(assignee, task);
                break;
            case 'Change Status':
                changeTaskStatus(assignee, splitInput[0], splitInput[1]);
                break;
            case 'Remove Task':
                removeTask(assignee, Number(splitInput[0]));
                break;
        }
    }

    function getStatusCount(status) {
        let byStatus = assignees.flatMap((a) => a.tasks).filter((t) => t.status === status);
        return byStatus.reduce((a, cv) => {
            return a + cv.estimatedPoints
        }, 0);
    }

    let toDoPoints = getStatusCount('ToDo');
    let inProgressPoints = getStatusCount('In Progress');
    let codeReviewPoints = getStatusCount('Code Review');
    let donePoints = getStatusCount('Done');

    console.log(`ToDo: ${toDoPoints}pts`);
    console.log(`In Progress: ${inProgressPoints}pts`);
    console.log(`Code Review: ${codeReviewPoints}pts`);
    console.log(`Done Points: ${donePoints}pts`);

    let successfulSprint = donePoints >= (inProgressPoints + codeReviewPoints + toDoPoints);
    if (successfulSprint) {
        console.log('Sprint was successful!');
        return;
    }
    console.log('Sprint was unsuccessful...');

    function isAssigneeFound(assigneeName){
        let found = assignees.find((a) => a.assignee === assigneeName);
        if (!found) {
            console.log(`Assignee ${assigneeName} does not exist on the board!`);
            return false;
        }
        return found;
    }

    function addNewTask(assigneeName, task) {
        let assigneeFound = isAssigneeFound(assigneeName);
        if(assigneeFound){
            assigneeFound.tasks.push(task);
        }
    }

    function changeTaskStatus(assigneeName, taskId, newStatus) {
        let foundAssignee = assignees.find((a) => a.assignee === assigneeName);
        if (!foundAssignee) {
            console.log(`Assignee ${assigneeName} does not exist on the board!`);
            return;
        }

        let foundTask = foundAssignee.tasks.find((t) => t.taskId === taskId);
        if (!foundTask) {
            console.log(`Task with ID ${taskId} does not exist for ${assigneeName}!`);
            return;
        }

        foundTask.status = newStatus;
    }

    function removeTask(assigneeName, index) {
        let foundAssignee = assignees.find((a) => a.assignee === assigneeName);
        if (!foundAssignee) {
            console.log(`Assignee ${assigneeName} does not exist on the board!`);
            return;
        }

        if (index > foundAssignee.tasks.length - 1 || index < 0) {
            console.log('Index is out of range!');
            return;
        }

        foundAssignee.tasks = foundAssignee.tasks.filter((_, i) => i !== index);
    }


}
