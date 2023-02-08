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
        this.isGameOver = false;
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
    // setScene(level = 1) {
    //     this.scene = new Scene(this.ctx, level);
    // }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');

        loadingScreen.style.display = 'inline';
    }

    /**
     * Hides the loading screen.
     */
    hideLoadingScreen() {
        if (!this.isLoaded && globalThis.frameCounter >= loadingDelay) {
            const loadingScreen = document.getElementById('loading-screen');

            loadingScreen.style.display = 'none';
            this.isLoaded = true;
        }
    }

    /**
     * Updates the progress bar of the loading screen
     */
    updateProgressBar() {
        if (!this.isLoaded) {
            const progress = ((globalThis.frameCounter / loadingDelay) * 100).toFixed(2);
            const progressBar = document.getElementById('progress');
            const boat = document.getElementById('boat');
            const boatProgress = this.calculateBoatProgress(progress);

            progressBar.style.width = `${progress}%`;
            boat.style.left = `${boatProgress}%`;
        }
    }

    calculateBoatProgress(progress) {
        const inpStart = 0;
        const inpEnd = 100;
        const outpStart = 2;
        const outpEnd = 80;

        return outpStart + ((outpEnd - outpStart) / (inpEnd - inpStart)) * (progress - inpStart)
    }

    showEndScreen(type) {
        const endMessage = document.getElementById('end-message');
        const endScreen = document.getElementById('end-screen');

        endMessage.innerHTML = type === 'win' ? 'You win!' : 'You lose!';
        endScreen.style.display = 'inline';
        this.isGameOver = true;
    }

    /**
     * Show the touch controls for mobile devices.
     */
    showTouchControls() {
        const leftBtn = document.getElementById('left');
        const rightBtn = document.getElementById('right');
        const jumpBtn = document.getElementById('jump');
        const attackBtn = document.getElementById('attack');

        if (this.isLoaded && navigator.userAgent.match(/Android|webOS|iPhone|iPod|Blackberry/i)) {
            leftBtn.style.display = 'inline';
            rightBtn.style.display = 'inline';
            jumpBtn.style.display = 'inline';
            attackBtn.style.display = 'inline';
        } else {
            leftBtn.style.display = 'none';
            rightBtn.style.display = 'none';
            jumpBtn.style.display = 'none';
            attackBtn.style.display = 'none';
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
        if (this.scene.gameState != 'running' && !this.isGameOver) { this.showEndScreen(this.scene.gameState) }
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
