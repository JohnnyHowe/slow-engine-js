import WorldObject from "../slowEngine/worldObject.js";
import Vector from "../slowEngine/geometry/vector.js"
import Player from "./player.js";
// import Rect from "../slowEngine/geometry/rect.js";
// import Line from "../slowEngine/geometry/line.js";


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
block.mass = 5;

let groundWidth = 5
let groundDepth = 1
let ground = new WorldObject(new Vector(0, -3), [new Vector(-groundWidth, groundDepth), new Vector(groundWidth, groundDepth),
    new Vector(groundWidth, -groundDepth), new Vector(-groundWidth, -groundDepth)]);
ground.mass = Infinity;


function update(engine) {
    player.move(engine);
    block.move(engine);

    // let maxVelocity = (new Vector(1, 1)).multiplied(0.5);
    // player.capVelocity(maxVelocity);
    // block.capVelocity(maxVelocity);

    player.runCollisions([block], engine)
    // player.runCollisions([ground, block]);
    // block.runCollisions([ground]);
};


function show(engine) {
    player.draw(engine, "#a00");
    block.draw(engine);
    // ground.draw(engine)
}

export default function main(engine) {
    update(engine);
    show(engine);
}