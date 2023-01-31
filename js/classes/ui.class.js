export class Ui {
    constructor(ctx, player) {
        this.ctx = ctx;
        this.player = player;
    }
    
    render() {
        if (this.player) {
            this.ctx.fillStyle = "black";
            this.ctx.font = "48px serif";
            this.ctx.fillText(this.player.health + "x ♥", 10, 50);
            this.ctx.fillText(this.player.coins + "x ❂", 200, 50);
        }
    }
}