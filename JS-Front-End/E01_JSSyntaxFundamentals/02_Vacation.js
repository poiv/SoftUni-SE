function printVacationPrice(n, type, day) {
    let result = n;
    switch (type) {
        case "Students":
            switch (day) {
                case "Friday": result *= 8.45; break;
                case "Saturday": result *= 9.80; break;
                case "Sunday": result *= 10.46; break;
            }
            if (n >= 30) {
                result *= 0.85;
            }
            break;
        case "Business":
            if (n >= 100) {
                result -= 10;
            }
            switch (day) {
                case "Friday": result *= 10.90; break;
                case "Saturday": result *= 15.60; break;
                case "Sunday": result *= 16; break;
            }

            break;
        case "Regular":
            switch (day) {
                case "Friday": result *= 15; break;
                case "Saturday": result *= 20; break;
                case "Sunday": result *= 22.50; break;
            }
            if (n >= 10 && n <= 20){
                result *= 0.95;
            }
            break;
    }
    
    console.log(`Total price: ${result.toFixed(2)}`);
}