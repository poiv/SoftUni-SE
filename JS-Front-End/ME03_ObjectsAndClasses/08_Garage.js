function garage(array) {
    let map = new Map();
    for (const pair of array) {
        let allCars = [];
        let split = pair.split(' - ');
        let garageNumber = Number(split[0]);
        let properties = split[1].split(', ');
        let currentCar = {};
        for (const property of properties) {
            let [name, value] = property.split(': ');
            let obj = {[name]: value};
            currentCar = {...currentCar, ...obj};
        }
        allCars.push(currentCar);

        if (map.get(garageNumber)) {
            map.get(garageNumber).push(...allCars);
            continue;
        }

        map.set(garageNumber, allCars);
    }

    map.forEach(print);

    function print(value, key) {
        console.log(`Garage № ${key}`)
        for (const car of value) {
            let arr = [];
            for (const [key, value] of Object.entries(car)) {
                arr.push(`${key} - ${value}`);
            }
            console.log('--- ' + arr.join(', '));
        }

    }
}