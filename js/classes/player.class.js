import { DynamicObject } from "./dynamic-object.class.js";
import { InputController } from "./input-controller.class.js";
import { playerData, window } from './settings.js';
import { Sprite } from "./sprite.class.js";

/**
 * Class that represents the player.
 */
export class Player extends DynamicObject {
    constructor(ctx, layerData, position = { x: 0, y: 0 }) {
        super(ctx, layerData);
        this.ctx = ctx;
        this.inputController = new InputController();
        this.startPosition = position;
        super.position = {
            x: position.x,
            y: position.y
        }
        super.width = playerData.width;
        super.height = playerData.height;
        this.speed = playerData.speed;
        this.health = playerData.health;
        this.jumpVelocity = playerData.jumpVelocity;
        this.canJump = false;
        this.animations = [];
        this.currentAnimation = 'idle_right';
        this.animationFrame = 0;
        this.staggerFrames = playerData.animationSpeed;
        this.isLastInputRight = true;
        this.isAttacking = false;
        this.attackCooldown = false;
        this.coins = 0;

        this.loadAnimations();
    }

    /**
     * Loads all character animations from the playerData object.
     */
    loadAnimations() {
        const animationData = playerData.animations;

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
        const direction = this.isLastInputRight ? 'right' : 'left';

        if (this.velocity.x == 0 && this.velocity.y == 0) { this.currentAnimation = `idle_${direction}` }
        if (this.velocity.x > 0 && this.velocity.y == 0) { this.currentAnimation = `run_right` }
        if (this.velocity.x < 0 && this.velocity.y == 0) { this.currentAnimation = `run_left` }
        if (this.velocity.y < 0) { this.currentAnimation = `jump_${direction}` }
        if (this.velocity.y > 0) { this.currentAnimation = `fall_${direction}` }
        if (this.isAttacking) { this.currentAnimation = `attack_${direction}` }
        this.resetAttackState();
    }

    /**
     * Renders the sprite of the currentAnimation based on the animationFrame.
     * @param {String} name Name of the animation.
     */
    renderAnimation(name) {
        const animationArr = this.animations[name];
        const spriteId = this.animationFrame % animationArr.length;
        const spriteCorrectionX = playerData.spriteCorrection.x;
        const spriteCorrectionY = playerData.spriteCorrection.y;

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

    /**
     * Gets player input and sets velocity for movement or triggers an action such as jump or attack.
     */
    getInput() {
        const input = this.inputController.getPressedKeys();

        // Left and Right
        if (input.a) { this.velocity.x = -this.speed; this.isLastInputRight = false }
        if (input.d) { this.velocity.x = this.speed; this.isLastInputRight = true }
        if (input.a && input.d) { this.velocity.x = 0 }
        if (!input.a && !input.d) { this.velocity.x = 0 }

        // Jump
        if (input.w) { this.jump() }

        // Attack
        if (input.space) { this.attack() }
    }

    /**
     * Makes the character jump.
     */
    jump() {
        if (this.canJump && this.velocity.y <= 0) {
            this.velocity.y = 0;
            this.velocity.y -= this.jumpVelocity;
            this.canJump = false;
        }
    }

    /**
     * Lets the character attack.
     */
    attack() {
        if (!this.isAttacking && !this.attackCooldown) {
            this.isAttacking = true;
            this.attackCooldown = true;
            this.animationFrame = 0;
            setTimeout(() => { this.attackCooldown = false }, playerData.attackCooldown);
        }
    }

    /**
     * Resets the attack state after the last frame is rendered.
     */
    resetAttackState() {
        if (this.isAttacking && this.animationFrame === 3) { this.isAttacking = false }
    }

    /**
     * Checks if the player is alive.
     * @returns Returns a boolean if the player is alive.
     */
    isAlive() {
        if (this.health > 0) { return true }
        return false;
    }

    /**
     * Handles the collision with water and resets the player to the starting position.
     */
    waterCollision() {
        this.position.x = this.startPosition.x;
        this.position.y = this.startPosition.y;
        this.health -= 1;
    }

    /**
     * Handles the collision with collectables. Increases the coin count and removes the collectable from the layer.
     * @param {Sprite} sprite Sprite object.
     * @param {Array} spritesArray Array of sprites.
     */
    collectableCollision(sprite, spritesArray) {
        const index = spritesArray.indexOf(sprite);
        spritesArray.splice(index, 1)
        this.coins += 1;
    }

    /**
     * Constrains the player to the canvas and prevents the player from getting out of bounds.
     */
    constraint() {
        const maxX = window.width - this.width;
        const maxY = window.height - this.height;

        if (this.position.x < 0) { this.position.x = 0 }
        if (this.position.y < 0) { this.position.y = 0 }
        if (this.position.x > maxX) { this.position.x = maxX }
        if (this.position.y > maxY) { this.position.y = maxY }
    }

    /**
     * Updates the character.
     * @param {Object} collisionGroup Object of the sprites the player can collide with.
     */
    update(collisionGroup) {
        this.getInput();
        this.move();
        this.checkCollision(collisionGroup.terrainSprites, 'horizontal');
        super.addGravity();
        this.checkCollision(collisionGroup.terrainSprites, 'vertical');
        this.checkCollision(collisionGroup.collectableSprites, 'collectables', this);
        this.checkCollision(collisionGroup.waterSprites, 'water', this);
        if (!this.isAlive()) { } // -----------!!!------------
        this.constraint();
        this.setAnimation();
    }

    /**
     * Renders the character sprite.
     */
    render() {
        this.renderAnimation(this.currentAnimation);
    }
}
