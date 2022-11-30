import { GameObject } from "./game-object.class.js";
import { InputController } from "./input-controller.class.js";
import { playerData, window } from './settings.js';

export class Player extends GameObject {
    constructor(ctx, frameCounter, positionX, positionY) {
        super(frameCounter, '/assets/sprites/player/idle_right/1.png');
        this.ctx = ctx;
        this.inputController = new InputController();
        this.position.x = positionX;
        this.position.y = positionY;
        this.width = 44;
        this.height = 56;
        this.isStatic = false;
        this.speed = playerData.speed;
        this.jumpVelocity = playerData.jumpVelocity;
        this.canJump = true;
    }

    getInput() {
        const input = this.inputController.getPressedKeys();

        // Left and Right
        if (input.a) {this.velocity.x = -this.speed}
        if (input.d) {this.velocity.x = this.speed}
        if (input.a && input.d) {this.velocity.x = 0}
        if (!input.a && !input.d) {this.velocity.x = 0}
        
        // Jump
        if (input.w && this.canJump) {this.jump()}
    }

    move() {
        this.position.x += this.velocity.x;
    }

    jump() {
        this.velocity.y = 0;

        if (this.canJump) {
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
        if (this.position.y > maxY) {this.position.y = maxY; this.canJump = true;}
    }

    checkHorizontalCollisions(arr) {
        for (let i = 0; i < arr.length; i++) {
            const tile = arr[i];
            const top = this.position.y < tile.position.y + tile.height;
            const bottom = this.position.y + this.height > tile.position.y;
            const left = this.position.x < tile.position.x + tile.width;
            const right = this.position.x + this.width > tile.position.x;

            if (top && bottom && left && right) {
                if (this.velocity.x > 0) {
                    this.position.x = tile.position.x - this.width; // Right
                }
                if (this.velocity.x < 0) {
                    this.position.x = tile.position.x + tile.width; // Left
                }
            }
        }
    }

    checkVerticalCollisions(arr) {
        for (let i = 0; i < arr.length; i++) {
            const tile = arr[i];
            const top = this.position.y < tile.position.y + tile.height;
            const bottom = this.position.y + this.height > tile.position.y;
            const left = this.position.x < tile.position.x + tile.width;
            const right = this.position.x + this.width > tile.position.x;

            if (top && bottom && left && right) {
                if (this.velocity.y > 0) {
                    this.position.y = tile.position.y - this.height; // Top
                    this.canJump = true;
                }
                if (this.velocity.y < 0) {
                    this.position.y = tile.position.y + tile.height; // Bottom
                    this.velocity.y = 0;
                }
            }
        }
    }

    update(terrain) {
        this.getInput();
        this.move();
        this.checkHorizontalCollisions(terrain);
        super.addGravity();
        this.checkVerticalCollisions(terrain)
        this.constraint();
    }

    render() {
        const spriteCorrecionX = 28;
        const spriteCorrecionY = 7

        this.ctx.drawImage(this.sprite, this.position.x - spriteCorrecionX, this.position.y - spriteCorrecionY)

        // Debug
        this.drawRect();
    }
}
