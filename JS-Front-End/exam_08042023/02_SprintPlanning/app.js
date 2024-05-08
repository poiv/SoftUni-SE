window.addEventListener('load', solve);

function solve() {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const label = document.getElementById('label');
    const points = document.getElementById('points');
    const assignee = document.getElementById('assignee');
    const createBtn = document.getElementById('create-task-btn');

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

        article.id = `task-${1}`;
        article.classList.add('task-card');
        labelDiv.classList.add('task-card-label');
        labelDiv.classList.add(label.value
            .replaceAll(' ', '-')
            .toLowerCase());
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

        let labelIcon = getLabelIcon();
        labelDiv.textContent = `${label.value} ${labelIcon}`;
        titleH3.textContent = title.value;
        descriptionP.textContent = description.value;
        pointsDiv.textContent = points.value;
        assigneeDiv.textContent = assignee.value;
        deleteBtn.value = 'Delete';

        clearInputFields();
    }

    function clearInputFields(){
        title.value = '';
        description.value = '';
        label.value = '';
        points.value = '';
        assignee.value = '';
    }

    function isMissingInput(){
        return !title.value || !description.value || !label.value || !points.value || !assignee.value;
    }

    function getLabelIcon(){
        let labelText = label.value;
        if (labelText === 'feature') return '&#8865';
        if (labelText === 'low-priority') return '&#9737';
        if (labelText === 'high-priority') return '&#9888';
    }
}