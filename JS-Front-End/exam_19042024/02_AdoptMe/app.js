window.addEventListener("load", solve);

function solve() {

    const animalType = document.getElementById('type');
    const age = document.getElementById('age');
    const gender = document.getElementById('gender');
    const adoptionInfo = document.getElementById('adoption-info');
    const adoptedList = document.getElementById('adopted-list');

    const adoptBtn = document.getElementById('adopt-btn');

    adoptBtn.addEventListener("click", adoptHandler);

    function clearHandler(e){
        e.target.parentNode.innerHTML = '';
    }

    function editHandler(e){

        let pet = arrayToPetInfo(e.target.parentNode.parentNode.firstChild.childNodes);

        animalType.value = pet.type;
        age.value = pet.age;
        gender.value = pet.gender;
        e.target.parentNode.parentNode.innerHTML = '';
    }

    function arrayToPetInfo(array){
        let type = array[0].textContent.split(':')[1];
        let gender = array[1].textContent.split(':')[1];
        let age = array[2].textContent.split(':')[1];
        return {type: type, age: age, gender: gender};
    }


    function finishAdoptionHandler(event){

        let pet = arrayToPetInfo(event.target.parentNode.parentNode.firstChild.childNodes);

        event.target.parentNode.parentNode.innerHTML = '';

        const li = document.createElement('li');
        const article = document.createElement('article');
        const pType = document.createElement('p');
        const pGender = document.createElement('p');
        const pAge = document.createElement('p');
        const clearBtn = document.createElement('button');

        adoptedList.appendChild(li);
        li.appendChild(article);
        li.appendChild(clearBtn);
        li.appendChild(pType);
        li.appendChild(pGender);
        li.appendChild(pAge);

        pType.textContent = pet.type;
        pGender.textContent = pet.gender;
        pAge.textContent = pet.age;

        clearBtn.classList.add('clear-btn');
        clearBtn.textContent = 'Clear';

        clearBtn.addEventListener('click', clearHandler);

    }

    function adoptHandler() {
        if (!animalType.value || !age.value || !gender.value) {
            return;
        }


        // create adoption info structure
        const list = document.createElement('li');
        const article = document.createElement('article');
        const buttons = document.createElement('div');
        const editBtn = document.createElement('button');
        const doneBtn = document.createElement('button');
        const pType = document.createElement('p');
        const pGender = document.createElement('p');
        const pAge = document.createElement('p');

        adoptionInfo.appendChild(list);
        list.appendChild(article);
        list.appendChild(buttons);
        buttons.append(editBtn, doneBtn);
        article.append(pType, pGender, pAge);

        buttons.classList.add('buttons');
        editBtn.classList.add('edit-btn');
        doneBtn.classList.add('done-btn');


        // set values
        editBtn.textContent = 'Edit';
        doneBtn.textContent = 'Done';

        pType.innerText = 'Pet:' + animalType.value;
        pGender.innerText = 'Gender:' + gender.value;
        pAge.innerText = 'Age:' + age.value;

        // clear input fields
        animalType.value = '';
        age.value = '';
        gender.value = '';

        editBtn.addEventListener('click', editHandler);
        doneBtn.addEventListener('click', finishAdoptionHandler)
    }
}
  