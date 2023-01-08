import { DynamicObject } from "./dynamic-object.class.js";
import { enemyData } from "./settings.js";
import { Sprite } from "./sprite.class.js";

/**
 * Class that represents an enemy.
 */
export class Enemy extends DynamicObject {
    constructor(ctx, layerData, position = { x: 0, y: 0 }) {
        super(ctx, layerData);
        super.position = {
            x: position.x,
            y: position.y
        }
        super.width = enemyData.width;
        super.height = enemyData.height;
        this.speed = enemyData.speed;
        this.health = enemyData.health;
        this.animations = [];
        this.currentAnimation = 'idle';
        this.animationFrame = 0;
        this.staggerFrames = enemyData.animationSpeed;

        this.velocity.x = 0;

        this.loadAnimations();
    }

    /**
     * Loads all character animations from the enemyData object.
     */
    loadAnimations() {
        const animationData = enemyData.animations;

        for (const animation in animationData) {
            this.animations[animation] = [];

            for (let i = 0; i < animationData[animation].numSprites; i++) {
                const spriteImage = new Sprite(`${animationData[animation].path}/${i}.png`).image;
                this.animations[animation].push(spriteImage);
            }
        }
    }

    /**
     * Sets the animation based on the velocity and isAttacking state.
     */
    setAnimation() {
        if (this.velocity.x == 0 && this.velocity.y == 0) { this.currentAnimation = `idle` }
        if (this.velocity.x > 0 && this.velocity.y == 0) { this.currentAnimation = `run_right` }
        if (this.velocity.x < 0 && this.velocity.y == 0) { this.currentAnimation = `run_left` }
    }

    /**
     * Renders the sprite of the currentAnimation based on the animationFrame.
     * @param {String} name Name of the animation.
     */
    renderAnimation(name) {
        const animationArr = this.animations[name];
        const spriteId = this.animationFrame % animationArr.length;
        let spriteCorrectionX = enemyData.spriteCorrection.x;
        let spriteCorrectionY = enemyData.spriteCorrection.y;

        if (this.currentAnimation != 'idle') {
            spriteCorrectionX = 8;
            spriteCorrectionY = 2;
        }

        this.ctx.drawImage(animationArr[spriteId], this.position.x - spriteCorrectionX, this.position.y - spriteCorrectionY);
        this.increaseAnimationFrame();
    }

    /**
     * Increases the current animation frame based on the staggerFrames value.
     * Animations can be slowed down by increasing the staggerFrames value and vice versa.
     */
    increaseAnimationFrame() {
        const currentFrame = globalThis.frameCounter;

        if ((currentFrame % this.staggerFrames) == 0) { this.animationFrame++ }
    }

    checkPlayerAttackCollision(enemiesArr, playerAttackRect) {
        const collision = {
            top: this.position.y < playerAttackRect.position.y + playerAttackRect.size.height,
            bottom: this.position.y + this.height > playerAttackRect.position.y,
            left: this.position.x < playerAttackRect.position.x + playerAttackRect.size.width,
            right: this.position.x + this.width > playerAttackRect.position.x
        }

        if (collision.top && collision.bottom && collision.left && collision.right) {
            if (enemiesArr == this) {
                console.log('enemie dead')
            }
        }
    }

    /**
     * Updates the character.
     * @param {Object} collisionGroup Object of the sprites the player can collide with.
     */
    update(collisionGroup, playerAttackRect) {
        this.move();
        this.checkCollision(collisionGroup.terrainSprites, 'horizontal');
        super.addGravity();
        this.checkCollision(collisionGroup.terrainSprites, 'vertical');
        // this.checkPlayerAttackCollision(playerAttackRect);
        this.setAnimation();
    }

    /**
     * Renders the character sprite.
     */
    render() {
        this.renderAnimation(this.currentAnimation);
        // this.drawRect();
    }
}