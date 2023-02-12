import { Enemy } from './enemy.class.js';
import { levelSize, tileSize } from './settings.js';


/**
 * Collection of enemies.
 */
export class EnemyCollection {
    constructor(ctx, data, player) {
        this.ctx = ctx;
        this.data = data;
        this.player = player;
        this.enemies = [];

        this.loadEnemies();
    }

    /**
     * Loads the enemies based on the layer data.
     */
    loadEnemies() {
        const levelWidth = levelSize.width;
        let row = 0;

        for (let i = 0; i < this.data.length; i++) {
            const col = i % levelWidth;
            const dataId = this.data[i];

            if (dataId != 0) {
                const xPosition = col * tileSize.width;
                const yPosition = row * tileSize.height;
                const enemy = new Enemy(this.ctx, this.data, { x: xPosition, y: yPosition });

                this.enemies.push(enemy);
            }

            if (col === (levelWidth - 1)) { row += 1 }
        }
    }

    /**
     * Updates the enemies array.
     * @param {Object} collisionGroup Collision group with sprites of each layer.
     */
    update(collisionGroup) {
        for (let enemy of this.enemies) {
            enemy.update(collisionGroup);
        }
    }

    /**
     * Renders the enemies array.
     */
    render() {
        for (let enemy of this.enemies) {
            enemy.render();
        }
    }
}
