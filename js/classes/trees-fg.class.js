import { Layer } from "./layer.class.js";
import { tileSize, treeFgData } from './settings.js';


/**
 * Creates the TreesFg layer object with trees that are rendered in the foreground.
 */
export class TreesFG extends Layer {
    constructor(ctx, layerData) {
        super(ctx, layerData);
        super.staggerFrames = treeFgData.animationSpeed;
        this.layerName = 'foreground';

        this.loadAnimations(treeFgData.animations);
    }

    /**
     * Select the corresponding animation based on the sprite id.
     * @param {Number} dataId Id of the sprite.
     * @param {Number} col Column of the sprite.
     * @param {row} row Row of the sprite
     */
    selectAnimation(dataId, col, row) {
        switch (dataId) {
            case 8:
                this.renderSprites('palmBig', col, row, treeFgData, this);
                break;
            case 12:
                this.renderSprites('palmSmall', col, row, treeFgData, this);
                break;
            case 16:
                this.renderSprites('palmLeft', col, row, treeFgData, this);
                break;
            case 20:
                this.renderSprites('palmRight', col, row, treeFgData, this);
                break;
        }
    }

    /**
     * Sets the sprite offeset for the given animation.
     * @param {Strin} animation Name of the animation.
     * @returns Object of the sprite offset for the x and y axis
     */
    setSpriteOffset(animation) {
        if (animation === 'palmSmall') { return { x: 0, y: (30 - tileSize.height) } }
        if (animation === 'palmBig') { return { x: 0, y: (15 - tileSize.height) } }
        if (animation === 'palmLeft') { return { x: 0, y: (20 - tileSize.height) } }
        return { x: 0, y: -tileSize.height }
    }

    /**
     * Renders the sprite animation.
     */
    render() {
        this.playAnimation(this.layerName, this);
    }
}
