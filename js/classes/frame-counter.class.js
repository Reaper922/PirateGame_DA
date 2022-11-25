export class FrameCounter {
    constructor() {
        this.currentFrame = 0;
    }

    getCurrentFrame() {
        return this.currentFrame;
    }

    increaseCurrentFrame() {
        this.currentFrame += 1;
    }
}