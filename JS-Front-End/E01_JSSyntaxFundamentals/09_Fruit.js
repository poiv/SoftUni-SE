function printFruitPrice(fruit, grams, pricePerKg) {
    let kg = grams / 1000;
    let price = kg * pricePerKg;
    console.log(`I need $${price.toFixed(2)} to buy ${kg.toFixed(2)} kilograms ${fruit}.`);
}