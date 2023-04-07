function uncensor(words, text) {
    words = words.split(", ");
    let length = words.length;

    for (let i = 0; i < length; i++) {
        let current = words[i];
        text = text.replace("*".repeat(current.length), current);
    }
    console.log(text);
}