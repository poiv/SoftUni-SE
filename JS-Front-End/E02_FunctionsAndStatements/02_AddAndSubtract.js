function solve(n1, n2, n3) {
    
    return subtract(sum(n1, n2), n3);

    function sum(n1, n2) {
        return n1 + n2;
    }
    function subtract(sum, n3) {
        return sum - n3;
    }
}