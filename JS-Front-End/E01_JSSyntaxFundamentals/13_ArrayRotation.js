function rotations(array, n) {
    let len = array.length;

    for (let r = 0; r < n; r++) {
        let firstElement = array[0];
        for (let i = 1; i < len; i++) {
            array[i - 1] = array[i];
        }
        array[len - 1] = firstElement;
    }

    console.log(...array);
}