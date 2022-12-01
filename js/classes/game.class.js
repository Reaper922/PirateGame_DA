import { Scene } from './scene.class.js';
import { window } from './settings.js';

export class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.scene = new Scene(this.ctx);
        globalThis.frameCounter = 0;

        this.setCanvasResolution(window);
    }

    setCanvasResolution(window) {
        canvas.width = window.width;
        canvas.height = window.height;
    }

    setScene(level = 1) {
        this.scene = new Scene(this.ctx, level);
    }

    clearCanvas() {
        this.ctx.fillStyle = 'lightblue';
        this.ctx.fillRect(0, 0, window.width, window.height);
    }

    update() {
        this.scene.update();
    }

    render() {
        this.scene.render();
    }

    run() {
        this.clearCanvas();
        this.update();
        this.render();
        globalThis.frameCounter += 1;
        requestAnimationFrame(this.run.bind(this));
    }
}
