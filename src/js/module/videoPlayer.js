import { formatTime } from './helpers.js';

export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const volumeMute = document.querySelector('.video .volume-mute');
    const volumeMax = document.querySelector('.video .volume-max');
    const videoFullscreen = document.querySelector('.video-fullscreen');

    const tooltip = document.querySelector('.tooltip');
    const thumbSize = 10;

    let fingerOnProgressThumb = false;
    let prevVolume;

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    };

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    const changeVolume = () => {
        const valueVolume = videoVolume.value;
        videoPlayer.volume = valueVolume / 100;
    };

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        if (fingerOnProgressThumb) {
            return;
        }
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;
        videoTimePassed.textContent = `${formatTime(currentTime)}`;
        videoTimeTotal.textContent = `${formatTime(duration)}`;
    });

    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;

        fingerOnProgressThumb = false;
        setTimeout(() => {
            if (!fingerOnProgressThumb) {
                tooltip.classList.remove("active");
            }
        }, 1000);
    });

    videoProgress.addEventListener('input', () => {
        if (!fingerOnProgressThumb) {
            fingerOnProgressThumb = true;
            tooltip.classList.add("active");
        }

        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        const rangeMax = videoProgress.offsetWidth + videoProgress.offsetLeft;
        const rangeMin = videoProgress.offsetLeft;

        const rangeValueToPx = ((value) / 100 * (rangeMax - rangeMin)) + rangeMin;
        const newValue = (rangeValueToPx - rangeMin) * 100 / (rangeMax - rangeMin);
        const newPosition = thumbSize - newValue * 0.22 - rangeMin + (videoProgress.offsetParent.offsetWidth - videoProgress.offsetWidth - videoProgress.offsetLeft);

        tooltip.style.left = `calc(${newValue}% + (${newPosition}px))`;
        tooltip.innerHTML = formatTime((value * duration) / 100);
    });

    videoVolume.addEventListener("input", changeVolume);

    volumeMute.addEventListener("click", () => {
        if (videoPlayer.volume !== 0) {
            prevVolume = videoPlayer.volume;
            videoVolume.value = 0;
            changeVolume();
        } else {
            videoVolume.value = prevVolume * 100;
            changeVolume();
        }
    });

    volumeMax.addEventListener("click", () => {
        if (videoPlayer.volume < 1) {
            prevVolume = videoPlayer.volume;
            videoVolume.value = 100;
            changeVolume();
        } else {
            videoVolume.value = prevVolume * 100;
            changeVolume();
        }
    });

    videoFullscreen.addEventListener("click", () => {
        videoPlayer.requestFullscreen();
    })

    changeVolume();

    videoPlayerInit.stop = () => {
        videoPlayer.pause();
        toggleIcon();
    }
};