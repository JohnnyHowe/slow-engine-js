
/** Frame class */
class Frame {

    // Attributes
    pixelsPerUnit;  // How many pixels takes up one game unit?
    duration;       // Frame display time
    image;          // Loaded image

    /**
     * Create the frame.
     * @param {Image} image - Sprite image for frame
     * @param {Vector} pixelsPerUnit - How many pixels fit into one game unit
     */
    constructor(image, pixelsPerUnit, duration) {
        this.image = image;
        this.pixelsPerUnit = pixelsPerUnit
        this.duration = duration;
    }
}


export {Frame}