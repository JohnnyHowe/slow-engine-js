import {Vector} from "../../geometry/index.js";
import SlowEngine from "../../index.js";

/** Adds physics mechanics to the object */
class RigidBody {

    // Attributes
    name = "RigidBody";
    parent;
    velocity;
    maxVelocity;    // A max velocity component-wise
    maxSpeed;       // max speed
    mass;

    /** 
     * Construct the rigid body
     * Default is mass of 1 and zero velocity (vector)
     */
    constructor(parent) {
        this.parent = parent;
        this.velocity = new Vector(0, 0);
        this.maxVelocity = new Vector(Infinity, Infinity);
        this.maxSpeed = Infinity
        this.mass = 1;
    }

    /**
     * Get the momentum of the rigidbody
     * @returns {Vector} momentum
     */
    getMomentum() {
        return this.velocity.multiplied(this.mass);
    }

    /**
     * Apply the max speed cap
     */
    capSpeed() {
        let scale = this.velocity.getLength() / this.maxSpeed;
        if (scale > 1) {
            this.velocity = this.velocity.divided(scale);
        }
    }

    /**
     * Apply the max velocity cap.
     */
    capVelocity() {
        this.velocity.x = Math.min(Math.max(-this.maxVelocity.x, this.velocity.x), this.maxVelocity.x);
        this.velocity.y = Math.min(Math.max(-this.maxVelocity.y, this.velocity.y), this.maxVelocity.y);
    }

    /**
     * Main run function,
     * is called once per frame
     * Applies the velocity
     */
    run() {
        this.capVelocity();
        this.capSpeed();
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