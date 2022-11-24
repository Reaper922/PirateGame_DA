import { GameObject } from "./game-object.class.js";
import { InputController } from "./input-controller.class.js";
import { playerSpeed, window } from './settings.js';

export class Player extends GameObject {
    constructor(ctx, path) {
        super(path);
        this.ctx = ctx;
        this.inputController = new InputController();
        this.speed = playerSpeed;
    }

    getInput() {
        const input = this.inputController.getPressedKeys();

        if (input.a) {this.velocity.x = -this.speed}
        if (input.d) {this.velocity.x = this.speed}
        if (input.w) {this.velocity.y = -this.speed}
        if (input.s) {this.velocity.y = this.speed}

        if (input.a && input.d) {this.velocity.x = 0}
        if (input.w && input.s) {this.velocity.y = 0}

        if (!input.a && !input.d) {this.velocity.x = 0}
        if (!input.w && !input.s) {this.velocity.y = 0}
    }

    move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    constraint() {
        const maxX = window.width - this.sprite.width;
        const maxY = window.height - this.sprite.height;

        if (this.position.x < 0) {this.position.x = 0}
        if (this.position.y < 0) {this.position.y = 0}
        if (this.position.x > maxX) {this.position.x = maxX}
        if (this.position.y > maxY) {this.position.y = maxY}
    }


    update() {
        this.getInput();
        this.move();
        this.constraint();
    }

    render() {
        this.ctx.drawImage(this.sprite, this.position.x, this.position.y)
    }
}
