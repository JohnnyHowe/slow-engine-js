
export default class Window {
    /** Controls all the window things */
    constructor() {
        this.size = {w: 0, h: 0};
        this.canvas = document.getElementById('mainCanvas');
        this.context = this.canvas.getContext("2d");

        let self = this;
        window.addEventListener('resize', resizeCanvas, false);
        function resizeCanvas() {
            self.resizeWindow({w: window.innerWidth, h: window.innerHeight})
        };
        resizeCanvas();
    }
    resizeWindow(newSize) {
        /** Given a new window size (Vector), resize the canvas. */
        this.size = newSize;
        this.canvas.width = this.size.w;
        this.canvas.height = this.size.h;
    }
    clearWindow() {
        /** Clear the canvas. */
        this.context.clearRect(0, 0, this.size.w, this.size.h);
    }
}