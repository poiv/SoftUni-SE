function addressBook(array) {
    let addressBook = {};
    for (const data of array) {
        let person = data.split(':')[0];
        let address = data.split(':')[1];
        addressBook[person] = address;
    }
    let sorted = Object.entries(addressBook).sort();

    sorted.forEach(([k, v]) => console.log(k + ' -> ' + v));
}