function showLoadingBar(n){

    function loadingBar(n){
        n /= 10;
        let loading = '%'.repeat(n).padEnd(10, '.');
        return `[${loading}]`;
    }

    let percentage = `${n}% ${loadingBar(n)}`;
    let result = percentage + '\nStill loading...';
    console.log(result);
}