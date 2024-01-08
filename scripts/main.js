
/////////////////////////////Connectings/////////////////////////////
const songItemContainer = document.querySelector('.songItemContainer');
const songItems = document.querySelectorAll('.songItem');
const authorPicture = document.querySelector('.author');
const myProgressBar = document.getElementById('myProgressBar');
const masterMusicNameElem = document.querySelector('.music-info');
const innerPlayBtnElem = document.querySelectorAll('.innerPlay');

const savedSongItemContainer = document.querySelector('.savedSongItemContainer');
const favoritesElem = document.querySelector('.favorites')
const homeElem = document.querySelector('.home')

const playerPlayPauseBtn = document.querySelector('#pausePlay-btn');
const playerPreviousBtn = document.querySelector('#previous-btn');
const playerNextBtn = document.querySelector('#next-btn');
const addBtns = document.querySelectorAll('.bx-plus-circle');

const savedSongItems = document.querySelectorAll('.savedSongItem')

const musicImage = document.querySelector('.author')
/////////////////////////////Connectings/////////////////////////////

let songIndex = 0;
const audioElement = new Audio('songs/1.mp3');

////////////////////////////Imports////////////////////////////
import sameOperations from "./sameOperations.js";
import songs from "./songs.js";
import starRating from "./starRating.js";
import equalizer from "./equalizer.js";
import addToLocalStorage from "./addToLocalStorage.js";
import createFavoriteMusicList from "./createFavoriteMusicList.js";
////////////////////////////Imports////////////////////////////

const pauseBtn = 'bx bx-pause-circle';
const playBtn = 'bx bx-play-circle';

playerPlayPauseBtn.addEventListener('click', e => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playerPlayPauseBtn.classList = pauseBtn;
        innerPlayBtnElem[songIndex].classList = pauseBtn;
        equalizer(audioElement);
        musicImage.classList.add('brightnest');

        playerPlayPauseBtn.classList.add('color');
        setTimeout(() => {
            playerPlayPauseBtn.classList.remove('color');
        }, 200);
    } else {
        musicImage.classList.remove('brightnest');
        audioElement.pause();
        makeAllPlayBtn();
        playerPlayPauseBtn.classList = playBtn;
        playerPlayPauseBtn.classList.add('color');
        setTimeout(() => {
            playerPlayPauseBtn.classList.remove('color');
        }, 200);
    };
});

playerPreviousBtn.addEventListener('click', e => {
    e.target.classList.add('color');
    musicImage.classList.add('brightnest');
    setTimeout(() => {
        e.target.classList.remove('color');
    }, 200);
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    };
    sameOperations(audioElement, songIndex, masterMusicNameElem, playerPlayPauseBtn, pauseBtn, authorPicture, innerPlayBtnElem);
});

playerNextBtn.addEventListener('click', e => {
    e.target.classList.add('color');
    musicImage.classList.add('brightnest');
    setTimeout(() => {
        e.target.classList.remove('color');
    }, 200);
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    sameOperations(audioElement, songIndex, masterMusicNameElem, playerPlayPauseBtn, pauseBtn, authorPicture, innerPlayBtnElem);
});

function makeAllPlayBtn() {
    innerPlayBtnElem.forEach((element) => {
        element.classList = playBtn;
    });
};

export { makeAllPlayBtn };

let counter = false;
innerPlayBtnElem.forEach((element) => {
    element.addEventListener('click', e => {
        if(audioElement.played){
            musicImage.classList.add('brightnest');
        }else{
            musicImage.classList.remove('brightnest');
        }
        
        songIndex = Number(e.target.id);
        e.target.classList = pauseBtn;

        audioElement.src = `./songs/${songIndex + 1}.mp3`;
        masterMusicNameElem.innerHTML = songs[songIndex].songName;
        audioElement.currentTime = 0;
        equalizer(audioElement)
        playerPlayPauseBtn.classList = pauseBtn;
        makeAllPlayBtn();
        innerPlayBtnElem[songIndex].classList = pauseBtn
        authorPicture.src = `./imageSource/${songIndex}.jpg`
    });
});

audioElement.addEventListener('timeupdate', () => {
    let progress;
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

songItems.forEach((e, index) => {
    createSongCards(e, index);
    starRating(index);
});

function createSongCards(e, index) {
    e.querySelectorAll('.songName')[0].innerText = songs[index].songName;
    e.id = songs[index].id;
};

addBtns.forEach((btn, index) => {
    btn.addEventListener('click', e => {
        addToLocalStorage(index);
        e.target.style.color = 'black'
        setTimeout(() => {
            e.target.style.color = 'white'
        }, 200);
    });
});

favoritesElem.addEventListener('click', e => {
    savedSongItemContainer.style.display = 'block'
    songItemContainer.style.display = 'none'

    createFavoriteMusicList(songIndex, audioElement, masterMusicNameElem, musicImage, authorPicture, playerPlayPauseBtn);
});

homeElem.addEventListener('click', e => {
    savedSongItemContainer.style.display = 'none'
    songItemContainer.style.display = 'block'
});