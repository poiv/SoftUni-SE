function printEmployeesData(array) {

    let employee = {};

    for (const employeeName of array) {
        employee[employeeName] = employeeName.length;
    }

    Object.entries(employee).forEach(([k, v]) => console.log(`Name: ${k} -- Personal Number: ${v}`));
}