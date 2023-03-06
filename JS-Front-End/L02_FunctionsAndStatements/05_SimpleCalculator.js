function calculate(n1, n2, op){
    switch(op){
        case "multiply": return n1 * n2;
        case "divide": return n1 / n2;
        case "add": return n1 + n2;
        case "subtract": return n1 - n2;
    }
}