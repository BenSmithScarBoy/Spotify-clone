
import equalizer from "./equalizer.js";
import { makeAllPlayBtn } from "./main.js";
import songs from "./songs.js";


function sameOperations(audioElement, songIndex, masterMusicNameElem, playerPlayPauseBtn, pauseBtn, authorPicture, innerPlayBtnElem) {
    audioElement.src = `./songs/${songIndex + 1}.mp3`;
    masterMusicNameElem.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    equalizer(audioElement)
    playerPlayPauseBtn.classList = pauseBtn;
    makeAllPlayBtn();
    innerPlayBtnElem[songIndex].classList = pauseBtn
    authorPicture.src = `./imageSource/${songIndex}.jpg`
}

export default sameOperations;