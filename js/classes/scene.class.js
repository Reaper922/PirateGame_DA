import { Player } from "./player.class.js";
import { layerData } from './settings.js';
import { Sky } from "./sky.class.js";
import { Terrain } from "./terrain.class.js";
import { TreesBG } from "./trees-bg.class.js";
import { TreesFG } from "./trees-fg.class.js";

export class Scene {
    constructor(ctx, level = 1) {
        this.ctx = ctx;
        this.currentLevel = level;
        this.levelData = {}
        this.layerData = layerData;

        this.initObjects();
    }

    async initObjects() {
        await this.loadLevelData();
        this.sky = new Sky(this.ctx, this.levelData);
        this.background = new TreesBG(this.ctx, this.levelData);
        this.terrain = new Terrain(this.ctx, this.levelData);
        this.foreground = new TreesFG(this.ctx, this.levelData);
        this.player = new Player(this.ctx, {x: 50, y: 200});
        // this.enemies = [];
        // this.collectables = [];
    }

    async loadLevelData() {
        const levelPath = `../../level/level${this.currentLevel}.json`;
        this.levelData = await fetch(levelPath).then((resp) => resp.json());
            
        for (const layer in this.layerData) {
            const currentLayer = this.layerData[layer];
            currentLayer.data = this.levelData.layers[currentLayer.id].data;
        }
    }

    update() {
        let terrainSprites = [];
        if (this.terrain && terrainSprites) {terrainSprites = this.terrain.sprites}
        if (this.sky) {this.sky.update()}
        if (this.player) {this.player.update(terrainSprites)}
    }

    render() {
        if (this.sky) {this.sky.render()}
        if (this.background) {this.background.render()}
        if (this.terrain) {this.terrain.render()}
        if (this.player) {this.player.render()}
        if (this.foreground) {this.foreground.render()}
    }
}
