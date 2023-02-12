import { GameAudio } from "./audio.class.js";
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
        this.enemyHitAudio = new GameAudio("./assets/sounds/enemy_hit.wav");

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

    /**
     * Updates the position of the left and right ray.
     */
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
     * Checks if the left and right rays are colliding and sets the move direction of the enemy.
     * @param {Array} spritesArray Array of terrain sprites.
     */
    checkRays(spritesArray) {
        let isLeftRayColliding = false;
        let isRightRayColliding = false;

        for (let i = 0; i < spritesArray.length; i++) {
            const sprite = spritesArray[i];

            if (this.checkRayCollision(sprite, this.leftRayPos)) { isLeftRayColliding = true }
            if (this.checkRayCollision(sprite, this.rightRayPos)) { isRightRayColliding = true }
        }

        this.raySetVelocity(isLeftRayColliding, isRightRayColliding);
    }

    /**
     * Checks if the given ray object is colliding with the sprite.
     * @param {Sprite} sprite Sprite of the terrain array.
     * @param {Object} ray Object with the ray position.
     * @returns Boolean wether the sprite is colliding with the ray.
     */
    checkRayCollision(sprite, ray) {
        const rayCollision = {
            top: ray.y < sprite.position.y + sprite.image.height,
            bottom: ray.y > sprite.position.y,
            left: ray.x <= sprite.position.x + sprite.image.width,
            right: ray.x > sprite.position.x
        }

        if (rayCollision.top && rayCollision.bottom && rayCollision.left && rayCollision.right) {
            return true;
        }
        return false;
    }

    /**
     * Sets the velocity of the enemy. Enemy changes direction when he gets too close to the edge.
     * @param {Boolean} isLeftRayColliding Boolean if the left ray is colliding.
     * @param {*} isRightRayColliding Boolean if the right ray is colliding.
     * @returns void
     */
    raySetVelocity(isLeftRayColliding, isRightRayColliding) {
        if (isLeftRayColliding && isRightRayColliding) { return }

        if (isLeftRayColliding) {
            this.velocity.x = -1;
            return;
        }

        if (isRightRayColliding) {
            this.velocity.x = 1;
            return;
        }
    }

    /**
     * Returns the current collision rectangle.
     * @returns Object with position, width and height of the current enemy position.
     */
    getCollisionRect() {
        return {
            position: this.position,
            width: this.width,
            height: this.height
        }
    }

    /**
     * Updates the character.
     * @param {Object} collisionGroup Object of the sprites the player can collide with.
     */
    update(collisionGroup) {
        this.move();
        this.checkCollision(collisionGroup.terrainSprites, 'horizontal');
        super.addGravity();
        this.checkCollision(collisionGroup.terrainSprites, 'vertical');
        this.updateRayPos();
        this.checkRays(collisionGroup.terrainSprites);
        this.setAnimation();
    }

    /**
     * Renders the character sprite.
     */
    render() {
        this.renderAnimation(this.currentAnimation, enemyData, true);
    }
}
