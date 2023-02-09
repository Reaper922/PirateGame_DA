import { GameAudio } from "./audio.class.js";
import { DynamicObject } from "./dynamic-object.class.js";
import { InputController } from "./input-controller.class.js";
import { playerData, window } from './settings.js';
import { Sprite } from "./sprite.class.js";


/**
 * Class that represents the player.
 */
export class Player extends DynamicObject {
    constructor(ctx, layerData, initialPosition = { x: 0, y: 0 }) {
        super(ctx, layerData);
        super.width = playerData.width;
        super.height = playerData.height;
        super.position = {
            x: initialPosition.x,
            y: initialPosition.y
        }
        super.staggerFrames = playerData.animationSpeed;
        this.ctx = ctx;
        this.inputController = new InputController();
        this.initialPosition = initialPosition;
        this.health = playerData.health;
        this.coins = 0;
        this.speed = playerData.speed;
        this.jumpVelocity = playerData.jumpVelocity;
        this.canJump = false;
        this.isLastInputRight = true;
        this.isAttacking = false;
        this.attackCooldown = false;
        this.isCollidingWithWater = false;
        super.currentAnimation = 'idle_right';
        this.hurtCooldown = false;

        this.instantiateAudio();
        this.loadAnimations(playerData.animations);
    }

    /**
     * Creates new class instances for the game audio.
     */
    instantiateAudio() {
        this.attackAudio = new GameAudio('./assets/sounds/attack.wav', 0.2, true);
        this.jumpAudio = new GameAudio('./assets/sounds/jump.mp3', 0.4, true);
        this.hitAudio = new GameAudio('./assets/sounds/hit.mp3', 0.4, true)
        this.coinAudio = new GameAudio('./assets/sounds/coin.wav', 0.4, true);
        this.waterAudio = new GameAudio('./assets/sounds/water_splash.mp3', 0.4);
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
        if (this.hurtCooldown) { this.currentAnimation = `hit_${direction}` }
        this.resetAttackState();
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
            this.jumpAudio.play();
            this.velocity.y = 0;
            this.velocity.y -= this.jumpVelocity;
            this.canJump = false;
        }
    }

    /**
     * Lets the character attack.
     */
    attack() {
        if (!this.isAttacking && !this.attackCooldown && !this.hurtCooldown) {
            this.attackAudio.play();
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


    getAttackRect() {
        let adjustHorizontal = 40

        if (!this.isLastInputRight) { adjustHorizontal = -30 }
        if (this.isAttacking) {
            return {
                position: {
                    x: this.position.x + adjustHorizontal,
                    y: this.position.y + 20
                },
                size: {
                    width: 30,
                    height: 20
                }
            }
        }
        return {
            position: {
                x: 0,
                y: 0
            },
            size: {
                width: 0,
                height: 0
            }
        }
    }

    getCollisionRect() {
        return {
            position: this.position,
            width: this.width,
            height: this.height
        }
    }

    getHurt() {
        if (!this.hurtCooldown) {
            this.health -= 1;
            this.hurtCooldown = true;
            this.hitAudio.play();
            setTimeout(() => { this.hurtCooldown = false }, 500)
        }
    }

    /**
     * Checks if the player is alive.
     * @returns Returns a boolean if the player is alive.
     */
    isAlive() {
        if (this.health > 0) { return true }
        return false;
    }

    allCoinsCollected() {
        if (this.coins === 5) { return true }
        return false;
    }

    /**
     * Handles the collision with water and resets the player to the starting position.
     */
    waterCollision() {
        if (!this.isCollidingWithWater) {
            this.isCollidingWithWater = true
            this.waterAudio.play();
            setTimeout(() => {
                this.health -= 1;
                this.velocity.y = 0;
                this.position.x = this.initialPosition.x;
                this.position.y = this.initialPosition.y;
                this.isCollidingWithWater = false;
            }, 150)
        }
    }

    /**
     * Handles the collision with collectables. Increases the coin count and removes the collectable from the layer.
     * @param {Sprite} sprite Sprite object.
     * @param {Array} spritesArray Array of sprites.
     */
    collectableCollision(sprite, spritesArray) {
        this.coinAudio.play();
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
        this.constraint();
        this.setAnimation();
    }

    /**
     * Renders the character sprite.
     */
    render() {
        this.renderAnimation(this.currentAnimation, playerData);
    }
}
