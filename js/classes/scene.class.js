import { Collectable } from "./collectable.class.js";
import { EnemyCollection } from "./enemy-collection.class.js";
import { Player } from "./player.class.js";
import { layerData } from './settings.js';
import { Sky } from "./sky.class.js";
import { Terrain } from "./terrain.class.js";
import { TreesBG } from "./trees-bg.class.js";
import { TreesFG } from "./trees-fg.class.js";
import { Water } from "./water.class.js";

/**
 * Scene class that manages the elements (player, enemies, collectables...) and layers (terrain, sky...) of the current level.
 */
export class Scene {
    constructor(ctx, level = 1) {
        this.ctx = ctx;
        this.currentLevel = level;
        this.levelData = {}
        this.layerData = layerData;
        this.collisionGroup = {
            terrainSprites: [],
            waterSprites: [],
            collectableSprites: []
        }

        this.initObjects();
    }

    /**
     * Method that initializes level elements and layers.
     */
    async initObjects() {
        await this.loadLevelData();
        this.transferLayerData();
        this.sky = new Sky(this.ctx, this.layerData);
        this.background = new TreesBG(this.ctx, this.layerData);
        this.terrain = new Terrain(this.ctx, this.layerData);
        this.player = new Player(this.ctx, this.layerData, { x: 50, y: 200 }); // Player Position in Settings?
        this.foreground = new TreesFG(this.ctx, this.layerData);
        this.water = new Water(this.ctx, this.layerData);
        this.collectables = new Collectable(this.ctx, this.levelData.layers[5].data);
        this.enemies = new EnemyCollection(this.ctx, this.levelData.layers[6].data);
        this.setCollisionGroup();
    }

    /**
     * Loads the level data from the json file of the current level.
     */
    async loadLevelData() {
        const levelPath = `./level/level${this.currentLevel}.json`;
        this.levelData = await fetch(levelPath).then((resp) => resp.json());
    }

    /**
     * Transfers the data of the layer from levelData to layerData.
     */
    transferLayerData() {
        for (const layer in this.layerData) {
            const currentLayer = this.layerData[layer];
            currentLayer.data = this.levelData.layers[currentLayer.id].data;
        }
    }

    /**
     * Sets the collisiongroup for elements and layers.
     */
    setCollisionGroup() {
        if (this.terrain && this.collisionGroup.terrainSprites.length == 0) {
            this.collisionGroup.terrainSprites = this.terrain.sprites;
        }

        if (this.water && this.collisionGroup.waterSprites.length == 0) {
            this.collisionGroup.waterSprites = this.water.sprites;
        }

        if (this.collectables && this.collisionGroup.collectableSprites.length == 0) {
            this.collisionGroup.collectableSprites = this.collectables.sprites;
        }
    }

    /**
     * Updates the elements and layers of the current scene.
     */
    update() {
        if (this.sky) { this.sky.update() }
        if (this.enemies) { this.enemies.update(this.collisionGroup) }
        if (this.player) { this.player.update(this.collisionGroup) }
    }

    /**
     * Renders the elements and layers of the current scene.
     */
    render() {
        if (this.sky) { this.sky.render() }
        if (this.background) { this.background.render() }
        if (this.terrain) { this.terrain.render() }
        if (this.enemies) { this.enemies.render() }
        if (this.collectables) { this.collectables.render() }
        if (this.player) { this.player.render() }
        if (this.foreground) { this.foreground.render() }
        if (this.water) { this.water.render() }
    }
}
