import {Image} from "./image.js";
import { Vector } from "../geometry/index.js";


/**
 * Class to represent and handle a sprite sheet
 */
class SpriteSheet {

    // Attributes
    image;      // Main sprite sheet image
    filename;   // sprite sheet image name
    size;       // number of images on each axis
    images;     // All the sub images in the sprite sheet
    pixelSize;
    spriteSize;

    constructor(filename, size) {
        this.size = size;
        this.initializeImagesArray();
        this.loadImage(filename);

        let self = this;
        this.image.addLoadFunction(function() {self.setSize()});
        this.image.addLoadFunction(function() {self.loadImages()});
    }

    /**
     * Get the image at the index
     * @param {number} index 
     * @returns {SlowEngineImage} - image requested
     */
    getImage(index) {
        // console.log(this.images[index])
        return this.images[index];
    }

    /**
     * Load the image at filename into this.image (as a SlowEngineImage)
     * Sets this.filename as well
     * @param {string} filename 
     */
    loadImage(filename) {
        this.filename = filename;
        this.image = new Image();
        this.image.loadFromFilename(this.filename);
    }

    /**
     * Set this.pixelSize and this.spriteSize
     */
    setSize() {
        this.pixelSize = this.image.getSize();
        this.spriteSize = new Vector(this.pixelSize.x / this.size.x, this.pixelSize.y / this.size.y);
    }

    /**
     * Initialize the images array
     * Set each element to a new image but don't load them from anywhere
     */
    initializeImagesArray() {
        this.images = [];
        for (let i = 0; i < this.size.x * this.size.y; i ++) {
            this.images.push(new Image());
        }
    }

    /**
     * Load the images into the this.images array
     * this.images must already be initialized
     */
    loadImages() {
        for (let i = 0; i < this.images.length; i ++) {
            let image = this.getImage(i);
            let position = new Vector(i % this.size.x, Math.floor(i / this.size.x));
            image.loadFromSpriteSheet(this, position);
        }
    }
}


export {SpriteSheet}