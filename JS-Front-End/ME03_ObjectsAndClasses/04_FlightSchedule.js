function flightSchedule(input){
    let flightsArray = input[0];
    let statusArray = input[1];
    let checkStatusArray = input[2];

    let allFlights = flightsArray.map((o) => arrayToObj(o));
    let sta = statusArray.map((a) => changeStatus(allFlights, a.split(' ')[1]));

    // console.log(allFlights);

    // console.log(statusArray[0].split(' '));

    console.log(statusArray)

    // FIXME
}

function changeStatus(allFlights, destination){
    let flight =  allFlights.find((f) => f.destination === destination);
    flight.status.push('Cancel');
}

flightSchedule([
    ['WN269 Delaware', 'FL2269 Oregon', 'WN498 Las Vegas', 'WN3145 Ohio', 'WN612 Alabama', 'WN4010 New York', 'WN1173 California', 'DL2120 Texas', 'KL5744 Illinois', 'WN678 Pennsylvania'],
    ['DL2120 Cancelled', 'WN612 Cancelled', 'WN1173 Cancelled', 'SK430 Cancelled'],
    ['Cancelled']])


//
// let array = ['WN296 Delaware', 'SK403 Oregon'];
//
// let objArray = array.map((o) => arrayToObj(o));
// console.log(objArray[0]);

function arrayToObj(array){

    const flight = {
        destination : null,
        status : null,
        string : null,
        print(){
            console.log({ Destination : this.destination, Status: this.status});
        }
    }

    let info = array.split(' ');
    let destination = info[1];
    let string = info[0];
    flight.destination = destination;
    flight.status = [];
    flight.string = string;
    return flight;
}