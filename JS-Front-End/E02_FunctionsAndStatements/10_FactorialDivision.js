function divideByFactorials(n1, n2) {
    function getFactorial(n) {
        sum = 1;

        let current = 2;
        while (current <= n) {
            sum *= current;
            current++;
        }
        return sum;
    }

    result = getFactorial(n1) / getFactorial(n2);
    return result.toFixed(2);
}