import SlowEngine from "../slowEngine/index.js";
import {Player} from "./player.js";

let Vector = SlowEngine.Geometry.Vector;

let player;
let ground;


function setup() {
    player = new Player();
    
    ground = new SlowEngine.GameObjects.GameObject();
    ground.addComponent(SlowEngine.GameObjects.Components.SpriteRenderer);
    ground.getComponent("Transform").position = new Vector(0, -3);
    ground.getComponent("Transform").size = new Vector(10, 1);
}


function main() {
    SlowEngine.update();
    SlowEngine.Display.clear();
    player.run();
    // ground.runComponents();
}


export {
    setup,
    main,
}