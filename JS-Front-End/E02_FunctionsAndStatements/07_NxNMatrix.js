function printMatrix(n) {

    function getMatrix(n) {
        return Array(n)
            .fill(Array(n)
                .fill(n));
    }

    function getMatrixString(matrix){
        return matrix.join('\n').split(',').join(' ');
        // return matrix.join('\n').replaceAll(',', ' ');
    }

    console.log(getMatrixString(getMatrix(n)));

}