/**
 * Sprite class that represents an image.
 */
export class Sprite {
    constructor(path) {
        this.image = new Image();
        this.image.src = path;
        this.position = {
            x: 0,
            y: 0
        }
    }
}
