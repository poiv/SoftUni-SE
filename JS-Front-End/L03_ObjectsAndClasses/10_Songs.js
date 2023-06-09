function getSongsByType(input){
    class Song {
        constructor(typeList, name, time){
            this.typeList = typeList;
            this.name = name;
            this.time = time;
        }
    }

    let songList = [];
    let length = input.length-1;

    for (let i = 1; i < length; i++){
        let songData = input[i].split('_');
        let songType = songData[0];
        let songName = songData[1];
        let songTime = songData[2];
        songList.push(new Song(songType, songName, songTime));
    }

    let typeToPrint = input[length];
    if (typeToPrint === 'all'){
        songList.forEach(s => console.log(s.name));
    }else {
        songList.filter(s => s.typeList === typeToPrint).forEach(s => console.log(s.name));
    }
    
}