import WorldObject from "../slowEngine/worldObject.js";
import Vector from "../slowEngine/geometry/vector.js";

import {CHUNKSIZE} from "./chunkHandler.js";


export default class player extends WorldObject {

    constructor() {
        super();
        this.jumpPower = 6;
        this.acceleration = 40;
        this.maxRunSpeed = 10;
        this.controls = {
            "LEFT": "a",
            "RIGHT": "d",
            "JUMP": " ",
        }
        this.cornerOffsets = [new Vector(-0.5, 1), new Vector(0.5, 1), new Vector(0.5, -1), new Vector(-0.5, -1)];
        this.pos = new Vector(0, -1);
        this.collisionVectors = [];
    }

    update(engine) {
        this.runInput(engine);
        this.jumpInput(engine);
        this.applyVelocity(engine);
        this.applyGravity(engine);
    }

    applyVelocity(engine) {
        this.pos.offsetBy(this.velocity.multiplied(engine.clock.getdtime()));
    }

    capRunSpeed() {
        this.velocity.x = Math.min(this.maxRunSpeed, Math.max(-this.maxRunSpeed, this.velocity.x));
    }

    getCurrentChunkPos() {
        let offset = new Vector(CHUNKSIZE / 2, CHUNKSIZE / 2);
        let thisPos = this.getPos().plus(offset);
        let pos = new Vector(
            Math.floor(thisPos.x / CHUNKSIZE),
            Math.floor(thisPos.y / CHUNKSIZE),
        )
        return pos;
    }

    isOnGround() {
        for (let vector of this.collisionVectors) {
            if (vector.y > 0) {
                return true;
            }
        }
    }

    applyGravity(engine) {
        this.velocity.y -= 9.8 * engine.clock.getdtime();
    }

    jumpInput(engine) {
        if (engine.keyInput.isPressed(this.controls["JUMP"]) && this.isOnGround()) {
            this.velocity.y = this.jumpPower;
        }
    }

    runInput(engine) {
        let change = new Vector(0, 0);
        if (engine.keyInput.isPressed(this.controls["LEFT"])) {
            change.x -= 1;
        }
        if (engine.keyInput.isPressed(this.controls["RIGHT"])) {
            change.x += 1;
        }
        if (change.x == 0 && this.isOnGround()) {
            this.slowDown(engine)
        }
        this.velocity.offsetBy(change.multiplied(engine.clock.getdtime() * this.acceleration));
        this.capRunSpeed()
    }

    slowDown(engine) {
        let initialSign = Math.sign(this.velocity.x)
        this.velocity.x -= this.acceleration * initialSign * engine.clock.getdtime();
        if (initialSign != Math.sign(this.velocity.x)) {
            this.velocity.x = 0;
        }
    }
}