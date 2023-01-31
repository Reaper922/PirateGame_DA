export class GameAudio {
    constructor(path, volume = 1, restart = false) {
        this.audio = new Audio(path);
        this.audio.volume = volume;
        this.restart = restart;
    }
    
    play() {
        if (this.restart) {this.audio.currentTime = 0}
        this.audio.muted = globalThis.muteGameSound;
        this.audio.play();
    }
}