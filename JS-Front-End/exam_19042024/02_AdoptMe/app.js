window.addEventListener("load", solve);

function solve() {

    const animalType = document.getElementById('type');
    const age = document.getElementById('age');
    const gender = document.getElementById('gender');
    const adoptionInfo = document.getElementById('adoption-info');
    const adoptedList = document.getElementById('adopted-list');

    let currentAdoptionValues = {};

    //FIXME: list doesn't work with multiple animals


    const adoptBtn = document.getElementById('adopt-btn');

    adoptBtn.addEventListener("click", adoptHandler);

    function clearHandler(){
        adoptedList.innerHTML = '';
    }


    function editHandler(){
      animalType.value = currentAdoptionValues.type;
      age.value = currentAdoptionValues.age;
      gender.value = currentAdoptionValues.gender;

      adoptionInfo.innerHTML = '';
    }

    function arrayToPetInfo(array){
        let type = array[0].textContent.split(':')[1];
        let gender = array[1].textContent.split(':')[1];
        let age = array[2].textContent.split(':')[1];
        return {type: type, age: age, gender: gender};
    }


    function finishAdoptionHandler(event){

        currentAdoptionValues = arrayToPetInfo(Array.from(event.target.parentNode.parentNode.firstChild.childNodes));

        adoptionInfo.innerHTML = '';

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

        pType.textContent = currentAdoptionValues.type;
        pGender.textContent = currentAdoptionValues.gender;
        pAge.textContent = currentAdoptionValues.age;

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

        //save input field values
        currentAdoptionValues = {type: animalType.value, gender: gender.value, age: age.value};


        // clear input fields
        animalType.value = '';
        age.value = '';
        gender.value = '';

        editBtn.addEventListener('click', editHandler);
        doneBtn.addEventListener('click', finishAdoptionHandler)
    }
}
  