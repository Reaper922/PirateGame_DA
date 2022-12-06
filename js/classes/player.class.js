import { GameObject } from "./game-object.class.js";
import { InputController } from "./input-controller.class.js";
import { playerData, window } from './settings.js';
import { Sprite } from "./sprite.class.js";

export class Player extends GameObject {
    constructor(ctx, position) {
        super();
        this.ctx = ctx;
        this.inputController = new InputController();
        this.position.x = position.x;
        this.position.y = position.y;
        this.width = playerData.width;
        this.height = playerData.height;
        this.speed = playerData.speed;
        this.jumpVelocity = playerData.jumpVelocity;
        this.animations = [];
        this.currentAnimation = 'idle_right';
        this.animationFrame = 0;
        this.staggerFrames = playerData.animationSpeed;
        this.isLastInputRight = true;
        this.canJump = false;
        this.isAttacking = false;
        this.attackCooldown = false;
        this.isStatic = false;

        this.loadAnimations();
    }

    loadAnimations() {
        const animationData = playerData.animations;

        for (const animation in animationData) {
            this.animations[animation] = [];

            for (let i = 0; i < animationData[animation].numSprites; i++) {
                this.animations[animation].push(new Sprite(`${animationData[animation].path}/${i}.png`).image);
            }
        }
    }

    setAnimation() {
        const direction = this.isLastInputRight ? 'right' : 'left';

        if (this.velocity.x == 0 && this.velocity.y == 0) {this.currentAnimation = `idle_${direction}`}
        if (this.velocity.x > 0 && this.velocity.y == 0) {this.currentAnimation = `run_right`}
        if (this.velocity.x < 0 && this.velocity.y == 0) {this.currentAnimation = `run_left`}
        if (this.velocity.y < 0) {this.currentAnimation = `jump_${direction}`}
        if (this.velocity.y > 0) {this.currentAnimation = `fall_${direction}`}
        if (this.isAttacking) {this.currentAnimation = `attack_${direction}`}
        if (this.isAttacking && this.animationFrame === 3) {this.isAttacking = false}
    }

    playAnimation(name) {
        const animationArr = this.animations[name];
        const currentFrame = globalThis.frameCounter;
        const spriteCorrectionX = playerData.spriteCorrection.x;
        const spriteCorrectionY = playerData.spriteCorrection.y;

        if ((currentFrame % this.staggerFrames) == 0) {this.animationFrame++}
        this.ctx.drawImage(animationArr[this.animationFrame % animationArr.length], this.position.x - spriteCorrectionX, this.position.y - spriteCorrectionY);
    }

    getInput() {
        const input = this.inputController.getPressedKeys();

        // Left and Right
        if (input.a) {this.velocity.x = -this.speed; this.isLastInputRight = false}
        if (input.d) {this.velocity.x = this.speed; this.isLastInputRight = true}
        if (input.a && input.d) {this.velocity.x = 0}
        if (!input.a && !input.d) {this.velocity.x = 0}
        
        // Jump
        if (input.w) {this.jump()}

        // Attack
        if (input.space) {this.attack()}
    }

    jump() { 
        if (this.canJump && this.velocity.y <= 0) {
            this.velocity.y = 0;
            this.velocity.y -= this.jumpVelocity;
            this.canJump = false;
        }
    }

    attack() {
        if (!this.isAttacking && !this.attackCooldown) {
            this.isAttacking = true;
            this.attackCooldown = true;
            this.animationFrame = 0;
            setTimeout(() => {this.attackCooldown = false}, 500);
        }
    }

    constraint() {
        const maxX = window.width - this.width;
        const maxY = window.height - this.height;

        if (this.position.x < 0) {this.position.x = 0}
        if (this.position.y < 0) {this.position.y = 0}
        if (this.position.x > maxX) {this.position.x = maxX}
        if (this.position.y > maxY) {this.position.y = maxY}
    }

    update(terrainSprites) {
        this.getInput();
        this.move();
        this.checkCollisions('horizontal', terrainSprites);
        super.addGravity();
        this.checkCollisions('vertical', terrainSprites);
        this.constraint();
    }

    render() {
        this.setAnimation();
        this.playAnimation(this.currentAnimation);
    }
}
