import { levelSize, tileSize } from "./settings.js";
import { StaticObject } from "./static-object.class.js";
import { Sprite } from "./sprite.class.js";


/**
 * Class that represents a sprite layer.
 */
export class Layer extends StaticObject {
    constructor(ctx, layerData) {
        super(ctx, layerData);
    }

    /**
     * Creates the layer based on the tiled array. -> For static layers.
     * @param {String} layer Name of the layer.
     */
    createLayer(layer, layerData = null) {
        const dataArray = this.layerData[layer].data;
        const levelWidth = levelSize.width;
        let row = 0;

        for (let i = 0; i < dataArray.length; i++) {
            const col = i % levelWidth;
            const dataId = dataArray[i];

            if (dataId != 0) {
                this.createSprite(dataId, layer, col, row, layerData);
            }

            if (col === (levelWidth - 1)) { row += 1 }
        }
    }

    /**
     * Creates a sprite and adds it to the sprite array.
     * @param {Number} dataId Id of the sprite.
     * @param {String} layer Name of the layer.
     * @param {Number} col Colum of the sprite.
     * @param {Number} row Row of the sprite.
     * @param {Object} layerData Data of the layer.
     */
    createSprite(dataId, layer, col, row, layerData) {
        const tileWidth = tileSize.width;
        const tileHeight = tileSize.height;
        const id = dataId + this.layerData[layer].spriteOffset;
        const sprite = new Sprite(`${this.layerData[layer].path}/${id}.png`);
        const spriteCorrectionX = layerData ? layerData.spriteCorrection.x : 0;
        const spriteCorrectionY = layerData ? layerData.spriteCorrection.y : 0;

        sprite.position.x = col * tileWidth + spriteCorrectionX;
        sprite.position.y = row * tileHeight + spriteCorrectionY;
        this.sprites.push(sprite);
    }

    /**
     * Play the sprite animation based on the sprite id.
     * @param {String} layer Name of the layer
     * @param {Object} layerObject Object of the layer.
     */
    playAnimation(layer, layerObject) {
        const dataArray = this.layerData[layer].data;
        const levelWidth = levelSize.width;
        const currentFrame = globalThis.frameCounter;
        let row = 0;

        if ((currentFrame % this.staggerFrames) == 0) { this.animationFrame++ }

        for (let i = 0; i < dataArray.length; i++) {
            const col = i % levelWidth;
            const dataId = dataArray[i];

            if (dataId != 0) {
                layerObject.selectAnimation(dataId, col, row);
            }

            if (col === (levelWidth - 1)) { row += 1 }
        }
    }

    /**
     * Renders the sprite animation based on the animation name.
     * @param {String} animation Name of the animation.
     * @param {Number} col Column of the sprite.
     * @param {Number} row Row of the sprite.
     * @param {Object} animationData Object with animation data.
     * @param {Object} layerObject Object of the layer.
     */
    renderSprites(animation, col, row, animationData, layerObject) {
        const spriteArr = this.animations[animation];
        const tileWidth = tileSize.width;
        const tileHeight = tileSize.height;
        const numSprites = animationData.animations[animation].numSprites;
        const spriteOffset = layerObject.setSpriteOffset(animation);

        this.ctx.drawImage(spriteArr[this.animationFrame % numSprites], (col * tileWidth) + spriteOffset.x, ((row * tileHeight)) + spriteOffset.y);
    }
}
