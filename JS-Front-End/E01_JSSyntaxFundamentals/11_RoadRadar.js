function printRoadRadar(speed, area) {
    let limit = 0;
    switch (area) {
        case 'motorway': limit = 130; break;
        case 'interstate': limit = 90; break;
        case 'city': limit = 50; break;
        case 'residential': limit = 20; break;
    }

    if (speed <= limit){
        console.log(`Driving ${speed} km/h in a ${limit} zone`);
    }else {
        let speeding = speed - limit;
        let type;

        if (speeding > 40){
            type = "reckless driving";
        }else if (speeding > 20){
            type = "excessive speeding"
        }else {
            type = "speeding";
        }
        console.log(`The speed is ${speeding} km/h faster than the allowed speed of ${limit} - ${type}`);
    }
}