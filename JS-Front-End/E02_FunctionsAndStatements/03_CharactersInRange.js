function printCharsInRange(c1, c2) {
    function getRange(array) {
        return array.map(c => c.charCodeAt(0))
            .sort((a, b) => a - b);
    }

    let charArray = [];

    let range = getRange([c1, c2]);
    let start = range[0] + 1;
    let end = range[1];

    for (let i = start; i < end; i++) {
        charArray.push(String.fromCharCode(i));
    }

    console.log(...charArray);
}