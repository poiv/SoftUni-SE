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

    function onCreate() {
        if (isMissingInput()) return;

        const article = document.createElement('article');
        const labelDiv = document.createElement('div');
        const titleH3 = document.createElement('h3');
        const descriptionP = document.createElement('p');
        const pointsDiv = document.createElement('div');
        const assigneeDiv = document.createElement('div');
        const actionsDiv = document.createElement('div');
        const deleteBtn = document.createElement('button');


        article.id = `task-${taskSection.children.length - 1}`;
        article.classList.add('task-card');
        labelDiv.classList.add('task-card-label');
        labelDiv.classList.add(getLabelClass[label.value]());
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
        titleH3.innerText = title.value;
        descriptionP.innerText = description.value;
        pointsDiv.innerText = points.value;
        assigneeDiv.innerText = assignee.value;
        deleteBtn.innerText = 'Delete';
        deleteBtn.addEventListener('click', onLoadDelete);

        updatePoints('add');

        form.reset();
    }


    function updatePoints(op) {
        let total = Number(totalSprintPoints.innerText.split(' ')[2].replace('pts', ''));
        let newTotal = op === 'add' ? total + Number(points.value) : total - Number(points.value);
        totalSprintPoints.innerText = `Total Points ${newTotal}pts`;
    }


    function onLoadDelete(e) {
        let parentArticle = e.target.parentNode.parentNode;
        let articleChildren = Array.from(parentArticle.children);
        label.value = articleChildren[0].innerText.slice(0, -2);
        title.value = articleChildren[1].innerText;
        description.value = articleChildren[2].innerText;
        points.value = articleChildren[3].innerText;
        assignee.value = articleChildren[4].innerText;

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

    function onDelete() {
        updatePoints('remove');

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


    function isMissingInput() {
        return !title.value || !description.value || !label.value || !points.value || !assignee.value;
    }

    const getLabelSymbol = {
        'Feature': () => '&#8865',
        'Low Priority Bug': () => '&#9737',
        'High Priority Bug': () => '&#9888'
    }

    const getLabelClass = {
        'High Priority Bug': () => 'high-priority',
        'Low Priority Bug': () => 'low-priority',
        'Feature': () => 'feature'
    }
}