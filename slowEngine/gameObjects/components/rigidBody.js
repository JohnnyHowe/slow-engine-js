import {Vector} from "../../geometry/index.js";
import SlowEngine from "../../index.js";

/** Adds physics mechanics to the object */
class RigidBody {

    // Attributes
    name = "RigidBody";
    parent;
    velocity;
    mass;

    /** 
     * Construct the rigid body
     * Default is mass of 1 and zero velocity (vector)
     */
    constructor(parent) {
        this.parent = parent;
        this.velocity = new Vector(0, 0);
        this.mass = 1;
    }

    /**
     * Main run function,
     * is called once per frame
     * Applies the velocity
     */
    run() {
        this.applyVelocity()
    }

    /**
     * Apply the velocity to the transform on parent
     */
    applyVelocity() {
        let transform = this.parent.getComponent("Transform");
        transform.position = transform.position.plus(this.velocity.multiplied(SlowEngine.Clock.getDeltaTime()));
    }
}


export {RigidBody}