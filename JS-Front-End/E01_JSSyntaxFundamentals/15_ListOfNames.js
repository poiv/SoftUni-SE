function printByAscending(array){
    array = array.sort((a,b) => a.localeCompare(b));
    
    for (let e = 0; e < array.length; e++){
        console.log(`${e+1}.${array[e]}`);
    }
}