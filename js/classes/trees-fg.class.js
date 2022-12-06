import { GameObject } from "./game-object.class.js";

export class TreesFG extends GameObject {
    constructor(ctx, levelData) {
        super(ctx, levelData);
        this.createLayer('foreground');
    }
} 