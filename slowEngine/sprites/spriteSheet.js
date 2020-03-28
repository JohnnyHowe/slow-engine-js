import {Vector} from "../geometry/index.js";
import {allSprites} from "./allSprites.js";
import {Image} from "./image.js";


/**
 * Class to represent and handle a sprite sheet
 */
class SpriteSheet {

    // Attributes
    filename;   // Filename of the sprite sheet image
    numImages;  // Number of images on the sprite sheet (vector)
    sheetImage; // loaded sprite sheet image
    images;     // Array of split images - derived from image

    /**
     * Create the sprite sheet
     * @param {string} filename - filepath of the image
     * @param {Vector} numImages - Size of the sprite sheet
     */
    constructor(filename, numImages) {
        allSprites.push(this);
        this.filename = filename;
        this.numImages = numImages
        this.loadImage();
    }

    /**
     * Get the image with an index.
     * sprites are read off the main sheet image in normal reading order -
     * left to right then once at the end of the line, go down.
     * If the images are not loaded, null is returned.
     * @param {number} index - index of image to get
     * @returns {Image} image at index in the sprite sheet
     */
    getImageAtIndex(index) {
        if (this.sheetImage.isLoaded()) {
            if (!this.images) {
                this.loadSprites();
            }
            return this.images[index];
        } else {
            return null;
        }
    }

    /**
     * Load the image at this.filename into this.sheetImage
     * Once the sheet image is loaded, run loadSprites;
     */
    loadImage() {
        this.sheetImage = new Image();
        this.sheetImage.loadFromFilepath(this.filename);
        let self = this;
        this.sheetImage.onload = function() {self.loadSprites}
    }

    /**
     * Get the size of the individual images on the sheet
     * @returns {Vector} size of individual sprites
     */
    getSpriteSize() {
        return new Vector(this.images.width / this.numImages.x, this.images.height / this.numImages.y);
    }

    /**
     * Split up the main sprite sheet image.
     * Put the individual sprite images into this.images;
     * Once complete, set this.loaded to true;
     * images are stored as SlowEngineImages
     */
    loadSprites() {
        this.images = [];
        for (let x = 0; x < this.numImages.x; x++) {
            for (let y = 0; y < this.numImages.y; y++) {
                let image = new Image();
                image.loadFromSpriteSheet(this, new Vector(x, y));
                this.images.push(image);
            }
        }
    }
}


export {SpriteSheet}