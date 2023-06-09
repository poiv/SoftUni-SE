function convertObjToJSON(objName, objLastName, objHairColor) {
    let person = {
        name: objName,
        lastName: objLastName,
        hairColor: objHairColor
    };
    
    return JSON.stringify(person);
}