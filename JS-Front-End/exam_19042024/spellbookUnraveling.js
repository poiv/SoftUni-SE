function solve(input){

    let magicString = input.shift();

    for (const string of input) {
        let [command, ...commandInput] = string.split('!');

        switch (command) {
            case 'RemoveEven':
                //splits string into char array + ignores characters at odd indexes + joins array into string
                magicString = [...magicString].filter((_, i) => i % 2 === 0).join('');
                console.log(magicString);
                break;
                
            case 'TakePart':
                let indexStart = Number(commandInput[0]);
                let indexEnd = Number(commandInput[1]);
                magicString = magicString.slice(indexStart,indexEnd);
                console.log(magicString);
                break;

            case 'Reverse':
                let originalSubstr = commandInput[0];

                if (!magicString.includes(originalSubstr)){
                    console.log('Error');
                    continue;
                }

                //changes string into array, reverses characters and joins back into string
                let reversedSubstr = [...originalSubstr].reverse().join('');
                //replaces the original substring with an empty string + concat the reversed substring at the end of the string
                magicString = magicString.replace(originalSubstr, '').concat(reversedSubstr);
                console.log(magicString);
                break;
        }
    }
    console.log('The concealed spell is: ' + magicString);
}
