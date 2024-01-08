import songs from "./songs.js";

let arr = []; 
function addToLocalStorage(index) {
    arr.push(songs[index])
    localStorage.setItem('arrOfMusic', JSON.stringify(arr));
};

export default addToLocalStorage;