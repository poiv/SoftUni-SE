function sortCatalogue(array) {
    function arrayToObj(array) {
        let infoArr = array.split(' : ');
        let name = infoArr[0];
        let price = Number(infoArr[1]);
        return {name: name, price: price};
    }

    let productObjArray = array.map(i => arrayToObj(i))
        .sort((a, b) => a.name.localeCompare(b.name));

    let lastLetter = '';
    const length = productObjArray.length;
    for (let i = 0; i < length; i++) {
        let currentLetter = productObjArray[i].name.charAt(0);
        if (lastLetter !== currentLetter) {
            console.log(currentLetter)
            lastLetter = currentLetter;
        }
        console.log('  ' + productObjArray[i].name + ': ' + productObjArray[i].price);
    }
}