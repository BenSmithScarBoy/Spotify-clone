
import songsInformation from "../songsInformation.js";
const mainMusicInfoElem = document.querySelector('.main-music-info');
const bgForModalElem = document.querySelector('.bg-for-modal');


function createMainMusicInfo(btnId) {
    const info = songsInformation[btnId - 1];
    let html = '';
    html += `
        <div class="delBtn"><i class='bx bx-x'></i></div>
        <img class="artist-pic" src="${info.artistPic}" alt="artist">
        <p class="artist-name"><span class="h">Artist</span>: <i>${info.artist}</i></p>
        <p class="release-date"><span class="h">Release-Date</span>: <i>${info.realiseDate}</i></p>
        <p class="albumInfo"><span class="h">Album</span>: <i>${info.album}</i></p>
    `;
    mainMusicInfoElem.innerHTML = html;
    mainMusicInfoElem.style.display = 'flex';
    bgForModalElem.style.display = 'block';

    const delInfoBtns = document.querySelector('.delBtn');
    delInfoBtns.addEventListener('click', e => {
        mainMusicInfoElem.innerHTML = '';
        mainMusicInfoElem.style.display = 'none';
        bgForModalElem.style.display = 'none';
    });
};

export default createMainMusicInfo;