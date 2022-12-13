import { Layer } from "./layer.class.js";
import { window } from './settings.js';

/**
 * Creates the sky layer object with all cloud elements.
 */
export class Sky extends Layer {
    constructor(ctx, layerData) {
        super(ctx, layerData);
        this.createLayer('sky');
    }

    /**
     * Moves the clouds slowly to the left on the x-axis.
     */
    move() {
        for (let i = 0; i < this.sprites.length; i++) {
            const currentSprite = this.sprites[i];
            currentSprite.position.x -= 0.1;
        }
    }

    /**
     * Resets the position of the cloud if the cloud has left the canvas.
     */
    resetPosition() {
        for (let sprite of this.sprites) {
            if (sprite.position.x < 0 - sprite.image.width) {
                sprite.position.x = window.width;
            }
        }
    }

    /**
     * Updates the sky layer.
     */
    update() {
        this.resetPosition();
        this.move();
    }
} 