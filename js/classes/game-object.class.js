import { Sprite } from "./sprite.class.js";

export class GameObject {
    constructor(path) {
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.speed = 0;

        this.sprite = new Sprite(path).image;
    }
}
