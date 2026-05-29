//console.log("the script has been loaded");
let currentSong = new Audio();
let songs;
let songUL;
let currentFolder;
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


async function getSongs(folder) {
    currentFolder = folder;
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");

    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(decodeURIComponent(element.href.split(`/${folder}/`)[1]));
        }
    }


    //Show all the songs in the playlist
    songUL = document.querySelector(".song-list").getElementsByTagName("ul")[0];
    songUL.innerHTML = " ";
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + ` 
                                            <li>
                                                <img class="invert" src="assets/music.svg" alt="music">
                                                <div class="info">
                                                    <div>${song}</div>
                                                </div>
                                                    <div class="play-now">
                                                        <span>Play Now</span>
                                                    <img class="invert" src="assets/play-button.svg" alt="play-button">
                                                </div>
                                            </li> `;
    }


    //Attach event listener to each song 
    Array.from(document.querySelector(".song-list").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
            play.src = "assets/pause.svg";
        });
    });


    //add event listener for previous button
    previous.addEventListener("click", () => {
        let currentFile = decodeURIComponent(currentSong.src.split("/").slice(-1)[0]);
        let index = songs.indexOf(currentFile);
        let newIndex = (index - 1 + songs.length) % songs.length;
        playMusic(songs[newIndex]);
        play.src = "assets/pause.svg";
    });


    //add event listener for next button
    next.addEventListener("click", () => {
        let currentFile = decodeURIComponent(currentSong.src.split("/").slice(-1)[0]);
        let index = songs.indexOf(currentFile);
        let newIndex = (index + 1) % songs.length;
        playMusic(songs[newIndex]);
        play.src = "assets/pause.svg";
    });

    //add event listener to repeat one button
    repeatOne.addEventListener("click", () => {
    });
}




const playMusic = (track, Pause = true) => {
    currentSong.src = `/${currentFolder}/` + track;

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

    currentSong.play();
    document.querySelector(".song-info").innerHTML = track;
    document.querySelector(".song-time").innerHTML = "00:00 / 00:00";
}



async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:5500/songs/`);
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;

    let Anchors = div.getElementsByTagName("a");
    let cardContainer = document.querySelector(".card-container");

    let array = Array.from(Anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];


        if (e.href.includes("/songs/")) {
            let folder = e.href.split("/").slice(-1)[0];

            //get the meta data of the folder
            let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
            let response = await a.json();

            cardContainer.innerHTML = cardContainer.innerHTML + `<div class="card" data-folder="${folder}">
                                                                    <div class="play">
                                                                        <img src="assets/play-button.svg" alt="play-button">
                                                                    </div>
                                                                        <img class="coverImg" src="songs/${folder}/cover.jpg" alt="cover">
                                                                        <h2>${response.title}</h2>
                                                                    <p>${response.description}</p>
                                                                </div>`;

        }
    }

    //load the playlist when the card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            console.log(item, item.currentTarget.dataset);
            await getSongs(`songs/${item.currentTarget.dataset.folder}`);
        });
    });
}




async function main() {

    //get the list of  all the songs
    await getSongs("songs/Doraemon");
    playMusic(songs[0], true);
    play.src = "assets/play-button.svg";
    currentSong.pause();


    //Display all the albums on the page
    displayAlbums();


    //Attach event listener to play, next and previous
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
        let currentFile = decodeURIComponent(currentSong.src.split("/").slice(-1)[0]);
        let index = songs.indexOf(currentFile);
        let nextIndex = (index + 1) % songs.length;
        playMusic(songs[nextIndex]);
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
