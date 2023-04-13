function findHashtags(text) {
    text.split(" ").filter(h => isValid(h))
        .forEach(h => console.log(h.replace('#', '')));

    function isValid(hashtag){
        let isLetters = /^[a-zA-Z]+$/.test(hashtag.replace('#', ''));
        let isHashtag = hashtag.startsWith('#');
        return isHashtag && isLetters;
    }
}
