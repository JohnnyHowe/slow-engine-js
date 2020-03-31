/**
 * SlowEngine base class.
 */
import * as Geometry from "./geometry/index.js";
import * as GameObjects from "./gameObjects/index.js";
import * as Draw from "./draw/index.js";
import {Display} from "./display/index.js";
import {Clock} from "./clock.js";
import * as Sprites from "./sprites/index.js";
import {Keyboard} from "./keyboard.js";
import {Mouse} from "./mouse.js";


class SlowEngineClass {

    // Attributes
    Geometry;
    GameObjects;
    Draw;
    Display;
    Clock;
    Sprites;
    Keyboard;
    Mouse;

    constructor() {
        this.Geometry = Geometry;
        this.GameObjects = GameObjects;
        this.Draw = Draw;
        this.Display = Display;
        this.Clock = Clock;
        this.Sprites = Sprites;
        this.Keyboard = Keyboard;
        this.Mouse = Mouse;
    }

    update() {
        this.Clock.update();
        this.Mouse.update();
    }
}


let SlowEngine = new SlowEngineClass();
export default SlowEngine;