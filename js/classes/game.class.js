import { FrameCounter } from './frame-counter.class.js';
import { Scene } from './scene.class.js';
import { window } from './settings.js';

export class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.frameCounter = new FrameCounter();
        this.scene = new Scene(this.ctx, this.frameCounter);

        this.setCanvasResolution(window);
    }

    setCanvasResolution(window) {
        canvas.width = window.width;
        canvas.height = window.height;
    }

    setScene(canvas, level = 1) {
        this.scene = new Scene(canvas, level);
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
        this.frameCounter.increaseCurrentFrame();
        requestAnimationFrame(this.run.bind(this));
    }
}
