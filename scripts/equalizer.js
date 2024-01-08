
let num = 25;
let width = 10;
let context;
let analyser;
let src;
let dataArray;


function equalizer(audioElement) {
    if (!context) {
        preparation(audioElement);
    }

    if (audioElement.paused) {
        audioElement.play();
        loop(audioElement);
    }

    let myElements = document.getElementsByClassName('logo');
    for (let i = 0; i < num; i++) {
        if (!myElements[i]) {
            let logo = document.createElement('div');
            logo.className = 'logo';
            logo.style.backgroundColor = 'green';
            logo.style.minWidth = width + 'px';
            const equalizerWrapperElem = document.querySelector('.equalizer__w');
            equalizerWrapperElem.appendChild(logo);
        }
    }
}

export default equalizer;

function preparation(audioElement) {
    context = new (window.AudioContext)();
    analyser = context.createAnalyser();
    src = context.createMediaElementSource(audioElement);
    src.connect(analyser);
    analyser.connect(context.destination);
    dataArray = new Uint8Array(analyser.frequencyBinCount);
};

function loop(audioElement) {
    if (!audioElement.paused) {
        window.requestAnimationFrame(loop);
        analyser.getByteFrequencyData(dataArray);
        let myElements = document.getElementsByClassName('logo');
        for (let i = 0; i < num; i++) {
            let height = dataArray[i];
            if (myElements[i]) {
                myElements[i].style.minHeight = height + 'px';
                myElements[i].style.opacity = 0.008 * height;
            };
        };
    };
};