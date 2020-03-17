import Vector from "../slowEngine/geometry/vector.js"
import WorldObject from "../slowEngine/worldObject.js";


export default class Block extends WorldObject {
    constructor(pos) {
        super();
        this.pos = pos;
        this.cornerOffsets = [new Vector(0.5, 0.5), new Vector(0.5, -0.5), new Vector(-0.5, -0.5), new Vector(-0.5, 0.5)];
        this.mass = Infinity;
    }
}

