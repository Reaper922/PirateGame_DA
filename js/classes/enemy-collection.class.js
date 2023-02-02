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
        this.enemyHitAudio = new Audio("./assets/sounds/enemy_hit.wav");

        this.loadEnemies();
    }

    /**
     * Load the enemies based on the layer data.
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
                const enemy = new Enemy(this.ctx, this.data, {x: xPosition, y: yPosition});

                this.enemies.push(enemy);
            }

            if (col === (levelWidth - 1)) { row += 1 }
        }
    }

    playAudio() {
        this.enemyHitAudio.muted = globalThis.muteGameSound;
        this.enemyHitAudio.currentTime = 0;
        this.enemyHitAudio.volume = 0.6;
        this.enemyHitAudio.play();
    }

    /**
     * Updates the enemies array.
     * @param {Object} collisionGroup Collision group with sprites of each layer.
     */
    update(collisionGroup) {
        if (this.player.isAttacking) {
            for (let enemy of this.enemies) {
                const attackRect = this.player.getAttackRect();
                const collision = {
                    top: enemy.position.y < attackRect.position.y + attackRect.size.height,
                    bottom: enemy.position.y + enemy.height > attackRect.position.y,
                    left: enemy.position.x < attackRect.position.x + attackRect.size.width,
                    right: enemy.position.x + enemy.width > attackRect.position.x
                }
    
                if (collision.top && collision.bottom && collision.left && collision.right) {
                    this.playAudio();
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
                }
            }
        }

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