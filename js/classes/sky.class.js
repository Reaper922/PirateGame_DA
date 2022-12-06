import { GameObject } from "./game-object.class.js";
import { window } from './settings.js';


export class Sky extends GameObject {
    constructor(ctx, levelData) {
        super(ctx, levelData);
        this.createLayer('sky');
        // this.speedSmall = 1;
        // this.speedMedium = 4;
        // this.speedBig = 6;
    }

    move() {
        for (let i = 0; i < this.sprites.length; i++) {
            const currentSprite = this.sprites[i];
            currentSprite.position.x -= 0.1;
        }
    }

    resetPosition() {
        for (let sprite of this.sprites) {
            if (sprite.position.x < 0 - sprite.image.width) {
                sprite.position.x = window.width;
            }
        }
    }

    update() {
        this.resetPosition();
        this.move();
    }
} 