function store(stock, products) {
    let storeObj = {};
    let all = [...stock, ...products];
    let len = all.length;

    for (let i = 0; i < len; i += 2) {
        let product = all[i];
        let quantity = Number(all[i + 1]);

        storeObj.hasOwnProperty(product)
            ? storeObj[product] += Number(quantity)
            : storeObj[product] = Number(quantity);
    }

    Object.entries(storeObj)
        .forEach(([k, v]) => console.log(`${k} -> ${v}`));
}