import { StaticObject } from "./static-object.class.js";
import { levelSize, tileSize } from "./settings.js";
import { Sprite } from "./sprite.class.js";

export class Layer extends StaticObject {
    constructor(ctx, layerData) {
        super(ctx, layerData);
        this.animations = [];
        this.animationFrame = 0;
    }

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

    createSprite(dataId, layer, col, row) {
        const tileWidth = tileSize.width;
        const tileHeight = tileSize.height;
        const id = dataId + this.layerData[layer].spriteOffset;
        const sprite = new Sprite(`${this.layerData[layer].path}/${id}.png`)

        sprite.position.x = col * tileWidth;
        sprite.position.y = row * tileHeight;
        this.sprites.push(sprite)
    }

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

    playAnimation(layer, animationObject) {
        const dataArray = this.layerData[layer].data;
        const levelWidth = levelSize.width;
        const currentFrame = globalThis.frameCounter;
        let row = 0;

        if ((currentFrame % this.staggerFrames) == 0) { this.animationFrame++ }

        for (let i = 0; i < dataArray.length; i++) {
            const col = i % levelWidth;
            const dataId = dataArray[i];

            if (dataId != 0) {
                animationObject.selectAnimation(dataId, col, row);
            }

            if (col === (levelWidth - 1)) { row += 1 }
        }
    }

    animation(animation, col, row, animationData, animationObject) {
        const spriteArr = this.animations[animation];
        const tileWidth = tileSize.width;
        const tileHeight = tileSize.height;
        const numSprites = animationData.animations[animation].numSprites;
        const spriteOffset = animationObject.setSpriteOffset(animation);

        this.ctx.drawImage(spriteArr[this.animationFrame % numSprites], (col * tileWidth) + spriteOffset.x, ((row * tileHeight)) + spriteOffset.y);
    }
}