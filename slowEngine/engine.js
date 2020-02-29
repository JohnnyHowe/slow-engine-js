import Window from "./window.js";
import Camera from "./camera.js";
import Clock from "./clock.js";
import KeyHandler from "./keyInputHandler.js";
import Draw from "./draw.js";


export default class Engine {
    constructor() {
        this.window = new Window();
        this.camera = new Camera();
        this.clock = new Clock();
        this.keys = new KeyHandler();
        this.draw = new Draw(this);
    }
    update() {
        this.clock.update();
        this.window.clearWindow();
    }
}