function pascalSplit(string){
    let upperArray = string.toUpperCase().split('');
    stringArray = string.split('');
    let words = [];

    let currentWord = '';
    for (let i = 0; i < stringArray.length; i++){
        currentWord += stringArray[i];
        if(upperArray[i+1] === stringArray[i+1]){
            words.push(currentWord);
            currentWord = '';
            
        }
    }
    console.log(words.join(', '));
}