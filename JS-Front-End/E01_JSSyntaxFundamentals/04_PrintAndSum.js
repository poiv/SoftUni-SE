function printRangeSum(start, end) {
    let arr = [];
    for (let i = start; i <= end; i++) {
        arr[i - start] = i;
    }
    
    console.log(...arr);
    console.log("Sum: " +
        arr.reduce((a, b) => a + b));
}