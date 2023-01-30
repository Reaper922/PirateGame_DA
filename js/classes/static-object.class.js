/**
 * Root object of all game objects.
 */
export class StaticObject {
    constructor(ctx, layerData) {
        this.ctx = ctx;
        this.layerData = layerData;
        this.sprites = [];
        this.width = 0;
        this.height = 0;
        this.position = {
            x: 0,
            y: 0
        }
    }

    playAudio(audioObj, volume) {
        audioObj.muted = globalThis.muteGameSound;
        audioObj.currentTime = 0;
        audioObj.volume = volume;
        audioObj.play();
    }

    /**
     * Updates the game object.
     */
    update() {
    }

    /**
     * Renders the sprites of the game object.
     */
    render() {
        for (let i = 0; i < this.sprites.length; i++) {
            this.ctx.drawImage(this.sprites[i].image, this.sprites[i].position.x, this.sprites[i].position.y);
        }
    }

    /**
     * Debugging function that renders a red outline of the objects boundary.
     */
    drawRect() {
        this.ctx.beginPath();
        this.ctx.lineWidth = "2";
        this.ctx.strokeStyle = 'red';
        this.ctx.rect(this.position.x, this.position.y, this.width, this.height);
        this.ctx.stroke();
    }

    /**
     * Debugging function that renders a red ray.
     */
    drawRay(point) {
        this.ctx.beginPath();
        this.ctx.lineWidth = "5";
        this.ctx.strokeStyle = 'red';
        this.ctx.rect(point.x, point.y, 1, 1);
        this.ctx.stroke();
    }
}
