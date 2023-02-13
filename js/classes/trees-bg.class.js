import { Layer } from "./layer.class.js";
import { tileSize, treeBgData } from './settings.js';


/**
 * Creates the TreesBg layer object with trees that are rendered in the background.
 */
export class TreesBG extends Layer {
    constructor(ctx, layerData) {
        super(ctx, layerData);
        super.staggerFrames = treeBgData.animationSpeed;
        this.layerName = 'background';

        this.loadAnimations(treeBgData.animations);
    }

    /**
     * Select the corresponding animation based on the sprite id.
     * @param {Number} dataId Id of the sprite.
     * @param {Number} col Column of the sprite.
     * @param {row} row Row of the sprite
     */
    selectAnimation(dataId, col, row) {
        switch (dataId) {
            case 24:
                this.renderSprites('palmBig', col, row, treeBgData, this);
                break;
            case 28:
                this.renderSprites('palmSmall', col, row, treeBgData, this);
                break;
            case 35:
                this.renderSprites('palmLeft', col, row, treeBgData, this);
                break;
            case 36:
                this.renderSprites('palmRight', col, row, treeBgData, this);
                break;
        }
    }

    /**
     * Sets the sprite offeset for the given animation.
     * @param {Strin} animation Name of the animation.
     * @returns Object of the sprite offset for the x and y axis
     */
    setSpriteOffset(animation) {
        if (animation === 'palmLeft') { return { x: 0, y: (20 - tileSize.height) } }
        if (animation === 'palmRight') { return { x: -10, y: (20 - tileSize.height) } }
        if (animation === 'palmSmall') { return { x: 0, y: (10 - tileSize.height) } }
        return { x: 0, y: -tileSize.height }
    }

    /**
     * Renders the sprite animation.
     */
    render() {
        this.playAnimation(this.layerName, this);
    }
}
