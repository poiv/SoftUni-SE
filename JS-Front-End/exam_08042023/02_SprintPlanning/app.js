window.addEventListener('load', solve);

function solve() {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const label = document.getElementById('label');
    const points = document.getElementById('points');
    const assignee = document.getElementById('assignee');
    const createBtn = document.getElementById('create-task-btn');
    const deleteBtn = document.getElementById('delete-task-btn');

    const hiddenTaskId = document.getElementById('task-id');
    const totalSprintPoints = document.getElementById('total-sprint-points');

    const form = document.getElementById('create-task-form');

    const taskSection = document.getElementById('tasks-section');

    createBtn.addEventListener('click', onCreate);

    function onCreate(){
        if (isMissingInput()) return;

        const article = document.createElement('article');
        const labelDiv = document.createElement('div');
        const titleH3 = document.createElement('h3');
        const descriptionP = document.createElement('p');
        const pointsDiv = document.createElement('div');
        const assigneeDiv = document.createElement('div');
        const actionsDiv = document.createElement('div');
        const deleteBtn = document.createElement('button');

        article.id = `task-${taskSection.children.length-1}`;
        article.classList.add('task-card');
        labelDiv.classList.add('task-card-label');
        labelDiv.classList.add(getLabelClass());
        titleH3.classList.add('task-card-title');
        descriptionP.classList.add('task-card-description');
        pointsDiv.classList.add('task-card-points');
        assigneeDiv.classList.add('task-card-assignee');
        actionsDiv.classList.add('task-card-actions');

        taskSection.appendChild(article);
        article.appendChild(labelDiv);
        article.appendChild(titleH3);
        article.appendChild(descriptionP);
        article.appendChild(pointsDiv);
        article.appendChild(assigneeDiv);
        article.appendChild(actionsDiv);
        actionsDiv.appendChild(deleteBtn);

        labelDiv.innerHTML = `${label.value} ${getLabelSymbol[label.value]()}`
        titleH3.textContent = title.value;
        descriptionP.textContent = description.value;
        pointsDiv.textContent = points.value;
        assigneeDiv.textContent = assignee.value;
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', onLoadDelete);
        addToTotalPoints(points.value);

        form.reset();


    }

    function getTotalPoints(){
        return Number(totalSprintPoints.innerText.split(' ')[2].replace('pts', ''));
    }

    function addToTotalPoints(points){
        let currentPoints = getTotalPoints();
        let newTotal =  currentPoints + Number(points);
        totalSprintPoints.textContent = totalSprintPoints.textContent.replace(currentPoints, newTotal);

    }

    function onLoadDelete(e){
        let parentArticle = e.target.parentNode.parentNode;
        let articleChildren = Array.from(parentArticle.children);
        label.value = articleChildren[0].textContent.slice(0, -2);
        title.value = articleChildren[1].textContent;
        description.value = articleChildren[2].textContent;
        points.value = articleChildren[3].textContent;
        assignee.value = articleChildren[4].textContent;

        deleteBtn.removeAttribute('disabled');
        createBtn.setAttribute('disabled', 'true');
        title.setAttribute('disabled', 'true');
        description.setAttribute('disabled', 'true');
        label.setAttribute('disabled', 'true');
        points.setAttribute('disabled', 'true');
        assignee.setAttribute('disabled', 'true');


        hiddenTaskId.value = parentArticle.id;

        deleteBtn.addEventListener('click', onDelete);
    }

    function onDelete(){
        let newTotal = getTotalPoints() - Number(points.value);
        totalSprintPoints.textContent = totalSprintPoints.textContent.replace(getTotalPoints(), newTotal);

        form.reset();
        hiddenTaskId.value = taskSection.children[2].id;
        taskSection.children[2].remove();

        deleteBtn.setAttribute('disabled', 'true')
        createBtn.removeAttribute('disabled');
        title.removeAttribute('disabled');
        description.removeAttribute('disabled');
        label.removeAttribute('disabled');
        points.removeAttribute('disabled');
        assignee.removeAttribute('disabled');
    }


    function isMissingInput(){
        return !title.value || !description.value || !label.value || !points.value || !assignee.value;
    }

    const getLabelSymbol = {
        'Feature':() => '&#8865',
        'Low Priority Bug':() => '&#9737',
        'High Priority Bug':() => '&#9888'
    }

    function getLabelClass(){
        return label.value
            .replaceAll(' ', '-')
            .toLowerCase();
    }

}