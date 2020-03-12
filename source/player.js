import WorldObject from "../slowEngine/worldObject.js";
import Vector from "../slowEngine/geometry/vector.js"


export default class Player extends WorldObject {
    constructor() {
        // super(new Vector(0, 3), [new Vector(-1, 1), new Vector(1, 1), new Vector(1, -1), new Vector(-1, -1)]);
        super(new Vector(-3, 0), [new Vector(-0.5, 1), new Vector(1, 1), new Vector(1.5, 0), new Vector(1, -1), new Vector(-1, -1)]);
        // super(new Vector(0, 3), [new Vector(0, 1), new Vector(1, 0), new Vector(0, -1), new Vector(-1, 0)])
        this.controls = {
            left: "a",
            right: "d",
            up: "w",
            down: "s",
        };
        this.acceleration = 5;
        this.deceleration = this.acceleration;
    }
    move(engine) {
        let change = new Vector(0, 0);
        if (engine.keyInput.isPressed(this.controls.up)) {
            change.y += this.acceleration;
        }
        if (engine.keyInput.isPressed(this.controls.down)) {
            change.y -= this.acceleration;
        }
        if (engine.keyInput.isPressed(this.controls.left)) {
            change.x -= this.acceleration;
        }
        if (engine.keyInput.isPressed(this.controls.right)) {
            change.x += this.acceleration;
        }
        this.velocity.offsetBy(change.multiplied(engine.clock.getdtime()));
        this.pos.offsetBy(this.velocity.multiplied(engine.clock.getdtime()))
    }
}