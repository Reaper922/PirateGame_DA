import { Layer } from "./layer.class.js";
import { waterData } from './settings.js';


/**
 * Creates the water layer object with water elements.
 */
export class Water extends Layer {
    constructor(ctx, layerData) {
        super(ctx, layerData);
        super.staggerFrames = waterData.animationSpeed;
        this.layerName = 'water';

        this.loadAnimations(waterData.animations);
        this.createLayer('water')
    }

    /**
     * Select the corresponding animation based on the sprite id.
     * @param {Number} dataId Id of the sprite.
     * @param {Number} col Column of the sprite.
     * @param {row} row Row of the sprite.
     */
    selectAnimation(dataId, col, row) {
        switch (dataId) {
            case 1:
                this.renderSprites('water', col, row, waterData, this);
                break;
            case 2:
                this.renderSprites('water1', col, row, waterData, this);
                break;
        }
    }

    /**
     * Sets the sprite offeset for the given animation.
     * @param {Strin} animation Name of the animation.
     * @returns Object of the sprite offset for the x and y axis
     */
    setSpriteOffset(animation) {
        return { x: 0, y: 0 }
    }

    /**
     * Renders the sprite animation.
     */
    render() {
        this.playAnimation(this.layerName, this);
    }
}
