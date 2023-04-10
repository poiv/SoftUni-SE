function checkPerfect(n) {

    function getDivisorArray(n) {
        let array = [1];
        let currentNum = n / 2;
        while (currentNum > 1) {
            array.push(currentNum);
            currentNum = Math.ceil(currentNum / 2);
        }
        return array;
    }

    function getArraySum(array) {
        return array.reduce((a, b) => a + b);
    }

    let isPerfect =
        n == getArraySum(getDivisorArray(n));

    console.log(
        isPerfect
            ? "We have a perfect number!"
            : "It's not so perfect."
    );

}