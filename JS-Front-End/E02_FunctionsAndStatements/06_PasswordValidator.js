function passValidator(pass) {

    let charLowerArray = pass.split('').map(c => c.toLowerCase());
    let isValid = isValidLength(pass) && isValidChars(charLowerArray) && isValidDigits(charLowerArray);

    if (isValid) {
        console.log('Password is valid');
    }

    if (!isValidLength(pass)) {
        console.log('Password must be between 6 and 10 characters');
    }
    if (!isValidChars(charLowerArray)) {
        console.log('Password must consist only of letters and digits');
    }
    if (!isValidDigits(charLowerArray)) {
        console.log('Password must have at least 2 digits');
    }


    function isValidLength(pass) {
        return pass.length >= 6 && pass.length <= 10;
    }

    function isValidChars(array) {
        return array.every(c => (c.charCodeAt(0) >= 97 && c.charCodeAt(0) <= 122) || Number(c) <= 9);
    }

    function isValidDigits(array) {
        let digitsArray = array.filter(d => Number(d) <= 9);
        return digitsArray.length >= 2;
    }
}