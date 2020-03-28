import * as Geometry from "../geometry/index.js";
import Camera from "./camera.js";


/** 
 * SlowEngine.Display - Display class, controls and handles display info. 
 */
class DisplayClass {

    // Attributes
    canvas;     // JS canvas
    context;    // Canvas context
    size;       // Size of the canvas
    camera;

    /**
     * Make the display - set the canvas, context and size.
     * @hideconstructor
     */
    constructor() {
        this.setCanvas();
        this.setSize(this.getCanvasSize())
        this.Camera = new Camera();
        this.setResizeListener();
    }

    /** 
     * Get the current size of the display (in pixels).
     * @returns {Vector} display size
     */
    getSize() {
        return this.size.getCopy();
    }

    clear() {
        this.context.clearRect(0, 0, this.size.x, this.size.y)
    }

    // ==================================================
    // Private Methods.
    // ==================================================

    /** 
     * Sets the event listener for a display size change.
     * Update display size if required.
     * @ignore
     */
    setResizeListener() {
        let self = this;
        window.addEventListener('resize', resizeCanvas, false);
        function resizeCanvas() {
            self.setSize(self.getCanvasSize());
        };
    }

    /**
     * Get the size of the canvas - not necessarily the size of the display object.
     * @ignore
     */
    getCanvasSize() {
        return new Geometry.Vector(window.innerWidth, window.innerHeight)
    }

    /** 
     * Update the size of the display.
     * This includes updating the canvas size.
     * @param {Vector} size - size to set window to.
     * @ignore
     */
    setSize(size) {
        this.size = size;
        this.canvas.width = size.x;
        this.canvas.height = size.y;
        this.context.imageSmoothingEnabled = false;     // Changing canvas size turns this on - IDK why
    }

    /**
     * Set the canvas and context for the display.
     * @ignore
     */
    setCanvas() {
        this.canvas = document.getElementById('mainCanvas');
        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
    }
}


let Display = new DisplayClass();
export default Display;