import SlowEngine from "../slowEngine/index.js";
import {Player} from "./player.js";

let Vector = SlowEngine.Geometry.Vector;

let player;
let walls = [];
let blocks = [];


class Wall extends SlowEngine.GameObjects.GameObject {
    constructor(position, size) {
        super();
        this.addComponent(SlowEngine.GameObjects.Components.SpriteRenderer);
        this.addComponent(SlowEngine.GameObjects.Components.BoxCollider);
        this.getComponent("Transform").position = position;
        this.getComponent("Transform").size = size;
    }

    run() {
        this.runComponents();
    }
}


class Block extends SlowEngine.GameObjects.GameObject {
    constructor(position, size) {
        super();
        this.addComponent(SlowEngine.GameObjects.Components.SpriteRenderer);
        this.addComponent(SlowEngine.GameObjects.Components.BoxCollider);
        this.addComponent(SlowEngine.GameObjects.Components.RigidBody);
        this.getComponent("Transform").position = position;
        this.getComponent("Transform").size = size;
    }

    applyGravity() {
        this.getComponent("RigidBody").velocity.y -= 9.8 * SlowEngine.Clock.getDeltaTime();
    }

    run() {
        this.runComponents();
        // this.applyGravity();
    }
}


function setup() {
    player = new Player();
    
    blocks = [
    ];

    walls = [
        // new Wall(new Vector(0, -2), new Vector(31, 1)),
        new Wall(new Vector(8, 0), new Vector(1, 3)),
        new Wall(new Vector(-8, 0), new Vector(1, 3)),
    ];
}


function main() {
    SlowEngine.update();
    SlowEngine.Display.clear();
    
    player.run();

    if (SlowEngine.Mouse.isJustReleased(0)) {
        blocks.push(new Block(SlowEngine.Mouse.getGamePosition(), new Vector(1, 1)))
    }

    player.getComponent("BoxCollider").runCollisions(blocks.concat(walls));

    for (let block of blocks) {
        block.getComponent("BoxCollider").runCollisions(walls.concat(blocks));
    }

    for (let wall of walls) {
        wall.run();
    }

    for (let block of blocks) {
        block.run();
    }

    // for (let obj of allObjects) {
        // obj.getComponent("BoxCollider").runCollisions(allObjects);
    // }
}


export {
    setup,
    main,
}