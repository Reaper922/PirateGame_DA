import { Scene } from './scene.class.js';
import { window } from './settings.js';


/**
 * Basic game class that creates an instance of the game.
 */
export class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.scene = new Scene(this.ctx);
        this.timePrevFrame = 0;
        globalThis.deltaTime = 0;
        globalThis.frameCounter = 0;
    }

    /**
     * Clears the canvas.
     */
    clearCanvas() {
        this.ctx.fillStyle = 'lightblue';
        this.ctx.fillRect(0, 0, window.width, window.height);
    }

    /**
     * Sets the scene to the given level.
     * @param {Number} level Number of the level that should be loaded.
     */
    setScene(level = 1) {
        this.scene = new Scene(this.ctx, level);
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
    run(time = 0) {
        globalThis.deltaTime = (time - this.timePrevFrame) / 100;
        globalThis.frameCounter += 1;
        this.timePrevFrame = time;
        this.clearCanvas();
        this.update();
        this.render();
        globalThis.gameRequestId = requestAnimationFrame(this.run.bind(this));
    }
}
