import { Game } from './classes/game.class.js';


const muteBtn = document.getElementById('mute');
const fullscreenBtn = document.getElementById('fullscreen');
globalThis.muteGameSound = false;


/**
 * Initial function that gets executed when the page is loaded.
 */
function init() {
  const game = new Game();
  game.run();
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
 * Event listener to toogle mute on click.
 */
muteBtn.addEventListener('click', () => {
  muteBtn.blur();
  toggleMute();
});


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
 * Event listener to toogle fullscreen on click.
 */
fullscreenBtn.addEventListener('click', () => {
  fullscreenBtn.blur();
  toggleFullScreen();
});


/**
 * Event listener to position the custom cursor on mouse movement.
 */
addEventListener('mousemove', (event) => {
  const cursor = document.getElementById('cursor');

  cursor.style.top = `${(event.y + 2).toFixed().toString()}px`;
  cursor.style.left = `${(event.x + 2).toFixed().toString()}px`;
});


/**
 * Event listener to hide the context menu that can be opened on right click.
 */
addEventListener('contextmenu', (event) => event.preventDefault());


init();
