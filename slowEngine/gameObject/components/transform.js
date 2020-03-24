import Geometry from "../../geometry/main.js";

/** Contains basic transform info:
 * Position, Size, (eventually rotation)
 */
export default class Transform {
    // default attributes.
    name = "Transform";
    parent;
    position = new Geometry.Vector(0, 0);
    size = new Geometry.Vector(0, 0);
    
    constructor(parent) {
        this.parent = parent;
    }

    run() {
    }

    toString() {
        return "Transform(position=(" + this.position.valuesToString() + "), size=(" + this.size.valuesToString() + ")";
    }
}