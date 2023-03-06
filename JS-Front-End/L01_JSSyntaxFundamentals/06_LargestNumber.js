function printLargestNum(num1, num2, num3) {
    // let largest = Math.max(num1, num2, num3);

    let largest = num1 >= num2 ? num1 : num2;
    if (num3 > largest) largest = num3;

    console.log(`The largest number is ${largest}.`);
}