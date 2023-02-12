import { collectableData } from './settings.js';
import { Layer } from "./layer.class.js";


/**
 * Class that represents a collectable i.e. a coin.
 */
export class Collectable extends Layer {
    constructor(ctx, layerData) {
        super(ctx, layerData);
        this.layerData = layerData;
        super.width = collectableData.width;
        super.height = collectableData.height;
        super.staggerFrames = collectableData.animationSpeed;
        this.layerName = 'collectable';

        this.createLayer(this.layerName, collectableData);
        this.loadAnimations(collectableData.animations);
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
        this.playAnimation();
    }
}
