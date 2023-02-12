import { Scene } from './scene.class.js';
import { loadingDelay, gameWindow } from './settings.js';


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
        globalThis.frameCounter = 0;
        globalThis.deltaTime = 0;
    }

    /**
     * Initial function that have to be called before the run function is executed.
     */
    init() {
        this.hideMenuScreen();
        this.showLoadingScreen();
    }

    /**
     * Clears the canvas.
     */
    clearCanvas() {
        this.ctx.fillStyle = 'lightblue';
        this.ctx.fillRect(0, 0, gameWindow.width, gameWindow.height);
    }

    /**
     * Sets the scene to the given level.
     * @param {Number} level Number of the level that should be loaded.
     */
    // setScene(level = 1) {
    //     this.scene = new Scene(this.ctx, level);
    // }

    hideMenuScreen() {
        const playBtn = document.getElementById('play');
        const background = document.getElementById('background');
        const controls = document.getElementById('controls');
        const title = document.getElementById('title');

        playBtn.blur();
        playBtn.style.display = 'none';
        background.style.display = 'none';
        controls.style.display = 'none';
        title.style.display = 'none';
    }

    /**
     * Shows the loading screen.
     */
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
     * Updates the progress bar and the boat of the loading screen.
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

    /**
     * Calculates the progress of the boat by mapping the range from 2 - 80 to 1 - 100.
     * @param {number} progress Progress of the progress bar.
     * @returns Mapped range value (2 - 80).
     */
    calculateBoatProgress(progress) {
        const inpStart = 0;
        const inpEnd = 100;
        const outpStart = 2;
        const outpEnd = 80;
        const boatProgress = outpStart + ((outpEnd - outpStart) / (inpEnd - inpStart)) * (progress - inpStart);

        return boatProgress;
    }

    /**
     * Shows the end screen.
     * @param {string} state Status whether the game was won or lost.
     */
    showEndScreen(state) {
        const winMessage = document.getElementById('win');
        const loseMessage = document.getElementById('lose');
        const endScreen = document.getElementById('end-screen');

        if (state === 'win') { winMessage.style.display = 'inline' };
        if (state === 'lose') { loseMessage.style.display = 'inline' };
        endScreen.style.display = 'inline';
        this.isGameOver = true;
    }

    /**
     * Hides the end screen.
     */
    hideEndScreen() {
        const winMessage = document.getElementById('win');
        const loseMessage = document.getElementById('lose');
        const endScreen = document.getElementById('end-screen');

        winMessage.style.display = 'none';
        loseMessage.style.display = 'none';
        endScreen.style.display = 'none';
    }

    /**
     * Stops playing the background music.
     */
    stopMusic() {
        this.scene.backgroundMusic.stop();
    }

    /**
     * Show the touch controls for mobile devices.
     */
    showTouchControlsOnMobile() {
        const leftBtn = document.getElementById('left');
        const rightBtn = document.getElementById('right');
        const jumpBtn = document.getElementById('jump');
        const attackBtn = document.getElementById('attack');
        const isMobileDevice = navigator.userAgent.match(/Android|webOS|iPhone|iPod|AppleWebKit|Blackberry/i);

        leftBtn.style.display = isMobileDevice ? 'inline' : 'none';
        rightBtn.style.display = isMobileDevice ? 'inline' : 'none';
        jumpBtn.style.display = isMobileDevice ? 'inline' : 'none';
        attackBtn.style.display = isMobileDevice ? 'inline' : 'none';
    }

    /**
     * Hides the custom mouse cursor on mobile devices.
     */
    hideCursorOnMobile() {
        const cursor = document.getElementById('cursor');
        const isMobileDevice = navigator.userAgent.match(/Android|webOS|iPhone|iPod|AppleWebKit|Blackberry/i);

        cursor.style.display = isMobileDevice ? 'none' : 'block';
    }

    /**
     * Calculates the delta time.
     * @param {number} time Indicates the current time (based on the number of milliseconds since the game loop started).
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
        this.showTouchControlsOnMobile();
        this.hideCursorOnMobile();
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
