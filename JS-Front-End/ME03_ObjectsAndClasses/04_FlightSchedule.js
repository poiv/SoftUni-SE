function flightSchedule(input) {

    function changeStatus(allFlights, code, status) {
        let flightToChange = allFlights.find((f) => f.code === code);
        if (flightToChange) flightToChange.status.push(status);
    }

    function arrayToObj(array) {

        const flight = {
            destination: null,
            status: ['Ready to fly'],
            code: null,
            print() {
                if (this.status[1] === 'Ready to fly') {
                    console.log({Destination: this.destination, Status: this.status[1]});
                } else if (this.status[2] === this.status[1]) {
                    console.log({Destination: this.destination, Status: this.status[2]});
                }
            }
        }

        let [code, ...destination] = array.split(' ');
        flight.destination = destination.join(' ');
        flight.code = code;
        return flight;
    }

    let flights = input[0].map((o) => arrayToObj(o));
    let codeToStatus = new Map(input[1].map((s) => s.split(' ')));
    let finalStatus = input[2][0];

    codeToStatus.forEach((k, v) => changeStatus(flights, v, k));
    flights.forEach((f) => f.status.push(finalStatus));
    flights.forEach((f) => f.print());
}