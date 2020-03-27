import {Clock} from "../clock.js";
import * as Draw from "../draw/index.js";
import {Frame} from "./index.js";
import {Vector} from "../geometry/index.js";


/** Animation object - stores info about a single animation (sequence of frames) */
class Animation {

    // Attributes
    frames;     // List of frames to play.
    playTime;   // Time the animation has been playing
    frameTimes; // Array of times to end frames

    constructor() {
        this.frames = [];
        this.frameTimes = [0];
        this.playTime = 0;
    }

    /**
     * Add a new frame to the animation.
     * Adds frame to the end of the animation
     * @param {Frame} frame - the frame to add
     */
    addFrame(frame) {
        this.frames.push(frame);
        this.frameTimes.push(this.frameTimes[this.frameTimes.length - 1] + frame.duration);
    }

    /**
     * Set the play time to zero - restarting/resetting the animation
     */
    reset() {
        this.playTime = 0;
    }

    /**
     * Play through the animation.
     * update play time and draw the animation.
     * @param {Transform} transform - transform component of parent
     */
    run(tranform) {
        this.update();
        this.draw(tranform);
    }

    /**
     * Update the animation so it actually animates
     * Does not show anything.
     */
    update() {
        this.playTime += Clock.getDeltaTime();
    }

    /**
     * Return the index of the current frame
     */
    getCurrentIndex() {
        let progress = this.playTime % this.frameTimes[this.frameTimes.length - 1];
        let index = 0;
        for (index = 0; index < this.frameTimes.length; index ++) {
            if (progress < this.frameTimes[index]) {
                break
            }
        }
        return index - 1;
    }

    /**
     * Draw the current frame
     * Frame is drawn centered on transform.position and scaled by transform.size
     * @param {Transform} transform - transform component of parent
     */
    draw(transform) {
        let frame = this.frames[this.getCurrentIndex()];
        // console.log(frame)
        if (frame.image) {
            let size = new Vector(frame.pixelsPerUnit.x / transform.size.x, frame.pixelsPerUnit.y / transform.size.y);
            Draw.drawGameImage(frame.image, transform.position, size);
        }
    }
}


export {Animation}