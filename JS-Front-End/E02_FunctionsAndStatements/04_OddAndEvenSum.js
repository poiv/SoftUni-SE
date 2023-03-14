// 80/100
function sumOddEven(num){
    function findAndSumOdd(arr){
        return arr.filter(n => !(n % 2 === 0)).reduce((a,b) => a+b);
    }
    function findAndSumEven(arr){
        return arr.filter(n => n % 2 === 0).reduce((a,b) => a+b);
    }

    num = num.toString().split("").map(n => Number(n));
    let sumOdd = findAndSumOdd(num);
    let sumEven = findAndSumEven(num);
    console.log(`Odd sum = ${sumOdd}, Even sum = ${sumEven}`);
}