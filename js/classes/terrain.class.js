import { GameObject } from "./game-object.class.js";

export class Terrain extends GameObject {
    constructor(ctx, levelData) {
        super(ctx, levelData);
        this.createLayer('terrain');
    }
} 