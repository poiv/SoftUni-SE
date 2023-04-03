function printDigitSum(number) {
    arr = number.toString().split("");
    
    let sum = arr.reduce((a, b) =>
        Number(a) + Number(b));
    console.log(sum);
}