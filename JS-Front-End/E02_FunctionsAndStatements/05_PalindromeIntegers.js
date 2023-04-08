function isPalindrome(array) {
    
    function getReversedArray(array) {
        return array.map(n => n.split("")
            .reverse()
            .join(""));
    }

    array = array.map(n => n.toString());

    let reversedArray = getReversedArray(array);
    array.forEach((a, b) => console.log(a === reversedArray[b]));
}