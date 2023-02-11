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

        this.setEventListenerKeyboard();
        this.setEventListenerTouchControls();
    }

    /**
     * Sets the event listener for keyboard input.
     */
    setEventListenerKeyboard() {
        addEventListener('keydown', (event) => this.setPressedKey.bind(this)(event));
        addEventListener('keyup', (event) => this.setReleasedKey.bind(this)(event));
    }

    /**
     * Sets event listener for input via touch controls.
     */
    setEventListenerTouchControls() {
        const leftTouch = document.getElementById('left');
        const rightTouch = document.getElementById('right');
        const jumpTouch = document.getElementById('jump');
        const attackTouch = document.getElementById('attack');

        leftTouch.addEventListener('pointerdown', () => this.keysPressed.a = true);
        leftTouch.addEventListener('pointerup', () => this.keysPressed.a = false);
        rightTouch.addEventListener('pointerdown', () => this.keysPressed.d = true);
        rightTouch.addEventListener('pointerup', () => this.keysPressed.d = false);
        jumpTouch.addEventListener('pointerdown', () => this.keysPressed.w = true);
        jumpTouch.addEventListener('pointerup', () => this.keysPressed.w = false);
        attackTouch.addEventListener('pointerdown', () => this.keysPressed.space = true);
        attackTouch.addEventListener('pointerup', () => this.keysPressed.space = false);
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
