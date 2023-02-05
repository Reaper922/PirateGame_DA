import { Game } from './classes/game.class.js';
import { window } from './classes/settings.js';


const container = document.getElementById('container');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const playBtn = document.getElementById('play');
const fullscreenBtn = document.getElementById('fullscreen');
const muteBtn = document.getElementById('mute');
const loadingScreen = document.getElementById('loading-screen');

globalThis.muteGameSound = false;


/**
 * Initial function that gets executed when the page is loaded.
 */
function init() {
    setCanvasResolution();
    ButtonEventListener();
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
function ButtonEventListener() {
    playBtn.addEventListener('click', () => {
        if (globalThis.gameRequestId) {cancelAnimationFrame(globalThis.gameRequestId)}
        const game = new Game(ctx);
        game.run();
        playBtn.blur();
        playBtn.style.display = 'none';
        loadingScreen.style.display = 'inline';
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
        container.requestFullscreen();
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
        muteBtn.src = './assets/sprites/buttons/unmute.png';
    } else {
        globalThis.muteGameSound = false;
        muteBtn.src = './assets/sprites/buttons/mute.png';
    }
}


/**
 * Event listener to position the custom cursor on mouse movement.
 */
onmousemove = (event) => {
    const cursor = document.getElementById('cursor');
    const offset = 2;

    cursor.style.top = `${(event.y + offset).toFixed().toString()}px`;
    cursor.style.left = `${(event.x + offset).toFixed().toString()}px`;
}


/**
 * Event listener to hide the context menu that can be opened on right click.
 */
oncontextmenu = (event) => event.preventDefault();


init();
