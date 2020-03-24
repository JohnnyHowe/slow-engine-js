import Geometry from "../geometry/main.js";


/**
 * Class for the window/gameDisplay. 
 * Controls/updates own size.
 */
export default class GameDisplay {
    /** Holds information about the current display window. */
    pixelSize;  // The size of the gameDisplay in pixels
    canvas;     // HTML canvas element
    context;    // Canvas context - things are drawn to this

    constructor() {
        // Set canvas
        this.canvas = document.getElementById('mainCanvas');
        this.context = this.canvas.getContext("2d");
        // Set window size and its event listener
        this._setResizeListener();
    }

    // Setters and getters

    /**
     * Set the size of the gameDisplay. (updates this.pixelSize and canvas size)
     * @param {Geometry.Vector} newSize - size (in pixels) to set window to.
     */
    setSize(newSize) {
        this.pixelSize = newSize;
        this.canvas.width = newSize.x;
        this.canvas.height = newSize.y;
    }

    /**
     * Get (a refernce to) the current window size
     * @return {Geometry.Vector} window size
     */
    getSize() {
        return this.pixelSize;
    }

    /**
     * Create the event listener for the resizing of the gameDisplay
     * If the display size is changed, this.setSize is called
     * On class init, resizeCanvas is called, setting the gameDisplay size.
     */
    _setResizeListener() {
        let self = this;
        window.addEventListener('resize', resizeCanvas, false);
        function resizeCanvas() {
            self.setSize(new Geometry.Vector(window.innerWidth, window.innerHeight));
        };
        resizeCanvas();
    }

    clearDisplay() {
        this.context.clearRect(0, 0, this.getSize().x, this.getSize().y);
    }
}