function isFound(word, text) {
    text = text.toLowerCase();
    console.log(
        text.split(' ').includes(word)
            ? word
            : word + ' not found!'
    );
}