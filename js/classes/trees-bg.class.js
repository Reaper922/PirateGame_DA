import { Layer } from "./layer.class.js";
import { tileSize, treeBgData } from './settings.js';

export class TreesBG extends Layer {
    constructor(ctx, layerData) {
        super(ctx, layerData);
        super.staggerFrames = treeBgData.animationSpeed;
        this.layerName = 'background';

        this.loadAnimations(treeBgData.animations);
    }

    selectAnimation(dataId, col, row) {
        switch (dataId) {
            case 28:
                this.animation('palmBig', col, row, treeBgData, this);
                break;
            case 35:
                this.animation('palmLeft', col, row, treeBgData, this);
                break;
        }
    }

    setSpriteOffset(animation) {
        if (animation === 'palmLeft') { return { x: 0, y: (20 - tileSize.height) } }
        return { x: 0, y: -tileSize.height }
    }

    render() {
        this.playAnimation(this.layerName, this);
    }
} 