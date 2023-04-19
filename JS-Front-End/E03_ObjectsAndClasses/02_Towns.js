function solve(array){
    function getString(obj){
        let vals = Object.values(obj);
        vals[1] = Number(vals[1]).toFixed(2);
        vals[2] = Number(vals[2]).toFixed(2);
        return `{ town: '${vals[0]}', latitude: '${vals[1]}', longitude: '${vals[2]}' }`;
    }

    for (const town of array) {
        let townObj = {};
        let [townName, townLat, townLong] = town.split(' | ');

        townObj.town = townName;
        townObj.latitude = townLat;
        townObj.longitude = townLong;

        console.log(getString(townObj));
    }
}