import { Game } from './classes/game.class.js';


/**
 * Initial function that gets executed when the page is loaded.
 */
function init() {
  const game = new Game();
  game.run();
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
