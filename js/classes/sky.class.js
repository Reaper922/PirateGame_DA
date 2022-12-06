import { GameObject } from "./game-object.class.js";

export class Sky extends GameObject {
    constructor(ctx, levelData) {
        super(ctx, levelData);
        this.createLayer('sky');
    }
} 