function printConvertedJSON(string) {
    let person = JSON.parse(string);

    Object.entries(person).forEach(([k, v]) => console.log(k + ': ' + v));
}