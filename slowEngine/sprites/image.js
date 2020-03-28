import { Vector } from "../geometry/index.js";

/**
 * Wrapper class for the image
 */
class SlowEngineImage {

    // Attributes
    image;          // Normal JS image 
    filename;
    loaded; // Is the image loaded?
    onLoadList;    // array of functions to call once the image is loaded

    constructor() {
        this.loaded = false;
        this.onLoadList = [];
    }

    /**
     * is the image loaded?
     * @returns {Boolean} whether the image is loaded
     */
    isLoaded() {
        return this.loaded;
    }

    /**
     * Get the size of the image
     * if the image is not loaded the size is zero
     * @returns {Vector} size of image
     */
    getSize() {
        return new Vector(this.image.width, this.image.height);
    }

    /**
     * Add a function to the onload list so it is called once the image is loaded
     * @param {function} func - function to add
     */
    addLoadFunction(func) {
        this.onLoadList.push(func);
    }

    /**
     * Function that will be called when image is loaded
     */
    imageOnLoad() {
        this.loaded = true;
        for (let func of this.onLoadList) {
            func(this);
        }
    }

    /**
     * Load the image from a filename
     * @param {string} filename - where to load image from
     */
    loadFromFilename(filename) {
        this.image = new Image();
        this.filename = filename;
        this.image.src = filename;

        let self = this;
        this.image.onload = function() {self.imageOnLoad()};
    }

    /**
     * Load the image from a sprite sheet
     * @param {SpriteSheet} spriteSheet - where to derive the image from
     * @param {Vector} position - position of image on sprite sheet (indices, not pixels)
     */
    loadFromSpriteSheet(spriteSheet, position) {
        let tempCanvas = document.createElement("canvas");
        let tempContext = tempCanvas.getContext("2d");
        let spriteSize = spriteSheet.spriteSize;
        tempCanvas.width = spriteSize.x;
        tempCanvas.height = spriteSize.y;
        let sourcePos = new Vector(spriteSize.x * position.x, spriteSize.y * position.y);
        tempContext.drawImage(spriteSheet.image.image, sourcePos.x, sourcePos.y, spriteSize.x, spriteSize.y, 0, 0, spriteSize.x, spriteSize.y);
        // console.log(spriteSize, spriteSheet.spriteSize)
        this.image = tempCanvas;
        this.loaded = true;
    }
}


export {SlowEngineImage as Image}