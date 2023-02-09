/**
 * Audio class that represents a game sound.
 */
export class GameAudio {
    constructor(path, volume = 1, restartOnPlay = false) {
        this.audio = new Audio(path);
        this.audio.volume = volume;
        this.restartOnPlay = restartOnPlay;
    }
    
    /**
     * Plays the audio.
     */
    play() {
        if (this.restartOnPlay) {this.audio.currentTime = 0}
        this.audio.muted = globalThis.muteGameSound;
        this.audio.play();
    }

    /**
     * Stops playing the audio.
     */
    stop() {
        this.audio.currentTime = 0;
        this.audio.pause();
    }
}