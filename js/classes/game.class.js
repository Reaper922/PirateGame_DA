import { Scene } from './scene.class.js';
import { loadingDelay, window } from './settings.js';


/**
 * Basic game class that creates an instance of the game.
 */
export class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.scene = new Scene(this.ctx);
        this.timePrevFrame = 0;
        this.isLoaded = false;
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
     * Updates the progress bar of the loading screen
     */
    updateProgressBar() {
        if (!this.isLoaded) {
            const progress = (globalThis.frameCounter / loadingDelay) * 100;
            const progressBar = document.getElementById('progress');

            progressBar.style.width = `${progress}%`;
        }
    }

    /**
     * Hides the loading screen.
     */
    hideLoadingScreen() {
        if (!this.isLoaded && globalThis.frameCounter >= loadingDelay) {
            const loadingScreen = document.getElementById('loading-bar');
            
            loadingScreen.style.display = 'none';
            this.isLoaded = true;
        }
    }

    /**
     * Show the touch controls for mobile devices.
     */
    showTouchControls() {
        if (this.isLoaded) {
            const leftBtn = document.getElementById('left');
            const rightBtn = document.getElementById('right');
            const jumpBtn = document.getElementById('jump');
            const attackBtn = document.getElementById('attack');

            leftBtn.style.display = 'inline';
            rightBtn.style.display = 'inline';
            jumpBtn.style.display = 'inline';
            attackBtn.style.display = 'inline';
        }
    }

    /**
     * Calculates the delta time.
     * @param {number} time Indicates the current time (based on the number of milliseconds since the game loop started.
     */
    calculateDeltaTime(time) {
        globalThis.deltaTime = (time - this.timePrevFrame) / 100;
        this.timePrevFrame = time;
    }

    /**
     * Updates the scene.
     */
    update() {
        this.updateProgressBar();
        this.hideLoadingScreen();
        this.showTouchControls();
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
        this.calculateDeltaTime(time);
        this.clearCanvas();
        this.update();
        this.render();
        globalThis.frameCounter += 1;
        globalThis.gameRequestId = requestAnimationFrame(this.run.bind(this));
    }
}
