import { Player } from "./player.class.js";
import { Sprite } from "./sprite.class.js";
import { layerData } from './settings.js';
import { Terrain } from "./terrain.class.js";

export class Scene {
    constructor(ctx, level = 1) {
        this.ctx = ctx;
        this.currentLevel = level;
        this.levelData = {}
        this.layers = layerData;
        this.player = new Player(ctx, 50, 300);
        this.terrain = [];
        // this.enemies = [];
        // this.collectables = [];
        this.init();
    }

    async init() {
        await this.loadLayerData();
        this.loadLayerSprites();
        this.createTerrain();
    }

    async loadLayerData() {
        const levelPath = `../../level/level${this.currentLevel}.json`;
        this.levelData = await fetch(levelPath).then((resp) => resp.json());
            
        for (const layer in this.layers) {
            const currentLayer = this.layers[layer];
            currentLayer.data = this.levelData.layers[currentLayer.id].data;
        }
    }

    loadLayerSprites() { // Mit implementierung von Animationen in die jeweilige Klasse verlagern -> Player/Collectables/Foreground
        for (const layer in this.layers) {
            const currentLayer = this.layers[layer];

            for (let i = 0; i < currentLayer.numSprites; i++) {
                const sprite = new Sprite(`${currentLayer.path}/${i}.png`).image;
                currentLayer.sprites.push(sprite);
            }
        }
    }

    createTerrain() {
        const terrainData = this.levelData.layers[2].data;
        const levelWidth = this.levelData.width;
        const levelHeigth = this.levelData.height;
        const tileWidth = this.levelData.tileWidth;
        const tileHeight = this.levelData.tileHeight;
        let row = 0;

        for (let i = 0; i < terrainData.length; i++) {
            let col = i % levelWidth;

            if (terrainData[i] != 0) {
                this.terrain.push(new Terrain(this.ctx, col * 64, row * 64, 64, 64))
            }

            if (col === (15)) {row += 1}
        }
    }

    renderLayers() { // Umschreiben, sodass die Renderfunktion der Objekte aufgerufen wird.
        const levelWidth = this.levelData.width;
        const levelHeigth = this.levelData.height;
        const tileWidth = this.levelData.tileWidth;
        const tileHeight = this.levelData.tileHeight;
        
        for (const layer in this.layers) {
            const currentLayer = this.layers[layer];
            let row = 0;
            if (layer === 'foreground' || layer === 'background') {row -= 1}

            for (let i = 0; i < currentLayer.data.length; i++) {
                let col = i % levelWidth;

                if (currentLayer.data[i] != 0) {
                    // console.log(layer, currentLayer.data[i])
                    let id = currentLayer.data[i] + currentLayer.spriteOffset;
                    this.ctx.drawImage(currentLayer.sprites[id], col * 64, row * 64);
                }
        
                if (col === (15)) {row += 1}
            }
        }
    }

    update() {
        this.player.update(this.terrain);
    }

    render() {
        this.renderLayers();
        this.player.render();
    }
}
