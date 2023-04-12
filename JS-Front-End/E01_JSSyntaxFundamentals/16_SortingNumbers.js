function sortArray(array){

    array.sort((a, b) => a - b);
    let newArr = [];

    let length = array.length/2;
    for (let i = 0; i < length; i++){
        newArr.push(array[i]);
        if (i+1 > length) break;

        newArr.push(array[array.length-1-i]);
    }
    return newArr;
    
}
