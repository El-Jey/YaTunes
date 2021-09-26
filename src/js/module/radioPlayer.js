import * as helpers from './helpers.js'

export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioPause = document.querySelector('.radio-pause');
    const radioVolume = document.querySelector('.radio-volume');
    const radioMute = document.querySelector('.radio-footer .volume-mute');
    const radioMax = document.querySelector('.radio-footer .volume-max');

    const audio = new Audio();
    audio.type = "audio/aac";

    radioPause.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove("play");
            radioPause.classList.add("fa-play");
            radioPause.classList.remove("fa-pause");
        } else {
            radioPause.classList.remove("fa-play");
            radioPause.classList.add("fa-pause");
            radio.classList.add("play");
        }
    };

    const selectItem = (element) => {
        radioItem.forEach(item => item.classList.remove("select"));
        element.classList.add("select");
    };

    radioNavigation.addEventListener('change', e => {
        const parent = e.target.closest(".radio-item");
        selectItem(parent);

        const title = parent.querySelector(".radio-name").textContent;
        radioHeaderBig.textContent = title;

        const urlImg = parent.querySelector(".radio-img").src;
        radioCoverImg.src = urlImg;


        radioPause.disabled = false;
        audio.src = e.target.dataset.radioStation;
        audio.play();
        changeIconPlay();
    });

    radioPause.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }

        changeIconPlay();
    });

    radioVolume.addEventListener("input", (event) => {
        helpers.changeVolume(event.target, audio);
        audio.muted = false;
    });

    radioMute.addEventListener("click", () => {
        helpers.mute(radioVolume, audio);
    });

    radioMax.addEventListener("click", () => {
        helpers.maximizeVolume(radioVolume, audio);
    });

    helpers.changeVolume(radioVolume, audio);

    radioPlayerInit.stop = () => {
        if (!audio.paused) {
            audio.pause();
            changeIconPlay();
        }
    }
};