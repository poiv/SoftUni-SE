function phoneBook(array) {
    let phoneBook = {};
    for (const entry of array) {
        let name = entry.split(' ')[0];
        let phone = entry.split(' ')[1];
        phoneBook[name] = phone;
    }

    Object.entries(phoneBook).forEach(([k, v]) => console.log(k + ' -> ' + v));
}