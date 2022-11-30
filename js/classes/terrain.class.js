import { GameObject } from "./game-object.class.js";

export class Terrain extends GameObject {
    constructor(ctx, frameCounter, positionX, positionY, width, height) {
        super(frameCounter, '/assets/sprites/terrain/land/1.png');
        this.ctx = ctx;
        this.position.x = positionX;
        this.position.y = positionY;
        this.width = width;
        this.height = height;
    }
}