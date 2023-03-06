function printCensoredVersion(text, profanity) {
    while (text.includes(profanity)){
        let len = profanity.length;
        text = text.replace(profanity, '*'.repeat(len));
    }
    
    console.log(text);
}