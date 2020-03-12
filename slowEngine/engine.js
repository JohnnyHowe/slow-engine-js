import Window from "./window.js";
import Camera from "./camera.js";
import Clock from "./clock.js";
import KeyInput from "./keyInput.js";
import Drawer from "./drawer.js";


export default class Engine {
    constructor() {
        this.window = new Window();
        this.camera = new Camera();
        this.clock = new Clock();
        this.keyInput = new KeyInput();
        this.drawer = new Drawer(this);

        this.debug = true;
    }
    update() {
        this.debugMode();        
        this.clock.update();
        this.window.clearWindow();
    }
    debugMode() {
        if (this.debug) {
            if (this.keyInput.isPressed("1")) {
                this.clock._dtimeMult -= this.clock._dtimeMult * this.clock.rawdtime;
                console.log("Delta time multiplier = " + this.clock._dtimeMult);
            } else if (this.keyInput.isPressed("2")) {
                this.clock._dtimeMult += this.clock._dtimeMult * this.clock.rawdtime;
                console.log("Delta time multiplier = " + this.clock._dtimeMult);
            }
            if (this.keyInput.isPressed(" ")) {
                this.clock._dtimeMult = 0.1;
                console.log("Delta time multiplier = " + this.clock._dtimeMult);
            }
        }
    }
}