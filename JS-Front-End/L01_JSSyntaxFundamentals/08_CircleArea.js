function calculateCircleArea(radius) {
    let inputType = typeof radius;

    if (inputType !== 'number') {
        return `We can not calculate the circle area, because we receive a ${inputType}.`;
    }
    return (radius ** 2 * Math.PI).toFixed(2);
}