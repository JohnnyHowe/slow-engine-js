import * as Geometry from "../../geometry/index.js";


/**
 * SlowEngine.GameObjects.Components.Transform - Transform component for game objects.
 * Contains a position and size, defaulting to Vector(0, 0) and Vector(1, 1) respectively.
 */
class Transform {

    // Attributes
    name = "Transform";
    parent;
    position;
    size;

    /**
     * Create the component - set the position (Vector(0, 0)) and size (Vector(1, 1))
     * @hideconstructor
     */
    constructor(parent) {
        this.parent = parent;
        this.position = new Geometry.Vector(0, 0);
        this.size = new Geometry.Vector(1, 1);
    }

    /**
     * Placeholder
     */
    run() {
    }
}


export {Transform}