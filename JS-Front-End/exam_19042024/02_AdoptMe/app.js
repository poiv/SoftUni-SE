window.addEventListener("load", solve);

function solve() {
    const form = document.querySelector('form');

    const animalType = document.getElementById('type');
    const age = document.getElementById('age');
    const gender = document.getElementById('gender');
    const adoptionInfo = document.getElementById('adoption-info');
    const adoptedList = document.getElementById('adopted-list');

    const adoptBtn = document.getElementById('adopt-btn');

    adoptBtn.addEventListener('click', adoptHandler);

    function adoptHandler() {

        if (!animalType.value || !age.value || !gender.value) {
            return;
        }

        const list = document.createElement('li');
        const article = document.createElement('article');
        const buttons = document.createElement('div');
        const editBtn = document.createElement('button');
        const doneBtn = document.createElement('button');
        const pType = document.createElement('p');
        const pAge = document.createElement('p');
        const pGender = document.createElement('p');

        adoptionInfo.appendChild(list);
        list.appendChild(article);
        list.appendChild(buttons);

        //append doesnt work in judge
        buttons.appendChild(editBtn);
        buttons.appendChild(doneBtn);
        article.appendChild(pType);
        article.appendChild(pGender);
        article.appendChild(pAge);


        buttons.classList.add('buttons');
        editBtn.classList.add('edit-btn');
        doneBtn.classList.add('done-btn');

        const pet = {type: animalType.value, age:age.value, gender: gender.value};

        editBtn.textContent = 'Edit';
        doneBtn.textContent = 'Done';

        pType.innerText = `Pet:${pet.type}`;
        pGender.innerText = `Gender:${pet.gender}`;
        pAge.innerText = `Age:${pet.age}`;

        form.reset();

        editBtn.addEventListener('click', editHandler);
        doneBtn.addEventListener('click', finishAdoptionHandler)


        function finishAdoptionHandler() {
            const clearBtn = document.createElement('button');

            adoptedList.appendChild(list);
            list.removeChild(buttons);
            list.appendChild(clearBtn);

            clearBtn.classList.add('clear-btn');
            clearBtn.textContent = 'Clear';

            clearBtn.addEventListener('click', clearHandler);

            function clearHandler() {
                adoptedList.removeChild(list);
            }
        }

        function editHandler() {
            animalType.value = pet.type;
            age.value = pet.age;
            gender.value = pet.gender;

            adoptionInfo.removeChild(list);
        }
    }
}
  