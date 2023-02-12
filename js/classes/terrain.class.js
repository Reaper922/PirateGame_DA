import { Layer } from "./layer.class.js";


/**
 * Create the terrain layer object.
 */
export class Terrain extends Layer {
    constructor(ctx, levelData) {
        super(ctx, levelData);
        this.createLayer('terrain');
    }
} 