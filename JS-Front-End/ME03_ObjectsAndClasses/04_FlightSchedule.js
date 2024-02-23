// FIXME 60/100
function flightSchedule(input){
    function changeStatusIfUnchanged(allFlights, status){
        allFlights.forEach((f) => f.status.push(status));
    }
    function arrayToMap(array){
        let map = new Map();

        for (const string of array) {
            let arr = string.split(' ');
            let k = arr[0];
            let v = arr[1];
            map.set(k,v);
        }

        return map;
    }

    function changeStatus(allFlights, code, status){
        let flightToChange = allFlights.find((f) => f.code === code);
        if (flightToChange){
            flightToChange.status.push(status);
        }

    }


    function arrayToObj(array){

        const flight = {
            destination : null,
            status : ['Ready to fly'],
            code : null,
            print() {
                if (this.status.length < 3) {
                    console.log({Destination: this.destination, Status: this.status[this.status.length - 1]});
                }
            }
        }

        let info = array.split(' ');
        let destination = info[1];
        let code = info[0];
        flight.destination = destination;
        flight.code = code;
        return flight;
    }

    let flights = input[0].map((o) => arrayToObj(o));
    let statusToFlight = arrayToMap(input[1]);
    let finalStatus = input[2][0];

    statusToFlight.forEach((k,v) => changeStatus(flights, v, k));
    changeStatusIfUnchanged(flights, finalStatus);

    flights.forEach((f) => f.print());
}

flightSchedule([["WN269 Delaware","FL2269 Oregon","WN498 Las vegas","WN3145 Ohio","WN612 Alabama","WN4010 New York","WN1173 California","DL2120 Texas","KL5744 Illinois","WN678 Pennsylvania"],["DL2120 Cancelled","WN612 Cancelled","WN1173 Cancelled","SK330 Cancelled"],["Ready to fly"]])