import {Vector} from "../../geometry/index.js";

/** Collider for boxy collisions */
class BoxCollider {

    // Attributes
    name = "BoxCollider";
    parent;

    /** 
     * Create the collider
     * @param {GameObject} parent - parent object
     */
    constructor(parent) {
        this.parent = parent;
    }

    run() {
    }

    /**
     * Detect and if needed, resolve the collisions between this and all of the gameObjects
     * all gameObjects must have box colliders
     * @param {Array} gameObjects
     * @returns {Array} gameObjects that this is touching
     */
    runCollisions(gameObjects) {
        let collisions = [];
        for (let object of gameObjects) {
            if (this.runCollision(object)) {
                collisions.push(object);
            }
        }
        return collisions;
    }

    /**
     * Detect and if needed, resolve the collision between this and gameObject
     * gameObject must have a box collider
     * @param {GameObject} gameObject 
     * @returns {Boolean} whether there was a collision
     */
    runCollision(gameObject) {
        let boxCollider = gameObject.getComponent("BoxCollider");
        let overlap = this.getOverlap(boxCollider);
        if (overlap.getArea() > 0) {
            this.resolveCollision(boxCollider);
            return true;
        }
        return false;
    }

    /**
     * Assuming there has been a collision between this and other, resolve it
     * @param {BoxCollider} other 
     */
    resolveCollision(other) {
        let thisRigidBody = this.parent.getComponent("RigidBody");
        let otherRigidBody = other.parent.getComponent("RigidBody");
        if (!thisRigidBody && !otherRigidBody) {
            // No rigid bodies
            console.log("Cannot resolve collision between two objects without rigidbodies.");
        } else if (thisRigidBody && !otherRigidBody) {
            // this has rigid body, other doesn't
            this.resolveSingleRigidBodyCollision(other);
        } else if (!thisRigidBody && otherRigidBody) {
            // other has rigid body, this doesn't
            other.resolveCollision(this);
        } else {
            // Both have rigid bodies
            console.log("Cannot yet handle two rigid body collisions.");
        }
    }

    /**
     * Resolve the collision
     * Assuming other and this have collided, and others parent does not have a rigid body
     * @param {BoxCollider} other - collider that has collided with this
     */
    resolveSingleRigidBodyCollision(other) {
        let resolution = this.getPositionResolution(other);
        this.parent.getComponent("Transform").position = this.parent.getComponent("Transform").position.plus(resolution);

        let velocity = this.parent.getComponent("RigidBody").velocity;
        if (resolution.x) {
            velocity.x = 0;
        }
        if (resolution.y) {
            velocity.y = 0;
        }
    }

    /**
     * Get the position resolution for the collision between this (w/ rigidbody) and other (/wo rigidbody)
     * @param {BoxCollider} other 
     * @returns {Vector} position resolution - add to this position to resolve collision
     */
    getPositionResolution(other) {
        let velocity = this.parent.getComponent("RigidBody").velocity;
        let overlap = this.getOverlap(other);
        let horizontalResolution = new Vector(-overlap.x * Math.sign(velocity.x), 0);
        let verticalResolution = new Vector(0, -overlap.y * Math.sign(velocity.y));

        let resolution;

        if (horizontalResolution.getLength() == 0) {
            resolution = verticalResolution;
        } else if (verticalResolution.getLength() == 0) {
            resolution = horizontalResolution;
        } else if (horizontalResolution.getLength() < verticalResolution.getLength()) {
            resolution = horizontalResolution;
        } else {
            resolution = verticalResolution;
        }

        return resolution;
    }

    /**
     * Get the overlap of this with other - other must be a box collider
     * @param {BoxCollider} other - other collider to check overlap with this
     * @returns {Vector} Overlap size
     */
    getOverlap(other) {
        let otherTransform = other.parent.getComponent("Transform");
        let thisTransform = this.parent.getComponent("Transform");
        return getBoxOverlap(thisTransform, otherTransform);
    }
}


/**
 * Get the overlap of the two transform objects
 * @param {Transform} transform1 
 * @param {Transform} transform2 
 * @returns {Vector} absolute overlap
 */
function getBoxOverlap(transform1, transform2) {
    let thisTransform = transform1;
    let otherTransform = transform2;

    let left = Math.min(thisTransform.position.x + thisTransform.size.x / 2, otherTransform.position.x + otherTransform.size.x / 2);
    let right = Math.max(thisTransform.position.x - thisTransform.size.x / 2, otherTransform.position.x - otherTransform.size.x / 2);
    let xOverlap = Math.max(0, left - right);

    let top = Math.min(thisTransform.position.y + thisTransform.size.y / 2, otherTransform.position.y + otherTransform.size.y / 2);
    let bottom = Math.max(thisTransform.position.y - thisTransform.size.y / 2, otherTransform.position.y - otherTransform.size.y / 2);
    let yOverlap = Math.max(0, top - bottom);

    let overlap = new Vector(xOverlap, yOverlap);
    return overlap;
}


export {BoxCollider}