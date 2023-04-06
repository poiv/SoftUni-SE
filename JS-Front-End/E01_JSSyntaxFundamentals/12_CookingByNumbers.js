function cooking(number, op1, op2, op3, op4, op5) {

    let operations = [op1, op2, op3, op4, op5];
    for (let i = 0; i < 5; i++) {
        number = action(operations[i], number);
        console.log(number);
    }

    function action(operation, number) {
        switch (operation) {
            case "chop": return number / 2;
            case "dice": return Math.sqrt(number);
            case "spice": return number + 1;
            case "bake": return number * 3;
            case "fillet": return number * 0.80;
        }
    }
}