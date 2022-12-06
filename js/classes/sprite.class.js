export class Sprite {
    constructor(path) {
        this.image = new Image();
        this.setSprite(path);
        this.position = {
            x: 0,
            y: 0
        }
    }

    setSprite(path) {
        this.image.src = path;
    }
}