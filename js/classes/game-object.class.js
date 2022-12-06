import { gravity } from "./settings.js";
import { layerData } from './settings.js';
import { Sprite } from "./sprite.class.js";

export class GameObject {
    constructor(ctx, levelData) {
        this.ctx = ctx;
        this.layerData = layerData;
        this.levelData = levelData;
        this.sprites = [];
        this.isStatic = true;
        this.width = 0;
        this.height = 0;

        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 0,
            y: 0
        }
    }

    createLayer(layer) {
        const dataArray = this.layerData[layer].data;
        const levelWidth = this.levelData.width;
        const levelHeigth = this.levelData.height;
        const tileWidth = this.levelData.tilewidth;
        const tileHeight = this.levelData.tileheight;
        let row = 0;

        for (let i = 0; i < dataArray.length; i++) {
            let col = i % levelWidth;

            if (dataArray[i] != 0) {
                let id = dataArray[i] + this.layerData[layer].spriteOffset;
                let terrain = new Sprite(`${this.layerData[layer].path}/${id}.png`)
                terrain.position.x = col * tileWidth;
                terrain.position.y = row * tileHeight;
                this.sprites.push(terrain)
            }

            if (col === (levelWidth - 1)) {row += 1}
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

    checkCollisions(direction, spritesArray) {
        for (let i = 0; i < spritesArray.length; i++) {
            const sprite = spritesArray[i];
            const collision = {
                top: this.position.y < sprite.position.y + sprite.image.height,
                bottom: this.position.y + this.height > sprite.position.y,
                left: this.position.x < sprite.position.x + sprite.image.width,
                right: this.position.x + this.width > sprite.position.x
            }
            
            if (collision.top && collision.bottom && collision.left && collision.right) {
                switch (direction) {
                    case 'horizontal':
                        this.handleHorizontalCollision(sprite);
                        break;
                    case 'vertical':
                        this.handleVerticalCollision(sprite);
                        break;
                }
            }
        }
    }

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

    update() {
        this.addGravity();
    }

    render() {
        for (let i = 0; i < this.sprites.length; i++) {
            this.ctx.drawImage(this.sprites[i].image, this.sprites[i].position.x, this.sprites[i].position.y);
        }
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
