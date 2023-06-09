function scheduleMeetings(appointments) {
    let schedule = {};

    for (const appointment of appointments) {
        let day = appointment.split(' ')[0];
        let name = appointment.split(' ')[1];
        if (Object.keys(schedule).includes(day)) {
            console.log(`Conflict on ${day}!`);
        } else {
            console.log(`Scheduled for ${day}`);
            schedule[day] = name;
        }
    }

    Object.entries(schedule).forEach(([k, v]) => console.log(k + ' -> ' + v));
}