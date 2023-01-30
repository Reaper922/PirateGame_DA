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

        this.velocity.x = 1;

        this.leftRayPos = {
            x: this.position.x - 5,
            y: this.position.y + 45
        }
        this.rightRayPos = {
            x: this.position.x + this.width + 1,
            y: this.position.y + 45
        }

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


    rayCheck(spritesArray) {
        let isLeftRayColliding = false;
        let isRightRayColliding = false;
        
        for (let i = 0; i < spritesArray.length; i++) {
            const sprite = spritesArray[i];
            const leftRayCollision = {
                top: this.leftRayPos.y < sprite.position.y + sprite.image.height,
                bottom: this.leftRayPos.y > sprite.position.y,
                left: this.leftRayPos.x <= sprite.position.x + sprite.image.width,
                right: this.leftRayPos.x > sprite.position.x
            }
            const rightRayCollision = {
                top: this.rightRayPos.y < sprite.position.y + sprite.image.height,
                bottom: this.rightRayPos.y > sprite.position.y,
                left: this.rightRayPos.x <= sprite.position.x + sprite.image.width,
                right: this.rightRayPos.x > sprite.position.x
            }


            if (leftRayCollision.top && leftRayCollision.bottom && leftRayCollision.left && leftRayCollision.right) {
                isLeftRayColliding = true;
            }
            if (rightRayCollision.top && rightRayCollision.bottom && rightRayCollision.left && rightRayCollision.right) {
                isRightRayColliding = true;
            }
        }

        if (isLeftRayColliding && isRightRayColliding) {
            return;
        }

        if (isLeftRayColliding) {
            this.velocity.x = -1
            return;
        }

        if (isRightRayColliding) {
            this.velocity.x = 1
            return;
        }
    }

    updateRayPos() {
        this.leftRayPos = {
            x: this.position.x - 5,
            y: this.position.y + 45
        }
        this.rightRayPos = {
            x: this.position.x + this.width + 1,
            y: this.position.y + 45
        }
    }

    /**
     * Updates the character.
     * @param {Object} collisionGroup Object of the sprites the player can collide with.
     */
    update(collisionGroup, playerAttackRect) {
        if (globalThis.frameCounter > 20) {
            this.move();
            this.updateRayPos();
            this.checkCollision(collisionGroup.terrainSprites, 'horizontal');
            super.addGravity();
            this.checkCollision(collisionGroup.terrainSprites, 'vertical');
            this.rayCheck(collisionGroup.terrainSprites);
            // this.checkPlayerAttackCollision(playerAttackRect);
            this.setAnimation();
        }
    }

    /**
     * Renders the character sprite.
     */
    render() {
        this.renderAnimation(this.currentAnimation);



        // this.drawRay(this.leftRayPos);
        // this.drawRay(this.rightRayPos);
        // this.drawRect();
    }
}