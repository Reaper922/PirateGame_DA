import { Player } from "./player.class.js";

export class Scene {
    constructor(ctx, startLevel = 1) {
        this.ctx = ctx;
        this.player = new Player(ctx, '/assets/sprites/player/idle_right/1.png');
        this.background = [];
        this.foreground = [];
        this.terrain = [];
        this.enemies = [];
        this.collectables = [];
    }

    update() {
        this.player.update();
    }

    render() {
        this.player.render();
    }
}
