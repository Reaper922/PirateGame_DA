import { Scene } from './scene.class.js';
import { window } from './settings.js';

/**
 * Basic game class that creates an instance of the game.
 */
export class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.scene = new Scene(this.ctx);
        globalThis.frameCounter = 0;

        this.setCanvasResolution(window);
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
     * 
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
