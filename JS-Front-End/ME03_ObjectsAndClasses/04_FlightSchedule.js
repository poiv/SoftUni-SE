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
                if (this.status[1] === 'Ready to fly'){
                    // this.status[this.status.length - 1]
                    console.log({Destination: this.destination, Status: this.status[this.status.length - 1]});
                }
                else if (this.status[this.status.length - 1] === this.status[this.status.length - 2]) {
                    console.log({Destination: this.destination, Status: this.status[this.status.length - 1]});
                }
            }
        }

        let [code, ...destination] = array.split(' ');
        flight.destination = destination.join(' ');
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