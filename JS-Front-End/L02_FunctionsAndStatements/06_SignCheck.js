function signCheck(n1, n2, n3) {

    let negative = [n1, n2, n3].filter(n => n < 0).length;
    
    return negative % 2 === 0
        ? "Positive"
        : "Negative";
}