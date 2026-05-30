console.log("the script has been loaded");
let currentSong = new Audio();
let songs;
let songUL;
let currentFolder;
let currentSongIndex = 0;
let isPause = true;
let isLoop = true;
let isShuffle = true;

let shuffleBtn = document.getElementById("shuffle");


function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        let str = "00:00"
        return str;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}: ${formattedSeconds}`;
}


//getsongs folder
async function getSongs(folder) {
    currentFolder = folder;
    let response = await fetch(`/js/songs.json`);
    let data = await response.json();

    //console.log(data);

    let folderName = folder;
    songs = data[folderName];

    songUL = document.querySelector(".song-list ul");
    songUL.innerHTML = "";


    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + ` 
                                            <li>
                                                <img class="invert" src="assets/music.svg" alt="music">
                                                <div class="info">
                                                    <div>${song.title}</div>
                                                </div>
                                                    <div class="play-now">
                                                        <span>Play Now</span>
                                                    <img class="invert" src="assets/play-button.svg" alt="play-button">
                                                </div>
                                            </li> `;
    }
}




const playMusic = (track, Pause = true) => {

    if (!track) return;

    currentSongIndex = songs.findIndex(
        song => song.url === track.url
    );

    currentSong.src = track.url;

    document.querySelector(".song-info").innerHTML = `${track.title}`;
    document.querySelector(".song-time").innerHTML = "00:00 / 00:00";

    if (!Pause) {
        currentSong.play();
        play.src = "assets/pause.svg";
        isPause = false;
    }

    else {
        currentSong.pause();
        play.src = "assets/play-button.svg";
        isPause = true
    }
}



async function displayAlbums() {
    let response = await fetch(`/js/albums.json`);
    let data = await response.json();

    //console.log("albums data", data);

    let cardContainer = document.querySelector(".card-container");

    data.forEach(album => {
        cardContainer.innerHTML = cardContainer.innerHTML + `<div class="card" data-folder="${album.folder}">
                                                                    <div class="play">
                                                                        <img src="assets/play-button.svg" alt="play-button">
                                                                    </div>
                                                                        <img class="coverImg" src="${album.cover}" alt="cover">
                                                                        <h2>${album.title}</h2>
                                                                    <p>${album.description}</p>
                                                                </div>`;
    });



    //load the playlist when the card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(card => {
        card.addEventListener("click", async (event) => {

            const folder = event.currentTarget.dataset.folder;
            //console.log(folder);

            await getSongs(folder);

            currentSong.pause();

            playMusic(songs[0], true);
    
            play.src = "assets/play-button.svg";
        });
    });
}




async function main() {

    //get the list of  all the songs
    await getSongs("Anime");
    playMusic(songs[0], false);
    play.src = "assets/play-button.svg";


    //Display all the albums on the page
    displayAlbums();

    //Attach event listener to each song 
    Array.from(document.querySelector(".song-list").getElementsByTagName("li")).forEach((e, index) => {
        e.addEventListener("click", () => {

            currentSongIndex = index;

            console.log("Index:", index);
            console.log("Song:", songs[index]);

            playMusic(songs[index], true);
            play.src = "assets/pause.svg";
        });
    });


    //add event listener for previous button
    previous.addEventListener("click", () => {

        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playMusic(songs[currentSongIndex], false);
    });


    //add event listener for next button
    next.addEventListener("click", () => {

        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playMusic(songs[currentSongIndex], false);
    });


    //Attach event listener to play song button 
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "assets/pause.svg";
        }
        else {
            currentSong.pause();
            play.src = "assets/play-button.svg";
        }
    });


    //Listen for time update event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".song-time").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`

        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });


    //add an event listener to  seekbar
    document.querySelector(".seek-bar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    });


    //add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });


    //add an event listener for close button
    document.querySelector(".close-btn").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%";
    });



    //Add event listener to volume
    document.querySelector(".volume-bar").addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;

        if (e.target.value == 0) {
            document.querySelector(".volume").getElementsByTagName("img")[0].src = "assets/volume-off.svg";
        }

        else if (e.target.value >= 70) {
            document.querySelector(".volume").getElementsByTagName("img")[0].src = "assets/volume-high.svg";
        }

        else {
            document.querySelector(".volume").getElementsByTagName("img")[0].src = "assets/volume.svg";
        }
    });


    //autoplay the next song
    currentSong.addEventListener("ended", () => {

        currentSongIndex = (currentSongIndex + 1) % songs.length;

        playMusic(songs[currentSongIndex], false);
    });


    //repeat one song
    repeatOne.addEventListener("click", () => {
        if (isLoop == true) {
            currentSong.loop = true;
            repeatOne.src = "assets/repeat-active.svg";
            isLoop = false;
        }

        else if (isLoop == false) {
            currentSong.loop = false;
            repeatOne.src = "assets/repeat-one.svg";
            isLoop = true;
        }
    });


    //shuffle all th songs
    shuffleBtn.addEventListener("click", () => {
        if (isShuffle == true) {
            console.log("music shuffle");

            shuffleBtn.src = "assets/shuffle-active.svg";
            isShuffle = false;
        }

        else if (isShuffle == false) {
            console.log("music unshuffle");
            shuffleBtn.src = "assets/shuffle.svg";
            isShuffle = true;
        }
    });




}


main()
