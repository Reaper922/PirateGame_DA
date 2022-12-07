/**
 * Class for managing player input.
 */
export class InputController {
    constructor() {
        this.keysPressed = {
            w: false,
            a: false,
            s: false,
            d: false,
            space: false
        }

        addEventListener('keydown', (event) => this.setPressedKey.bind(this)(event));
        addEventListener('keyup', (event) => this.setReleasedKey.bind(this)(event));
    }

    /**
     * Sets the boolean for the pressed key to true.
     * @param {String} key String representation of the pressed key.
     */
    setPressedKey({key}) {
        if (key === 'w') {this.keysPressed.w = true}
        if (key === 'a') {this.keysPressed.a = true}
        if (key === 's') {this.keysPressed.s = true}
        if (key === 'd') {this.keysPressed.d = true}
        if (key === ' ') {this.keysPressed.space = true}
    }

    /**
     * Sets the boolean for the released key to false.
     * @param {String} key String representation of the released key.
     */
    setReleasedKey({key}) {
        if (key === 'w') {this.keysPressed.w = false}
        if (key === 'a') {this.keysPressed.a = false}
        if (key === 's') {this.keysPressed.s = false}
        if (key === 'd') {this.keysPressed.d = false}
        if (key === ' ') {this.keysPressed.space = false}
    }

    /**
     * Returns an Object with pressed keys.
     * @returns keyPressed Object.
     */
    getPressedKeys() {
        return this.keysPressed;
    }
}
