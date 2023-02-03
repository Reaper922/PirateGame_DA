import { Game } from './classes/game.class.js';
import { window } from './classes/settings.js';


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const playBtn = document.getElementById('play');
const fullscreenBtn = document.getElementById('fullscreen');
const muteBtn = document.getElementById('mute');
globalThis.muteGameSound = false;


/**
 * Initial function that gets executed when the page is loaded.
 */
function init() {
    setCanvasResolution();
    eventListener();
}


/**
 * Sets the resolution of the canvas.
 */
function setCanvasResolution() {
    canvas.width = window.width;
    canvas.height = window.height;
}


/**
 * Adds the event listener for the mute and fullscreen buttons.
 */
function eventListener() {
    playBtn.addEventListener('click', (event) => {
        if (globalThis.gameRequestId) {cancelAnimationFrame(globalThis.gameRequestId)}
        const game = new Game(ctx);
        game.run();
        playBtn.blur();
        playBtn.style.display = 'none';
    })

    fullscreenBtn.addEventListener('click', () => {
        fullscreenBtn.blur();
        toggleFullScreen();
    });

    muteBtn.addEventListener('click', () => {
        muteBtn.blur();
        toggleMute();
    });
}


/**
 * Function that toggles the fullscreen mode.
 */
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.getElementById('container').requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}


/**
 * Function that toggles mute.
 */
function toggleMute() {
    if (!globalThis.muteGameSound) {
        globalThis.muteGameSound = true;
    } else {
        globalThis.muteGameSound = false;
    }
}


/**
 * Event listener to position the custom cursor on mouse movement.
 */
addEventListener('mousemove', (event) => {
    const cursor = document.getElementById('cursor');
    const offset = 2;

    cursor.style.top = `${(event.y + offset).toFixed().toString()}px`;
    cursor.style.left = `${(event.x + offset).toFixed().toString()}px`;
});


/**
 * Event listener to hide the context menu that can be opened on right click.
 */
addEventListener('contextmenu', (event) => event.preventDefault());


init();
