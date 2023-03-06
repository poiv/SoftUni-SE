function count(text, word){
    text = text.split(' ');
    let len = text.filter(w => w === word).length;
    console.log(len);
}