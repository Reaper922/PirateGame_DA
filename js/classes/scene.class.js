import { GameAudio } from "./audio.class.js";
import { Collectable } from "./collectable.class.js";
import { EnemyCollection } from "./enemy-collection.class.js";
import { Player } from "./player.class.js";
import { audioData, layerData, loadingDelay, playerData } from './settings.js';
import { Sky } from "./sky.class.js";
import { Terrain } from "./terrain.class.js";
import { TreesBG } from "./trees-bg.class.js";
import { TreesFG } from "./trees-fg.class.js";
import { Ui } from "./ui.class.js";
import { Water } from "./water.class.js";


/**
 * Scene class that manages the game elements (player, enemies, collectables...) and layers (terrain, sky...) of the current level.
 */
export class Scene {
    constructor(ctx, level = 1) {
        this.ctx = ctx;
        this.currentLevel = level;
        this.levelData = {}
        this.layerData = layerData;
        this.collisionGroups = {
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
        this.instantiateClasses();
        this.setCollisionGroups();
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
     * Creates new class instances for the game elements.
     */
    instantiateClasses() {
        this.sky = new Sky(this.ctx, this.layerData);
        this.background = new TreesBG(this.ctx, this.layerData);
        this.terrain = new Terrain(this.ctx, this.layerData);
        this.player = new Player(this.ctx, this.layerData, playerData.initialPosition);
        this.foreground = new TreesFG(this.ctx, this.layerData);
        this.water = new Water(this.ctx, this.layerData);
        this.collectables = new Collectable(this.ctx, this.levelData.layers[5].data);
        this.enemies = new EnemyCollection(this.ctx, this.levelData.layers[6].data, this.player);
        this.ui = new Ui(this.ctx, this.player);
        this.backgroundMusic = new GameAudio(audioData.backgroundMusic.path, audioData.backgroundMusic.volume);
    }

    /**
     * Sets the collisiongroup for elements and layers.
     */
    setCollisionGroups() {
        if (this.terrain && this.collisionGroups.terrainSprites.length == 0) {
            this.collisionGroups.terrainSprites = this.terrain.sprites;
        }

        if (this.water && this.collisionGroups.waterSprites.length == 0) {
            this.collisionGroups.waterSprites = this.water.sprites;
        }

        if (this.collectables && this.collisionGroups.collectableSprites.length == 0) {
            this.collisionGroups.collectableSprites = this.collectables.sprites;
        }
    }

    checkSpriteCollision(sprite1, sprite2) {
        const collision = {
            top: sprite1.position.y < sprite2.position.y + sprite2.height,
            bottom: sprite1.position.y + sprite1.height > sprite2.position.y,
            left: sprite1.position.x < sprite2.position.x + sprite2.width,
            right: sprite1.position.x + sprite1.width > sprite2.position.x
        }

        if (collision.top && collision.bottom && collision.left && collision.right) {
            return true;
        }
        return false;
    }

    checkEnemyCollision() {
        if (this.player && this.enemies) {
            const playerCollisionRect = this.player.getCollisionRect();
            for (const enemy of this.enemies.enemies) {
                const enemyCollisionRect = enemy.getCollisionRect();
                const isColliding = this.checkSpriteCollision(playerCollisionRect, enemyCollisionRect);
                if (isColliding) { this.player.getHurt() }
            }
        }
    }

    /**
     * Updates the elements and layers of the current scene.
     */
    update() {
        if (globalThis.frameCounter > loadingDelay) {
            if (this.backgroundMusic) { this.backgroundMusic.play() }
            if (this.sky) { this.sky.update() }
            if (this.enemies) { this.enemies.update(this.collisionGroups) }
            if (this.player) { this.player.update(this.collisionGroups) }
            if (this.player && this.enemies) { this.checkEnemyCollision() }
        }
    }

    /**
     * Renders the elements and layers of the current scene.
     */
    render() {
        if (this.sky) { this.sky.render() }
        if (this.background) { this.background.render() }
        if (this.terrain) { this.terrain.render() }
        if (this.collectables) { this.collectables.render() }
        if (this.enemies) { this.enemies.render() }
        if (this.player) { this.player.render() }
        if (this.foreground) { this.foreground.render() }
        if (this.water) { this.water.render() }
        if (this.ui) { this.ui.render() }
    }
}
