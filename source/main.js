import SlowEngine from "../slowEngine/index.js";
import {Player} from "./player.js";

let Vector = SlowEngine.Geometry.Vector;

let player;
let blocks = [];


class Block extends SlowEngine.GameObjects.GameObject {
    constructor(position, size) {
        super();
        this.addComponent(SlowEngine.GameObjects.Components.SpriteRenderer);
        this.addComponent(SlowEngine.GameObjects.Components.BoxCollider);
        this.getComponent("Transform").position = position;
        this.getComponent("Transform").size = size;
    }
}


function setup() {
    player = new Player();
    
    blocks = [
        new Block(new Vector(0, -3), new Vector(30, 1)),
        // new Block(new Vector(2, 1), new Vector(1, 1)),
        // new Block(new Vector(1, 2), new Vector(1, 1)),
    ];
}


function main() {
    SlowEngine.update();
    SlowEngine.Display.clear();
    player.getComponent("BoxCollider").runCollisions(blocks);
    player.run();

    for (let block of blocks) {
        block.runComponents();
    }
}


export {
    setup,
    main,
}