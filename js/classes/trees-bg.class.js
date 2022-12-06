import { GameObject } from "./game-object.class.js";

export class TreesBG extends GameObject {
    constructor(ctx, levelData) {
        super(ctx, levelData);
        this.createLayer('background');
    }
} 