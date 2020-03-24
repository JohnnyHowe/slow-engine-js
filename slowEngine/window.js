import Vector from "./geometry/vector.js";


export default class Window {
    /** Controls all the window things */
    constructor(engine) {
        this.engine = engine;
        this.size = new Vector(0, 0);
        this.canvas = document.getElementById('mainCanvas');
        this.context = this.canvas.getContext("2d");

        let self = this;
        window.addEventListener('resize', resizeCanvas, false);
        function resizeCanvas() {
            self.resizeWindow(new Vector(window.innerWidth, window.innerHeight));
        };
        resizeCanvas();
    }
    resizeWindow(newSize) {
        /** Given a new window size (Vector), resize the canvas. */
        this.size = newSize;
        this.canvas.width = this.size.x;
        this.canvas.height = this.size.y;
    }
    clearWindow() {
        /** Clear the canvas. */
        this.context.clearRect(0, 0, this.size.x, this.size.y);
    }
    getGameSize() {
        return this.size.divided(this.engine.camera.pixelsPerUnit);
    }
}