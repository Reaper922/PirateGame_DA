import { gravity } from "./settings.js";
import { Sprite } from "./sprite.class.js";

export class GameObject {
    constructor(path) {
        this.sprite = new Sprite(path).image;
        this.width = 0;
        this.height = 0;
        this.isStatic = true;
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 0,
            y: 0
        }
    }

    move() {
        this.position.x += this.velocity.x;
    }

    addGravity() {
        if (this.velocity.y < 10 && !this.isStatic) {
            this.velocity.y += gravity;
        }
        this.position.y += Number(this.velocity.y.toFixed(1));
    }

    checkCollisions(direction, arr) {
        for (let i = 0; i < arr.length; i++) {
            const tile = arr[i];
            const collision = {
                top: this.position.y < tile.position.y + tile.height,
                bottom: this.position.y + this.height > tile.position.y,
                left: this.position.x < tile.position.x + tile.width,
                right: this.position.x + this.width > tile.position.x
            }

            if (collision.top && collision.bottom && collision.left && collision.right) {
                switch (direction) {
                    case 'horizontal':
                        this.handleHorizontalCollision(tile);
                        break;
                    case 'vertical':
                        this.handleVerticalCollision(tile);
                        break;
                }
            }
        }
    }

    handleHorizontalCollision(tile) {
        // Right Collision
        if (this.velocity.x > 0) {
            this.position.x = tile.position.x - this.width;
        }

        // Left Collision
        if (this.velocity.x < 0) {
            this.position.x = tile.position.x + tile.width;
        }
    }

    handleVerticalCollision(tile) {
        // Bottom Collision
        if (this.velocity.y > 0) {
            this.position.y = tile.position.y - this.height;
            this.canJump = true;
            this.velocity.y = 0;
        }

        // Top Collision
        if (this.velocity.y < 0) {
            this.position.y = tile.position.y + tile.height;
            this.velocity.y = 0;
        }
    }

    update() {
        this.addGravity();
    }

    render() {
        this.ctx.drawImage(this.sprite, this.position.x, this.position.y)
    }

    // Debuging
    drawRect () {
        this.ctx.beginPath();
        this.ctx.lineWidth = "2";
        this.ctx.strokeStyle = 'red';
        this.ctx.rect(this.position.x, this.position.y, this.width, this.height);
        this.ctx.stroke();
    }
}
