import { Layer } from "./layer.class.js";
import { waterData } from './settings.js';


export class Water extends Layer {
    constructor(ctx, layerData) {
        super(ctx, layerData);
        super.staggerFrames = waterData.animationSpeed;
        this.layerName = 'water';

        this.loadAnimations(waterData.animations);
        this.createLayer('water')
    }

    selectAnimation(dataId, col, row) {
        switch (dataId) {
            case 1:
                this.animation('water', col, row, waterData, this);
                break;
            case 2:
                this.animation('water1', col, row, waterData, this);
                break;
        }
    }

    setSpriteOffset(animation) {
        return { x: 0, y: 0 }
    }

    render() {
        this.playAnimation(this.layerName, this);
    }
} 