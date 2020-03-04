import Window from "./window.js";
import Camera from "./camera.js";
import Clock from "./clock.js";
import KeyInput from "./keyInput.js";
import Drawer from "./drawer.js";
import physicsHandler from "./physics/physicsHandler.js";


export default class Engine {
    constructor() {
        this.window = new Window();
        this.camera = new Camera();
        this.clock = new Clock();
        this.keyInput = new KeyInput();
        this.drawer = new Drawer(this);
        this.physicsHandler = new physicsHandler();
    }
    update() {
        this.clock.update();
        this.window.clearWindow();
    }
}