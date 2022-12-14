import { collectableData, levelSize, tileSize } from './settings.js';
import { Layer } from "./layer.class.js";
import { Sprite } from './sprite.class.js';

/**
 * Class that represents a collectable i.e. a coin.
 */
export class Collectable extends Layer {
    constructor(ctx, data) {
        super(ctx);
        this.data = data;
        super.width = collectableData.width;
        super.height = collectableData.height;
        super.staggerFrames = collectableData.animationSpeed;

        this.createLayer(data);
        this.loadAnimations(collectableData.animations);
    }

    /**
     * Creates the layer based on the dataArray.
     * @param {Array} dataArray Array of data ids.
     */
    createLayer(dataArray) {
        const levelWidth = levelSize.width;
        let row = 0;

        for (let i = 0; i < dataArray.length; i++) {
            const col = i % levelWidth;
            const dataId = dataArray[i];

            if (dataId != 0) {
                this.createSprite(dataId, col, row);
            }

            if (col === (levelWidth - 1)) { row += 1 }
        }
    }

    /**
     * Creates a sprite and adds it to the sprite array.
     * @param {Number} dataId Id of the sprite.
     * @param {Number} col Colum of the sprite.
     * @param {Number} row Row of the sprite.
     */
    createSprite(dataId, col, row) {
        const tileWidth = tileSize.width;
        const tileHeight = tileSize.height;
        const id = dataId + collectableData.spriteOffset;
        const sprite = new Sprite(`./assets/sprites/items/gold/${id}.png`)

        sprite.position.x = col * tileWidth;
        sprite.position.y = (row * tileHeight) + collectableData.spriteCorrection.y;
        this.sprites.push(sprite)
    }

    /**
     * Creates the layer based on the animationData array.
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
     */
    playAnimation() {
        const currentFrame = globalThis.frameCounter;

        if ((currentFrame % this.staggerFrames) == 0) { this.animationFrame++ }

        this.sprites.forEach((sprite) => {
            this.renderSprites('gold', sprite)
        })
    }

    /**
     * Renders the sprite animation based on the animation name.
     * @param {String} animation Name of the animation.
     * @param {Sprite} sprite Sprite object.
     */
    renderSprites(animation, sprite) {
        const spriteArr = this.animations[animation];
        const numSprites = collectableData.animations[animation].numSprites;

        this.ctx.drawImage(spriteArr[this.animationFrame % numSprites], sprite.position.x, sprite.position.y);
    }

    /**
     * Renders the collectables.
     */
    render() {
        this.playAnimation(this.data);
    }
}