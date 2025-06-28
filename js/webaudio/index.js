const NOTES = {
    'A5': 440.00,
    'A#5': 466.16,
    'B5': 493.88,
    'C5': 523.25,
    'C#5': 554.37,
    'D5': 587.33,
    'D#5': 622.25,
    'E5': 659.25,
    'F5': 698.46,
    'F#5': 739.99,
    'G5': 783.99,
    'G#5': 830.61,
    'A6': 880.00,
    'A#6': 932.33,
    'B6': 987.77,
    'C6': 1046.50,
    'C#6': 1108.73,
    'D6': 1174.66,
    'D#6': 1244.51,
    'E6': 1318.51
};

const playPause = (() => {
    const notes = [110, 146.83, 220, 440, 554.37, 659.25, 880, 1108.73];
    let playing = false;
    let oscs = [];
    
    let ac = new AudioContext();
    let dest = ac.destination;
    let detuneOsc = ac.createOscillator();
    let detuneGain = ac.createGain();
    let gain = ac.createGain();
    
    detuneOsc.frequency.value = 6;
    detuneGain.gain.value = 2;
    
    detuneOsc.connect(detuneGain);
    detuneOsc.start();
    
    gain.gain.value = 0.5;
    gain.connect(dest);
    
    const playPause = () => {
        if (!playing) {
            playing = true;
            oscs = notes.map((note) => {
                let osc = ac.createOscillator();
                osc.frequency.value = note;
                osc.type = 'squre';
                osc.connect(gain);
                osc.start();
                
                detuneGain.connect(osc.frequency);
                
                return osc;
            });
        } else {
            oscs.forEach((osc) => {
                osc.stop();
            });
            playing = false;
        }
    };
    
    return playPause;
})();

const btn = document.querySelector('button#playBtn');
btn.addEventListener('click', () => {
    playPause();
});
