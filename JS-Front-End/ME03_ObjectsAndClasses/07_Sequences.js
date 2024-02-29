function sequences(array) {


    function addToMap(a, i) {
        let numberArray = JSON.parse(a).sort().toString();

        if (!map.has(numberArray)) {
            newArr.push(JSON.parse(a));
            map.set(numberArray, i);
        }
    }

    function printSorted(array) {
        array.sort((a, b) => a.length - b.length);
        array.forEach((numArr) => numArr.sort((a, b) => b - a));
        for (const numArr of array) {
            console.log(`[${numArr.join(', ')}]`);
        }
    }

    let newArr = [];
    let map = new Map();
    array.forEach(addToMap);
    printSorted(newArr);
}