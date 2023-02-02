import { Sprite } from "./sprite.class.js";

/**
 * Root object of all game objects.
 */
export class StaticObject {
    constructor(ctx, layerData) {
        this.ctx = ctx;
        this.layerData = layerData;
        this.sprites = [];
        this.width = 0;
        this.height = 0;
        this.position = {
            x: 0,
            y: 0
        }
        this.animations = [];
        this.animationFrame = 0;
        this.staggerFrames = 5;
        this.currentAnimation = 'idle';
    }

    /**
     * Loads all character animations from the playerData object.
     */
    loadAnimations(animationData) {
        for (const animation in animationData) {
            this.animations[animation] = [];

            for (let i = 0; i < animationData[animation].numSprites; i++) {
                const spriteImage = new Sprite(`${animationData[animation].path}/${i}.png`).image;
                this.animations[animation].push(spriteImage);
            }
        }
    }

    /**
     * Increases the current animation frame based on the staggerFrames value.
     * Animations can be slowed down by increasing the staggerFrames value and vice versa.
     */
    increaseAnimationFrame() {
        const currentFrame = globalThis.frameCounter;

        if ((currentFrame % this.staggerFrames) == 0) { this.animationFrame++ }
    }

    /**
     * Renders the sprite of the currentAnimation based on the animationFrame.
     * @param {String} name Name of the animation.
     */
    renderAnimation(name, data, isEnemy =false) {
        const animationArr = this.animations[name];
        const spriteId = this.animationFrame % animationArr.length;
        let spriteCorrectionX = data.spriteCorrection.x;
        let spriteCorrectionY = data.spriteCorrection.y;

        if (this.currentAnimation != 'idle' && isEnemy) {
            spriteCorrectionX = 8;
            spriteCorrectionY = 2;
        }

        this.ctx.drawImage(animationArr[spriteId], this.position.x - spriteCorrectionX, this.position.y - spriteCorrectionY);
        this.increaseAnimationFrame();
    }

    /**
     * Renders the sprites of the game object.
     */
    render() {
        for (let i = 0; i < this.sprites.length; i++) {
            this.ctx.drawImage(this.sprites[i].image, this.sprites[i].position.x, this.sprites[i].position.y);
        }
    }

    /**
     * Debugging function that renders a red outline of the objects boundary.
     */
    drawRect() {
        this.ctx.beginPath();
        this.ctx.lineWidth = "2";
        this.ctx.strokeStyle = 'red';
        this.ctx.rect(this.position.x, this.position.y, this.width, this.height);
        this.ctx.stroke();
    }

    /**
     * Debugging function that renders a red ray.
     */
    drawRay(point) {
        this.ctx.beginPath();
        this.ctx.lineWidth = "5";
        this.ctx.strokeStyle = 'red';
        this.ctx.rect(point.x, point.y, 1, 1);
        this.ctx.stroke();
    }
}
