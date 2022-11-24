
export class Sprite {
    constructor(path) {
        this.image = new Image();
        this.setSprite(path);
    }

    setSprite(path) {
        this.image.src = path;
    }
}