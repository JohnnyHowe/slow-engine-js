
export default class Window {
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
        this.size = newSize;
        this.canvas.width = this.size.w;
        this.canvas.height = this.size.h;
    }
    clearWindow() {
        this.context.clearRect(0, 0, this.size.w, this.size.h);
    }
}