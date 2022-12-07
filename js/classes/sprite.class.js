/**
 * Sprite class that represents an image.
 */
export class Sprite {
    constructor(path) {
        this.image = new Image();
        this.setSprite(path);
        this.position = {
            x: 0,
            y: 0
        }
    }

    /**
     * Sets the sprite image.
     * @param {String} path Path of the sprite.
     */
    setSprite(path) {
        this.image.src = path;
    }
}