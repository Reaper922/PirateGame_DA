import { GameObject } from "./game-object.class.js";
import { Sprite } from "./sprite.class.js";
import { treeFgData } from './settings.js';

export class TreesFG extends GameObject {
    constructor(ctx, levelData) {
        super(ctx, levelData);
        this.animations = [];
        this.animationFrame = 0;
        this.staggerFrames = treeFgData.animationSpeed;

        this.loadAnimations();
    }

    loadAnimations() {
        const animationData = treeFgData.animations;

        for (const animation in animationData) {
            this.animations[animation] = [];
            const animationStart = animationData[animation].start;
            const animationIndex = animationData[animation].numSprites + animationStart;

            for (let i = animationStart; i < animationIndex; i++) {
                this.animations[animation].push(new Sprite(`${animationData[animation].path}/${i}.png`).image);
            }
        }
    }

    playAnimation(layer) {
        const dataArray = this.layerData[layer].data;
        const levelWidth = this.levelData.width;
        const levelHeigth = this.levelData.height;
        const currentFrame = globalThis.frameCounter;
        let row = 0;

        if ((currentFrame % this.staggerFrames) == 0) {this.animationFrame++}

        for (let i = 0; i < dataArray.length; i++) {
            let col = i % levelWidth;

            if (dataArray[i] != 0) {
                switch (dataArray[i]) {
                    case 8:
                        this.animation('palmBig', col, row);
                        break;
                    case 12:
                        this.animation('palmSmall', col, row);
                        break;
                    case 16:
                        this.animation('palmLeft', col, row);
                        break;
                }
            }

            if (col === (levelWidth - 1)) {row += 1}
        }
    }

    animation(animation, col, row) {
        const animationArr = this.animations[animation];
        const tileWidth = this.levelData.tilewidth;
        const tileHeight = this.levelData.tileheight;
        let spriteOffsetX = 0;
        let spriteOffsetY = 0;

        if (animation === 'palmSmall') {spriteOffsetY = 30}
        if (animation === 'palmLeft') {spriteOffsetY = 20}

        this.ctx.drawImage(animationArr[this.animationFrame % treeFgData.animations[animation].numSprites], (col * tileWidth) + spriteOffsetX, ((row * tileHeight) - tileHeight) + spriteOffsetY);
    }

    render() {
        this.playAnimation('foreground');
    }
} 