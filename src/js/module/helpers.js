export const formatTime = time => {
    const defaultTime = "00:00";

    if (time === undefined) {
        return defaultTime;
    }

    if ((typeof (time) === "number" || typeof (time) === "string") && !isNaN(time)) {
        let hours = Math.floor(time / 3600) || "0";
        let minutes = Math.floor((time / 60) % 60) || "0";
        let seconds = Math.floor(time % 60) || "0";

        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        if (hours === "00") {
            return `${minutes}:${seconds}`;
        }

        return `${hours}:${minutes}:${seconds}`;
    }

    return defaultTime;
}

export const changeVolume = (volumeControlElem, multimedia) => {
    const valueVolume = volumeControlElem.value;
    multimedia.volume = valueVolume / 100;
};

export const mute = (volumeControlElem, multimedia) => {
    if (volumeControlElem.value === volumeControlElem.min && (typeof volumeControlElem.dataset.prevVolume === 'undefined' || volumeControlElem.dataset.prevVolume === volumeControlElem.min)) {
        return;
    }

    if (multimedia.volume !== 0) {
        volumeControlElem.value = volumeControlElem.min;
        volumeControlElem.dataset.prevVolume = void 0;
        changeVolume(volumeControlElem, multimedia);
    } else {
        volumeControlElem.value = volumeControlElem.dataset.prevVolume ? (volumeControlElem.dataset.prevVolume * 100) : volumeControlElem.min;
        changeVolume(volumeControlElem, multimedia);
        volumeControlElem.dataset.prevVolume = multimedia.volume;
    }
};

export const maximizeVolume = (volumeControlElem, multimedia) => {
    if (volumeControlElem.value === volumeControlElem.max && (typeof volumeControlElem.dataset.prevVolume === 'undefined' || volumeControlElem.dataset.prevVolume === volumeControlElem.max)) {
        return;
    }

    if (multimedia.volume < 1) {
        volumeControlElem.value = volumeControlElem.max;
        volumeControlElem.dataset.prevVolume = void 0;
        changeVolume(volumeControlElem, multimedia);
    } else {
        volumeControlElem.value = volumeControlElem.dataset.prevVolume ? (volumeControlElem.dataset.prevVolume * 100) : volumeControlElem.max;
        changeVolume(volumeControlElem, multimedia);
        volumeControlElem.dataset.prevVolume = multimedia.volume;
    }
}