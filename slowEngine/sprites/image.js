import {Vector} from "../geometry/index.js";


/**
 * Class representing an image
 * Like js Image but cooler
 */
class SlowEngineImage {

    // Attributes
    spriteSheet;            // Parent sprite sheet. If image is loaded from a filepath this is null
    spriteSheetPosition;    // Image position in sprite sheet, null if image not loaded from sprite sheet
    image;
    size;
    loaded = false;

    /**
     * Get the size of the image
     * size is (0, 0) if image isnt loaded
     * @returns {Vector} Image size
     */
    getSize() {
        if (this.image) {
            return new Vector(this.image.width, this.image.height);
        } else {
            return new Vector(0, 0);
        }
    }

    /**
     * Is the image loaded?
     * If the image is loaded by filename we only check whether that's loaded
     * If the image is from a sprite sheet, we check if the spritesheet is loaded
     */
    isLoaded() {
        if (this.spriteSheet) {
            if (this.spriteSheet.sheetImage.isLoaded()) {
                if (!this.loaded) {
                    this.loadSpriteSheetImage();
                }
            }
        }
        return (this.loaded)
    }

    /**
     * Get the image 
     * @returns {Image} JS image object
     */
    getImage() {
        let image = this.image;
        if (this.spriteSheet) {
            this.loadSpriteSheetImage();
            image = this.image;
        }
        return image;
    }

    /**
     * Load the image from a saved file
     * store image in this.image
     * @param {string} filename 
     */
    loadFromFilepath(filename) {
        this.image = new Image();
        this.image.src = filename;
        this.spriteSheet = null;

        let self = this;
        this.image.onload = function() {self.loaded = true;}
    }

    /**
     * Load the image from a sprite sheet.
     * @param {SpriteSheet} spriteSheet - sheet object to derive sprite from
     * @param {Vector} position - position of sprite on sheet image (indexed - not pixels)
     */
    loadFromSpriteSheet(spriteSheet, position) {
        this.spriteSheet = spriteSheet;
        this.spriteSheetPosition = position;
    }

    /**
     * set this.image to a sub section of the sprite sheet if this.spriteSheet is loaded
     */
    loadSpriteSheetImage() {
        if (this.spriteSheet && this.spriteSheet.sheetImage.isLoaded()) {
            let tempCanvas = document.createElement("canvas");
            let tempContext = tempCanvas.getContext("2d");
            let spriteSize = this.spriteSheet.getSpriteSize();
            tempCanvas.width = spriteSize.x;
            tempCanvas.height = spriteSize.y;
            let sourcePos = new Vector(spriteSize.x * this.spriteSheetPosition, spriteSize.y * this.spriteSheetPosition);
            tempContext.drawImage(this.spriteSheet.sheetImage.image, sourcePos.x, sourcePos.y, spriteSize.x, spriteSize.y, 0, 0, spriteSize.x, spriteSize.y);
            this.image = tempCanvas;
            this.loaded = true;
        }
    }
}

export {SlowEngineImage as Image}