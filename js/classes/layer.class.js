import { StaticObject } from "./static-object.class.js";
import { levelSize, tileSize } from "./settings.js";
import { Sprite } from "./sprite.class.js";

/**
 * Sprite layer.
 */
export class Layer extends StaticObject {
    constructor(ctx, layerData) {
        super(ctx, layerData);
        this.animations = [];
        this.animationFrame = 0;
    }

    /**
     * Creates the layer based on the tiled array. -> For static layers.
     * @param {String} layer Name of the layer.
     */
    createLayer(layer) {
        const dataArray = this.layerData[layer].data;
        const levelWidth = levelSize.width;
        let row = 0;

        for (let i = 0; i < dataArray.length; i++) {
            const col = i % levelWidth;
            const dataId = dataArray[i];

            if (dataId != 0) {
                this.createSprite(dataId, layer, col, row);
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
     */
    createSprite(dataId, layer, col, row) {
        const tileWidth = tileSize.width;
        const tileHeight = tileSize.height;
        const id = dataId + this.layerData[layer].spriteOffset;
        const sprite = new Sprite(`${this.layerData[layer].path}/${id}.png`)

        sprite.position.x = col * tileWidth;
        sprite.position.y = row * tileHeight;
        this.sprites.push(sprite)
    }

    /**
     * Creates the layer based on the animationData array. -> For animated layers.
     * @param {Object} animationData Object with animation information.
     */
    loadAnimations(animationData) {
        for (const animation in animationData) {
            this.animations[animation] = [];
            const animationStart = animationData[animation].start;
            const animationIndex = animationData[animation].numSprites + animationStart;

            for (let i = animationStart; i < animationIndex; i++) {
                const sprite = new Sprite(`${animationData[animation].path}/${i}.png`).image;
                this.animations[animation].push(sprite);
            }
        }
    }

    /**
     * Plays the sprite animation based on the sprite id.
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