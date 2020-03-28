/** Frame class */
class Frame {

    // Attributes
    pixelsPerUnit;  // How many pixels takes up one game unit?
    duration;       // Frame display time
    image;          // Image object

    /**
     * Create the frame.
     * @param {SlowEngineImage} image - image for frame
     * @param {Vector} pixelsPerUnit - How many pixels fit into one game unit
     * @param {number} duration - how long the frame is displayed for
     */
    constructor(image, pixelsPerUnit, duration) {
        this.image = image;
        this.pixelsPerUnit = pixelsPerUnit
        this.duration = duration;
    }
}


export {Frame}