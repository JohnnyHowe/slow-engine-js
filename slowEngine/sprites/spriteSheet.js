import {Vector} from "../geometry/index.js";
import {allSprites} from "./allSprites.js";


/**
 * Class to represent and handle a sprite sheet
 */
class SpriteSheet {

    // Attributes
    filename;   // Filename of the sprite sheet image
    numImages;  // Number of images on the sprite sheet (vector)
    sheetImage;      // loaded sprite sheet image
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
        this.loadImages();
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
        return this.images[index]
    }

    /**
     * Load the image at this.filename into this.sheetImage
     * Once the sheet image is loaded, run loadSprites;
     */
    loadImages() {
        let image = new Image()
        image.src = this.filename;
        this.sheetImage = image;

        // Don't ask - I couldn't make it work any other way.
        let self = this;
        image.onload = function () {
            self.loadSprites();
        }
    }

    /**
     * Is the sprite sheet is fully loaded
     * @returns {Boolean} whether the sheet is fully loaded
     */
    isLoaded() {
        let loaded = true;
        if (!this.sheetImage || !this.images) {
            loaded = false;
        } else {
            for (let sprite of this.images) {
                if (!sprite) {
                    loaded = false;
                    break
                }
            }
        }
        return loaded;
    }

    /**
     * Split up the main sprite sheet image.
     * Put the individual sprites into this.images;
     * Once complete, set this.loaded to true;
     */
    loadSprites() {
        let spriteSize = new Vector(this.sheetImage.width / this.numImages.x, this.sheetImage.height / this.numImages.y);
        this.images = [];
        for (let x = 0; x < this.numImages.x; x++) {
            for (let y = 0; y < this.numImages.y; y++) {
                let tempCanvas = document.createElement("canvas");
                let tempContext = tempCanvas.getContext("2d");
                tempCanvas.width = spriteSize.x;
                tempCanvas.height = spriteSize.y;
                let sourcePos = new Vector(spriteSize.x * x, spriteSize.y * y);
                tempContext.drawImage(this.sheetImage, sourcePos.x, sourcePos.y, spriteSize.x, spriteSize.y, 0, 0, spriteSize.x, spriteSize.y);
                this.images.push(tempCanvas);
            }
        }
    }
}


export {SpriteSheet}