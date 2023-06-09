function printCityProperties(city) {

    Object.entries(city)
        .forEach(([k, v]) => console.log(`${k} -> ${v}`));

}