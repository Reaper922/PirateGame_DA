import { Player } from "./player.class.js";
import { Sprite } from "./sprite.class.js";
import { layerData } from './settings.js';

export class Scene {
    constructor(ctx, frameCounter, level = 1) {
        this.ctx = ctx;
        this.currentLevel = level;
        this.levelData = {}
        this.layers = layerData;
        this.player = new Player(ctx, frameCounter, 50, 300, 44, 56);
        // this.enemies = [];
        // this.collectables = [];
        this.loadLayerData();
        this.loadLayerSprites();
    }

    async loadLayerData() {
        const levelPath = `../../level/level${this.currentLevel}.json`;
        this.levelData = await fetch(levelPath).then((resp) => resp.json());
            
        for (const layer in this.layers) {
            const currentLayer = this.layers[layer];
            currentLayer.data = this.levelData.layers[currentLayer.id].data;
        }
    }

    loadLayerSprites() {
        for (const layer in this.layers) {
            const currentLayer = this.layers[layer];

            for (let i = 0; i < currentLayer.numSprites; i++) {
                const sprite = new Sprite(`${currentLayer.path}/${i}.png`).image;
                currentLayer.sprites.push(sprite);
            }
        }
    }

    renderLayer() {
        const levelWidth = this.levelData.width;
        const levelHeigth = this.levelData.height;
        const tileWidth = this.levelData.tileWidth;
        const tileHeight = this.levelData.tileHeight;
        
        // for (const layer in this.layers) {
            const currentLayer = this.layers.terrain;
            let row = 0;

            for (let i = 0; i < currentLayer.data.length; i++) {
                let col = i % levelWidth;

                if (currentLayer.data[i] != 0) {
                    let id = currentLayer.data[i] + this.layers.terrain.spriteOffset;
                    this.ctx.drawImage(currentLayer.sprites[id], col * 64, row * 64);
                }
        
                if (col === (15)) {row += 1}
            }
        // }
    }

    update() {
        this.player.update();
    }

    render() {
        this.renderLayer();
        this.player.render();
    }
}
