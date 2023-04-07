function everyNthArray(array, n){
    let len = array.length;
    let newArr = [];
    for (let i = 0; i <= len; i+=n){
        newArr.push(array[i]);
    }
    return newArr;
}