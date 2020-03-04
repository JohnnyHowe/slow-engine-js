import WorldObject from "../slowEngine/worldObject.js";
import Vector from "../slowEngine/geometry/vector.js"
// import Rect from "../slowEngine/geometry/rect.js";
// import Line from "../slowEngine/geometry/line.js";


class Player extends WorldObject {
    constructor() {
        // super(new Vector(-2, 0), [new Vector(-1, 1), new Vector(1, 1), new Vector(1, -1), new Vector(-1, -1)]);
        // super(new Vector(-3, 0), [new Vector(-0.5, 1), new Vector(1, 1), new Vector(1.5, 0), new Vector(1, -1), new Vector(-1, -1)]);
        super(new Vector(0, 3), [new Vector(0, 1), new Vector(1, 0), new Vector(0, -1), new Vector(-1, 0)])
        this.controls = {
            left: "a",
            right: "d",
            up: "w",
            down: "s",
        };
    }
    move(engine) {
        let speed = engine.clock.getdtime() * 2;
        if (engine.keyInput.isPressed(this.controls.up)) {
            this.pos.y += speed;
        }
        if (engine.keyInput.isPressed(this.controls.down)) {
            this.pos.y -= speed;
        }
        if (engine.keyInput.isPressed(this.controls.left)) {
            this.pos.x -= speed;
        }
        if (engine.keyInput.isPressed(this.controls.right)) {
            this.pos.x += speed;
        }
    }
}

let squareSize = 0.5;

let player = new Player();

let block = new Player();
block.pos = new Vector(0, 0);
block.cornerOffsets = [
    new Vector(-squareSize, squareSize), new Vector(squareSize, squareSize),
    new Vector(squareSize, -squareSize), new Vector(-squareSize, -squareSize)
];
block.controls = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
}

let groundWidth = 5
let groundDepth = 1
let ground = new WorldObject(new Vector(0, -3), [new Vector(-groundWidth, groundDepth), new Vector(groundWidth, groundDepth),
    new Vector(groundWidth, -groundDepth), new Vector(-groundWidth, -groundDepth)]);
ground.mass = Infinity;


function update(engine) {
    // engine.camera.pixelsPerUnit = 200;
    // engine.camera.pos.y = 1;
    player.move(engine);
    block.move(engine);
};


function show(engine) {
    player.draw(engine, "#a00");
    block.draw(engine);
    ground.draw(engine)
}

export {
    update,
    show,
}