function printIfLeap(year) {
    const isLeap = (year % 4 === 0 && !(year % 100 === 0))
        || year % 400 === 0;
        
    console.log(
        isLeap
            ? "yes" : "no"
    );
}