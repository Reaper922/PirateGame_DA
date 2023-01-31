import { Scene } from './scene.class.js';
import { window } from './settings.js';

/**
 * Basic game class that creates an instance of the game.
 */
export class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.muteBtn = document.getElementById('mute');
        this.fullscreenBtn = document.getElementById('fullscreen');
        this.scene = new Scene(this.ctx);
        globalThis.frameCounter = 0;
        globalThis.muteGameSound = false;

        this.setCanvasResolution(window);
        this.eventListener();
    }

    /**
     * Sets the resolution of the canvas.
     * @param {Object} window Object that contains the width and height of the window.
     */
    setCanvasResolution(window) {
        canvas.width = window.width;
        canvas.height = window.height;
    }

    /**
     * Sets the scene to the given level.
     * @param {Number} level Number of the level that should be loaded.
     */
    setScene(level = 1) {
        this.scene = new Scene(this.ctx, level);
    }

    /**
     * Clears the canvas.
     */
    clearCanvas() {
        this.ctx.fillStyle = 'lightblue';
        this.ctx.fillRect(0, 0, window.width, window.height);
    }

    /**
     * Adds the event listener for the mute and fullscreen buttons.
     */
    eventListener() {
        this.muteBtn.addEventListener('click', () => {
            this.muteBtn.blur();
            this.toggleMute();
        });

        this.fullscreenBtn.addEventListener('click', () => {
            this.fullscreenBtn.blur();
            this.toggleFullScreen();
        });
    }

    /**
     * Function that toggles mute.
     */
    toggleMute() {
        if (!globalThis.muteGameSound) {
            globalThis.muteGameSound = true;
        } else {
            globalThis.muteGameSound = false;
        }
    }

    /**
     * Function that toggles the fullscreen mode.
     */
    toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.getElementById('container').requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    /**
     * Updates the scene.
     */
    update() {
        this.scene.update();
    }

    /**
     * Renders the scene.
     */
    render() {
        this.scene.render();
    }

    /**
     * Starts the game with the current scene.
     */
    run() {
        globalThis.frameCounter += 1;
        this.clearCanvas();
        this.update();
        this.render();
        requestAnimationFrame(this.run.bind(this));
    }
}
