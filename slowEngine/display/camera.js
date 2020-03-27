import {GameObject} from "../gameObjects/gameObject.js";


/** 
 * Camera class.
 * Child of GameObject only with a Transform component by default.
 */
class Camera extends GameObject {

    // Attributes
    pixelsPerUnit;  // Number of pixels in each game unit.

    /**
     * Make/initialize the camera
     */
    constructor() {
        super()
        this.pixelsPerUnit = 50;
    }
}


export default Camera;