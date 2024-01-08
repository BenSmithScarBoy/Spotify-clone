
import equalizer from "./equalizer.js";
import songs from "./songs.js";
import createMainMusicInfo from "./createMainMusicInfo.js";

const pauseBtn = 'bx bx-pause-circle';
const playBtn = 'bx bx-play-circle';
const savedSongItemContainer = document.querySelector('.savedSongItemContainer');


function createFavoriteMusicList(songIndex, audioElement, masterMusicNameElem, musicImage, authorPicture, playerPlayPauseBtn) {
    let favMusicArr = localStorage.getItem('arrOfMusic') ? JSON.parse(localStorage.getItem('arrOfMusic')) : [];
    const savedSongItem = document.querySelector('.savedSongItem');
    if (favMusicArr.length === 0) {
        try {
            savedSongItem.parentNode.removeChild(savedSongItem);
            localStorage.clear();
        } catch (error) {
            console.error(error.message);
        }
    }

    if (favMusicArr.length > 0) {
        let html = '';
        for (let i = 0; i < favMusicArr.length; i++) {
            html += `
                <div class="savedSongItem">
                    <span class="removeInterests"><i data-id="${favMusicArr[i].id}" class='bx bx-x-circle delete'></i></span>
                    <span class="songName">${favMusicArr[i].songName}</span>
                    <div class="w">
                        <span class="info"><i data-id="${favMusicArr[i].id}" class='bx bx-info-circle'></i></span>
                        <span class="play-and-pause"><i id = "${favMusicArr[i].id - 1}" class='bx bx-play-circle innerPlay'></i></span>
                    </div>
                </div>  
            `;
        };
        savedSongItemContainer.innerHTML = html;
    };

    const innerPlayBtns = document.querySelectorAll('.innerPlay');
    const deleteFromFavorites = document.querySelectorAll('.delete');
    const infoBtns = document.querySelectorAll('.info');

    function makePlayBtn() {
        innerPlayBtns.forEach((element) => {
            element.classList = playBtn;
        });
    };

    innerPlayBtns.forEach(elem => {
        elem.addEventListener('click', e => {
            if (audioElement.played) {
                musicImage.classList.add('brightnest');
            } else {
                musicImage.classList.remove('brightnest');
            }
            songIndex = Number(e.target.id);
            makePlayBtn();
            e.target.classList = pauseBtn;
            audioElement.src = `./songs/${songIndex + 1}.mp3`;
            masterMusicNameElem.innerHTML = songs[songIndex].songName;
            audioElement.currentTime = 0;
            equalizer(audioElement);
            playerPlayPauseBtn.classList = pauseBtn;
            innerPlayBtns[songIndex].classList = pauseBtn;
            authorPicture.src = `./imageSource/${songIndex}.jpg`;
        });
    });

    deleteFromFavorites.forEach(delBtn => {
        delBtn.addEventListener('click', e => {
            const delItemId = Number(e.target.dataset.id);
            const filteredArray = favMusicArr.filter(obj => obj.id !== delItemId);
            console.log(filteredArray);
            localStorage.clear();
            localStorage.setItem('arrOfMusic', JSON.stringify(filteredArray));
            createFavoriteMusicList(songIndex, audioElement, masterMusicNameElem, musicImage, authorPicture, playerPlayPauseBtn);
        });
    });

    infoBtns.forEach((btn) => {
        btn.addEventListener('click', e => {
            createMainMusicInfo(Number(e.target.dataset.id));
        })
    })
};

export default createFavoriteMusicList;