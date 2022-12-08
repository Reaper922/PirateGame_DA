import { Layer } from "./layer.class.js";
import { tileSize, treeFgData } from './settings.js';

export class TreesFG extends Layer {
    constructor(ctx, layerData) {
        super(ctx, layerData);
        super.staggerFrames = treeFgData.animationSpeed;
        this.layerName = 'foreground';

        this.loadAnimations(treeFgData.animations);
    }

    selectAnimation(dataId, col, row) {
        switch (dataId) {
            case 8:
                this.animation('palmBig', col, row, treeFgData, this);
                break;
            case 12:
                this.animation('palmSmall', col, row, treeFgData, this);
                break;
            case 16:
                this.animation('palmLeft', col, row, treeFgData, this);
                break;
        }
    }

    setSpriteOffset(animation) {
        if (animation === 'palmSmall') { return { x: 0, y: (30 - tileSize.height) } }
        if (animation === 'palmLeft') { return { x: 0, y: (20 - tileSize.height) } }
        return { x: 0, y: -tileSize.height }
    }

    render() {
        this.playAnimation(this.layerName, this);
    }
} 