import { GameObject } from "./game-object.class.js";
import { InputController } from "./input-controller.class.js";
import { playerData, window } from './settings.js';
import { Sprite } from "./sprite.class.js";

export class Player extends GameObject {
    constructor(ctx, positionX = 0, positionY = 0) {
        super('/assets/sprites/player/idle_right/1.png');
        this.ctx = ctx;
        this.inputController = new InputController();
        this.position.x = positionX;
        this.position.y = positionY;
        this.width = playerData.width;
        this.height = playerData.height;
        this.speed = playerData.speed;
        this.jumpVelocity = playerData.jumpVelocity;
        this.animations = []
        this.currentAnimation = 'idle_right';
        this.animationFrame = 0;
        this.staggerFrames = 10;
        this.isLastInputRight = true;
        this.canJump = true;
        this.isStatic = false;

        this.loadAnimations();
        console.log(this.animations.idle_left)
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
    }

    playAnimation(name) {
        const animationArr = this.animations[name];
        const currentFrame = globalThis.frameCounter;
        const spriteCorrecionX = 28;
        const spriteCorrecionY = 7

        if ((currentFrame % this.staggerFrames) == 0) {this.animationFrame++}
        this.ctx.drawImage(animationArr[this.animationFrame % animationArr.length], this.position.x - spriteCorrecionX, this.position.y - spriteCorrecionY)
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
    }

    jump() {
        if (this.canJump) {
            this.velocity.y = 0;
            this.velocity.y -= this.jumpVelocity;
            this.canJump = false;
        };
    }

    constraint() {
        const maxX = window.width - this.width;
        const maxY = window.height - this.height;

        if (this.position.x < 0) {this.position.x = 0}
        if (this.position.y < 0) {this.position.y = 0}
        if (this.position.x > maxX) {this.position.x = maxX}
        if (this.position.y > maxY) {this.position.y = maxY; this.canJump = true;} // canJump entfernen
    }

    update(terrain) {
        this.getInput();
        this.move();
        this.checkCollisions('horizontal', terrain);
        super.addGravity();
        this.checkCollisions('vertical', terrain)
        this.constraint();
    }

    render() {
        this.setAnimation();
        this.playAnimation(this.currentAnimation);

        // Debug
        // this.drawRect();
    }
}
