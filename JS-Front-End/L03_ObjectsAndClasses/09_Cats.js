function cats(array) {
    let catList = [];
    class Cat {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        meow() {
            return `${this.name}, age ${this.age} says Meow`;
        }
    }

    for (const catInfo of array) {
        let catName = catInfo.split(' ')[0];
        let catAge = catInfo.split(' ')[1];
        let currentCat = new Cat(catName, catAge);
        catList.push(currentCat);
        console.log(currentCat.meow());
    }
}