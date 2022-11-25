import { Game } from './classes/game.class.js';

function init() {
    const game = new Game();
    game.run();
};


addEventListener('mousemove', (event) => {
    const cursor = document.getElementById('cursor');

    cursor.style.top = `${event.y.toFixed().toString()}px`;
    cursor.style.left = `${event.x.toFixed().toString()}px`;
})


// addEventListener('contextmenu', (event) => event.preventDefault())


init();
