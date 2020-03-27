/**
 * SlowEngine base class.
 */
import * as Geometry from "./geometry/index.js";
import * as GameObjects from "./gameObjects/index.js";
import * as Draw from "./draw/index.js";
import {Display} from "./display/index.js";
import {Clock} from "./clock.js";
import * as Sprites from "./sprites/index.js";


class SlowEngineClass {

    // Attributes
    Geometry;
    GameObjects;
    Draw;
    Display;
    Clock;
    Sprites;

    constructor() {
        this.Geometry = Geometry;
        this.GameObjects = GameObjects;
        this.Draw = Draw;
        this.Display = Display;
        this.Clock = Clock;
        this.Sprites = Sprites;
    }

    update() {
        this.Clock.update();
    }
}


let SlowEngine = new SlowEngineClass();
export default SlowEngine;