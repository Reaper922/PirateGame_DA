/**
 * Class that represents the ui layer. This class contains and renders all ui elements.
 */
export class Ui {
    constructor(ctx, player) {
        this.ctx = ctx;
        this.player = player;
        this.heartIcon = new Image();
        this.heartIcon.src = './assets/sprites/icons/heart.png';
        this.skullIcon = new Image();
        this.skullIcon.src = './assets/sprites/icons/skull.png';
    }
    
    /**
     * Renders all ui elements.
     */
    render() {
        if (this.player) {
            this.ctx.fillStyle = "black";
            this.ctx.font = "56px MiniPixel-7";
            this.ctx.fillText(this.player.health + "x", 30, 60);
            this.ctx.fillText(this.player.coins + "x", 190, 60);
            this.ctx.drawImage(this.heartIcon, 80, 20)
            this.ctx.drawImage(this.skullIcon, 240, 20)
        }
    }
}