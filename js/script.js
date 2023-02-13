import { Game } from './classes/game.class.js';
import { gameWindow } from './classes/settings.js';


const container = document.getElementById('container');
const ratioContainer = document.getElementById('ratio-container');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const playBtn = document.getElementById('play');
const playAgainBtn = document.getElementById('play-again');
const fullscreenBtn = document.getElementById('fullscreen');
const muteBtn = document.getElementById('mute');
const cursor = document.getElementById('cursor');

let game = null;

globalThis.muteGameSound = false;


/**
 * Initial function that gets executed when the page is loaded.
 */
function init() {
    setCanvasResolution();
    ButtonEventListener();
    hideCursorOnMobile();
    game = new Game(ctx);
}


/**
 * Sets the resolution of the canvas.
 */
function setCanvasResolution() {
    canvas.width = gameWindow.width;
    canvas.height = gameWindow.height;
}


/**
 * Adds the event listener to all elements.
 */
function ButtonEventListener() {
    playBtnEventListener();
    playAgainBtnEventListener();
    fullscreenBtnEventListener();
    muteBtnEventListener();
    containerEventListener();
}


/**
 * Adds the click event listener to the play button.
 */
function playBtnEventListener() {
    playBtn.addEventListener('click', () => {
        game.init();
        game.run();
    });
}


/**
 * Adds the click event listener to the play again button.
 */
function playAgainBtnEventListener() {
    playAgainBtn.addEventListener('click', () => {
        cancelAnimationFrame(globalThis.gameRequestId);
        game.stopMusic();
        game.hideEndScreen();
        game = new Game(ctx);
        game.run();
    });
}


/**
 * Adds the click event listener to the fullscreen button.
 */
function fullscreenBtnEventListener() {
    fullscreenBtn.addEventListener('click', () => {
        fullscreenBtn.blur();
        toggleFullScreen();
    });
}


/**
 * Adds the click event listener to the mute button.
 */
function muteBtnEventListener() {
    muteBtn.addEventListener('click', () => {
        muteBtn.blur();
        toggleMute();
    });
}


/**
 * Adds the fullscreenchange event listener to the container.
 */
function containerEventListener() {
    container.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            resetRatioContainer();
        }
    });
}


/**
 * Function that toggles the fullscreen mode.
 */
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        container.requestFullscreen();
        setTimeout(() => adjustCanvasAspectRatio(), 100)
    } else if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}


/**
 * Function that toggles mute.
 */
function toggleMute() {
    if (!globalThis.muteGameSound) {
        globalThis.muteGameSound = true;
        muteBtn.src = './assets/sprites/buttons/unmute.png';
    } else {
        globalThis.muteGameSound = false;
        muteBtn.src = './assets/sprites/buttons/mute.png';
    }
}

/**
 * Function to change the size of the ratio container in fullscreen mode to keep the aspect ratio.
 */
function adjustCanvasAspectRatio() {
    const aspectRatioCanvas = gameWindow.width / gameWindow.height;
    const aspectRatioInner = innerWidth / innerHeight;

    if (document.fullscreenElement && aspectRatioInner < aspectRatioCanvas) {
        const calcHeight = (innerWidth / gameWindow.width) * gameWindow.height;

        ratioContainer.style.width = `${innerWidth}px`;
        ratioContainer.style.height = `${calcHeight}px`;
    }

    if (document.fullscreenElement && aspectRatioInner > aspectRatioCanvas) {
        const calcWidth = (innerHeight / gameWindow.height) * gameWindow.width;

        ratioContainer.style.width = `${calcWidth}px`;
        ratioContainer.style.height = `${innerHeight}px`;
    }
}


/**
 * Resets the styling of the ratio container after exiting fullscreen.
 */
function resetRatioContainer() {
    ratioContainer.style.width = 'auto';
    ratioContainer.style.height = 'auto';
}


/**
 * Hides the custom mouse cursor on mobile devices.
 */
function hideCursorOnMobile() {
    if (navigator.userAgent.match(/Android|webOS|iPhone|iPod|iPad|Blackberry/i)) {
        cursor.style.display = 'none';
    } else {
        cursor.style.display = 'inline';
    }
}


/**
 * Event listener to position the custom cursor on mouse movement.
 */
onmousemove = (event) => {
    const offset = 2;

    cursor.style.top = `${(event.y + offset).toFixed().toString()}px`;
    cursor.style.left = `${(event.x + offset).toFixed().toString()}px`;
}


/**
 * Event listener to hide the context menu that can be opened on right click.
 */
oncontextmenu = (event) => event.preventDefault();


/**
 * Event listener that gets triggert on window resize and adjusts the canvas aspect ratio on fullscreen mode.
 */
onresize = () => {
    adjustCanvasAspectRatio();
}


init();
