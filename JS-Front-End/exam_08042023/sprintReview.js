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


    const doCommand = {
        'Add New': (assignee, taskId, title, status, estimatedPoints) => {
            addNewTask(assignee, {taskId, title, status, estimatedPoints: Number(estimatedPoints)});
        }, 'Change Status': (assignee, taskId, newStatus) => {
            changeTaskStatus(assignee, taskId, newStatus);
        }, 'Remove Task': (assignee, index) => {
            removeTask(assignee, Number(index));
        }
    }

    for (const commandInput of array) {
        let splitInput = commandInput.split(':');
        let command = splitInput.shift();
        let assignee = splitInput.shift();
        doCommand[command](assignee, ...splitInput);
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
    console.log(
        successfulSprint ? 'Sprint was successful!' : 'Sprint was unsuccessful...'
    );

    function isAssigneeFound(assigneeName) {
        let found = assignees.find((a) => a.assignee === assigneeName);
        if (!found) {
            console.log(`Assignee ${assigneeName} does not exist on the board!`);
            return false;
        }
        return found;
    }

    function addNewTask(assigneeName, task) {
        let assigneeFound = isAssigneeFound(assigneeName);
        if (assigneeFound) {
            assigneeFound.tasks.push(task);
        }
    }

    function changeTaskStatus(assigneeName, taskId, newStatus) {
        let foundAssignee = isAssigneeFound(assigneeName);
        if (!foundAssignee) return;

        let foundTask = foundAssignee.tasks.find((t) => t.taskId === taskId);
        if (!foundTask) {
            console.log(`Task with ID ${taskId} does not exist for ${assigneeName}!`);
            return;
        }

        foundTask.status = newStatus;
    }

    function removeTask(assigneeName, index) {
        let foundAssignee = isAssigneeFound(assigneeName);

        if (!foundAssignee) return;

        if (index > foundAssignee.tasks.length - 1 || index < 0) {
            console.log('Index is out of range!');
            return;
        }

        foundAssignee.tasks = foundAssignee.tasks.filter((_, i) => i !== index);
    }


}