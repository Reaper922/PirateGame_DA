import { gravity } from "./settings.js";
import { Sprite } from "./sprite.class.js";

export class GameObject {
    constructor(path) {
        this.sprite = new Sprite(path).image;
        this.width = 0;
        this.height = 0;
        this.isStatic = true;
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 0,
            y: 0
        }
    }

    addGravity() {
        if (this.velocity.y < 10 && !this.isStatic) {
            this.velocity.y += gravity;
        }
        this.position.y += Number(this.velocity.y.toFixed(1));
    }

    update() {
        this.addGravity();
    }

    render() {
        this.ctx.drawImage(this.sprite, this.position.x, this.position.y)
    }

    // Debuging
    drawRect () {
        this.ctx.beginPath();
        this.ctx.lineWidth = "2";
        this.ctx.strokeStyle = 'red';
        this.ctx.rect(this.position.x, this.position.y, this.width, this.height);
        this.ctx.stroke();
    }
}
