function sortMovies(data) {

    let allMoviesInfo = [];

    for (const string of data) {

        if (string.includes('addMovie')) {
            let movieName = string.replace('addMovie ', '');
            addMovie(movieName);
        } else if (string.includes('directedBy')) {
            let dataArr = string.split(' directedBy ');
            let movieName = dataArr[0];
            let movieDirector = dataArr[1];
            addDirector(movieName, movieDirector);

        } else {
            let dataArr = string.split(' onDate ');
            let movieName = dataArr[0];
            let movieDate = dataArr[1];
            addDate(movieName, movieDate);
        }
    }

    printCompleteMovies(allMoviesInfo);

    function findObjByName(array, objName) {
        return array.find(m => m.name === objName);
    }

    function printCompleteMovies(allMoviesInfo) {
        let filtered = allMoviesInfo.filter(m => m.director && m.date);
        for (const movieInfo of filtered) {
            console.log(JSON.stringify(movieInfo));

        }
    }

    function addMovie(movieName) {
        let movie = { name: movieName };
        allMoviesInfo.push(movie);
    }

    function addDirector(movieName, movieDirector) {
        let movie = findObjByName(allMoviesInfo, movieName);
        if (movie) {
            movie.director = movieDirector;
        }
    }

    function addDate(movieName, movieDate) {
        let movie = findObjByName(allMoviesInfo, movieName);
        if (movie) {
            movie.date = movieDate;
        }
    }
}