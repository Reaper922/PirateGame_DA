export class Ui {
    constructor(ctx, player) {
        this.ctx = ctx;
        this.player = player;
        this.heartIcon = new Image();
        this.heartIcon.src = './assets/sprites/icons/heart.png';
        this.skullIcon = new Image();
        this.skullIcon.src = './assets/sprites/icons/skull.png';
    }
    
    render() {
        if (this.player) {
            this.ctx.fillStyle = "black";
            this.ctx.font = "48px serif";
            this.ctx.fillText(this.player.health + "x", 20, 55);
            this.ctx.fillText(this.player.coins + "x", 180, 55);
            this.ctx.drawImage(this.heartIcon, 80, 20)
            this.ctx.drawImage(this.skullIcon, 240, 20)
        }
    }
}