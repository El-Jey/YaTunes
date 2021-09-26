import { formatTime } from './helpers.js';

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const tooltip = document.querySelector('.tooltip');
    const thumbSize = 10;

    const playlist = ["hello", "flow", "speed"];

    let fingerOnProgressThumb = false;
    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];

        audioPlayer.src = `../../assets/audio/${track}.mp3`;
        audioImg.src = `../../assets/audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    }

    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    }

    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack();
    }

    audioNavigation.addEventListener("click", event => {
        const target = event.target;

        if (target.classList.contains("audio-button__play")) {
            audio.classList.toggle("play");
            audioButtonPlay.classList.toggle("fa-play");
            audioButtonPlay.classList.toggle("fa-pause");

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }

            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }

        if (target.classList.contains("audio-button__next")) {
            nextTrack();
        }

        if (target.classList.contains("audio-button__prev")) {
            prevTrack();
        }
    });

    audioPlayer.addEventListener("ended", nextTrack);

    audioPlayer.addEventListener('loadedmetadata', () => {
        const duration = audioPlayer.duration;
        audioTimeTotal.textContent = `${formatTime(duration)}`;

        audioPlayer.addEventListener('timeupdate', () => {
            if (fingerOnProgressThumb) {
                return;
            }

            const currentTime = audioPlayer.currentTime;

            audioProgressTiming.style.width = (currentTime / duration) * 100 + "%";
            audioTimePassed.textContent = `${formatTime(currentTime)}`;
        });
    });

    audioProgress.addEventListener("click", (event) => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;

        audioPlayer.currentTime = progress;
    });

    loadTrack();

    musicPlayerInit.stop = () => {
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            audio.classList.toggle("play");
            audioButtonPlay.classList.toggle("fa-play");
            audioButtonPlay.classList.toggle("fa-pause");
        }
    }
};