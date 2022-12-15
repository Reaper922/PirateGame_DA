import { gravity } from "./settings.js";
import { StaticObject } from "./static-object.class.js";

/**
 * Extends the root class with movement, gravity and collision methods.
 */
export class DynamicObject extends StaticObject {
    constructor(ctx, layerData, position) {
        super(ctx, layerData, position);
        this.isStatic = false;
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    /**
     * Moves the object on the x-axis based on the x-velocity.
     */
    move() {
        this.position.x += this.velocity.x;
    }

    /**
     * Moves the object downwards on the y-axis based on the gravity value.
     */
    addGravity() {
        if (this.velocity.y < 10 && !this.isStatic) {
            this.velocity.y += gravity;
        }
        this.position.y += Number(this.velocity.y.toFixed(1));
    }

    /**
     * Checks if the current object is colliding with a sprite from the array.
     * @param {Array} spritesArray Array of Sprites.
     * @param {String} type Type of collision.
     * @param {Object} collisionObject Object that checks the collision.
     */
    checkCollision(spritesArray, type, collisionObject = null) {
        for (let i = 0; i < spritesArray.length; i++) {
            const sprite = spritesArray[i];
            const collision = {
                top: this.position.y < sprite.position.y + sprite.image.height,
                bottom: this.position.y + this.height > sprite.position.y,
                left: this.position.x < sprite.position.x + sprite.image.width,
                right: this.position.x + this.width > sprite.position.x
            }

            if (collision.top && collision.bottom && collision.left && collision.right) {
                this.handleCollisionType(sprite, type, collisionObject, spritesArray);
            }
        }
    }

    /**
     * Decides how the collision is handled based on its type.
     * @param {Sprite} sprite Sprite object.
     * @param {String} type Type of collision.
     * @param {Object} collisionObject Object that checks the collision.
     */
    handleCollisionType(sprite, type, collisionObject, spritesArray) {
        switch (type) {
            case 'horizontal':
                this.handleHorizontalCollision(sprite);
                break;
            case 'vertical':
                this.handleVerticalCollision(sprite);
                break;
            case 'water':
                this.handleWaterCollision(collisionObject);
                break;
            case 'collectables':
                this.handleCollectableCollision(collisionObject, sprite, spritesArray);
                break;
        }
    }

    /**
     * Handles the collisions in horizontal direction.
     * @param {Sprite} sprite Sprite object
     */
    handleHorizontalCollision(sprite) {
        // Right Collision
        if (this.velocity.x > 0) {
            this.position.x = sprite.position.x - this.width;
        }

        // Left Collision
        if (this.velocity.x < 0) {
            this.position.x = sprite.position.x + sprite.image.width;
        }
    }

    /**
     * Handles the collisions in vertical direction.
     * @param {Sprite} sprite Sprite object
     */
    handleVerticalCollision(sprite) {
        // Bottom Collision
        if (this.velocity.y > 0) {
            this.position.y = sprite.position.y - this.height;
            this.canJump = true;
            this.velocity.y = 0;
        }

        // Top Collision
        if (this.velocity.y < 0) {
            this.position.y = sprite.position.y + sprite.image.height;
            this.velocity.y = 0;
        }
    }

    /**
     * Handles the collision with water.
     * @param {Object} collisionObject Object that checks the collision.
     */
    handleWaterCollision(collisionObject) {
        collisionObject.waterCollision();
    }

    /**
     * Handles the collision with collectables.
     * @param {Object} collisionObject Object that checks the collision.
     * @param {Sprite} sprite Sprite object.
     */
    handleCollectableCollision(collisionObject, sprite, spritesArray) {
        collisionObject.collectableCollision(sprite, spritesArray);
    }

    /**
     * Updates the game object.
     */
    update() {
        this.addGravity();
    }
}