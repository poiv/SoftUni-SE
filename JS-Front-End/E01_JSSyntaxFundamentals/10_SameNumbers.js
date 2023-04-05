function printIfSameDigits(number) {
    let array = number.toString().split("").map(d => Number(d));

    let sum = array.reduce((a, b) => a + b);

    console.log(
        array.every(a => a === array[0])
    );
    console.log(sum);
}