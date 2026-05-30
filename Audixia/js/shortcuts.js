/*All the key board shortcuts are codeded in this js file*/
keymuted = true;
//const volumeBar = document.querySelector(".volume-bar");
document.addEventListener("keydown", (e) => {
    console.log(e.keyCode)
    if (e.keyCode == 32 || e.keyCode == 75) {
        if (keymuted == true) {
            currentSong.play();
            play.src = "assets/pause.svg";
            keymuted = false;
        }

        else if (keymuted == false) {
            currentSong.pause();
            play.src = "assets/play-button.svg";
            keymuted = true;
        }
    }

    if (e.keyCode == 74) {
        currentSong.currentTime -= 10;
    }

    if (e.keyCode == 76) {
        currentSong.currentTime += 10;
    }
});


document.addEventListener("keydown", (event) => {
    const volumeBar = document.querySelector(".volume-bar");
    const step = 5; 

    if (event.key === "ArrowUp") {
        // Increase volume
        volumeBar.value = Math.min(+volumeBar.value + step, volumeBar.max);
        currentSong.volume = volumeBar.value / 100;
    } 
    else if (event.key === "ArrowDown") {
        // Decrease volume
        volumeBar.value = Math.max(+volumeBar.value - step, volumeBar.min);
        currentSong.volume = volumeBar.value / 100;
    }

});

