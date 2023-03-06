function calculateTicket(day, age) {
    let result;
    switch (day) {
        case 'Weekday':
            if (age <= 64 && age > 18) {
                result = 18;
            } else if (age <= 122 && age >= 0) {
                result = 12;
            }
            break;
        case 'Weekend':
            if (age <= 64 && age > 18) {
                result = 20;
            } else if (age <= 122 && age >= 0) {
                result = 15;
            }
            break;
        case 'Holiday':
            if (age <= 18 && age >= 0) {
                result = 5;
            } else if (age <= 64 && age > 0) {
                result = 12;
            } else if (age <= 122 && age > 0) {
                result = 10;
            }
            break;
    }
    console.log(
        result
            ? result + '$'
            : 'Error!'
    );
}