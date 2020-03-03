import WorldObject from "../slowEngine/worldObject.js";
import Pos from "../slowEngine/geometry/pos.js"
import Rect from "../slowEngine/geometry/rect.js";
import Line from "../slowEngine/geometry/line.js";


class Player extends WorldObject {
    constructor() {
        // super(new Pos(-2, 0), [new Pos(-1, 1), new Pos(1, 1), new Pos(1, -1), new Pos(-1, -1)]);
        super(new Pos(-3, 0), [new Pos(-0.5, 1), new Pos(1, 1), new Pos(1.5, 0), new Pos(1, -1), new Pos(-1, -1)]);
        // super(new Pos(0, 3), [new Pos(0, 1), new Pos(1, 0), new Pos(0, -1), new Pos(-1, 0)])
        this.controls = {
            left: "a",
            right: "d",
            up: "w",
            down: "s",
        };
    }
    move(engine) {
        let speed = engine.clock.getdtime() * 2;
        if (engine.keys.isPressed(this.controls.up)) {
            this.pos.y += speed;
        }
        if (engine.keys.isPressed(this.controls.down)) {
            this.pos.y -= speed;
        }
        if (engine.keys.isPressed(this.controls.left)) {
            this.pos.x -= speed;
        }
        if (engine.keys.isPressed(this.controls.right)) {
            this.pos.x += speed;
        }
    }
}

let squareSize = 0.5;

let player = new Player();

let block = new Player();
block.pos = new Pos(0, 0);
block.corners = [
    new Pos(-squareSize, squareSize), new Pos(squareSize, squareSize),
    new Pos(squareSize, -squareSize), new Pos(-squareSize, -squareSize)
];
block.controls = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
}

export default function main(engine) {
    // engine.camera.pixelsPerUnit = 200;
    // engine.camera.pos.y = 1;

    player.move(engine);
    block.move(engine);

    player.runCollision(engine, block);

    player.draw(engine, "#a00");
    block.draw(engine);
};