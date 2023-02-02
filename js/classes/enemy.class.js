import { DynamicObject } from "./dynamic-object.class.js";
import { enemyData } from "./settings.js";


/**
 * Class that represents an enemy.
 */
export class Enemy extends DynamicObject {
    constructor(ctx, layerData, position = { x: 0, y: 0 }) {
        super(ctx, layerData);
        super.width = enemyData.width;
        super.height = enemyData.height;
        super.position = {
            x: position.x,
            y: position.y
        }
        super.staggerFrames = enemyData.animationSpeed;
        this.health = enemyData.health;
        this.speed = enemyData.speed;
        this.isDirectionRight = Math.random() < 0.5;
        this.velocity.x = this.isDirectionRight ? 1 : -1;
        this.leftRayPos = {
            x: this.position.x - 5,
            y: this.position.y + 45
        }
        this.rightRayPos = {
            x: this.position.x + this.width + 1,
            y: this.position.y + 45
        }

        this.loadAnimations(enemyData.animations);
    }

    /**
     * Sets the animation based on the velocity and isAttacking state.
     */
    setAnimation() {
        if (this.velocity.x == 0 && this.velocity.y == 0) { this.currentAnimation = `idle` }
        if (this.velocity.x > 0 && this.velocity.y == 0) { this.currentAnimation = `run_right` }
        if (this.velocity.x < 0 && this.velocity.y == 0) { this.currentAnimation = `run_left` }
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
        this.move();
        this.updateRayPos();
        this.checkCollision(collisionGroup.terrainSprites, 'horizontal');
        super.addGravity();
        this.checkCollision(collisionGroup.terrainSprites, 'vertical');
        this.rayCheck(collisionGroup.terrainSprites);
        // this.checkPlayerAttackCollision(playerAttackRect);
        this.setAnimation();
    }

    /**
     * Renders the character sprite.
     */
    render() {
        this.renderAnimation(this.currentAnimation, enemyData, true);



        // this.drawRay(this.leftRayPos);
        // this.drawRay(this.rightRayPos);
        // this.drawRect();
    }
}