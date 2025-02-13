const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const getVideo = () => {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    }).then((localMediaStream) => {
        video.src = URL.createObjectURL(localMediaStream);
        video.play();
    }).catch((err) => {
        console.error(err);
    })
};

const paintToCanvas = () => {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = myFilter(pixels);
        ctx.putImageData(pixels, 0, 0);
    }, 16);
};

let myFilter;

const redEffect = (pixels) => {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100;  // R
        pixels.data[i + 1] = pixels.data[i + 1] - 50;   // G
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5;  // B
    }

    return pixels;
};

const rgbSplit = (pixels) => {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0];  // R
        pixels.data[i + 100] = pixels.data[i + 1];   // G
        pixels.data[i - 150] = pixels.data[i + 2];  // B
    }

    return pixels;
};

myFilter = rgbSplit;

const takePhoto = (event) => {
    // snap music
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'saber');
    link.innerHTML = `<img src="${data}" alt="saber" />`
    strip.insertBefore(link, strip.firstChild);
};

getVideo();

video.addEventListener('canplay', paintToCanvas);
