import Vector from "./geometry/vector.js";
import Line from "./geometry/line.js";

/** SAT COLLIDER 
 * VERY MUCH UNFINISHED
 * I AM TOO LAZY TO GET MOMENTUM IN SO AM GOING TO BOX COLLISION FOR A WHILE.
 */


export default class SATCollider {
    constructor() {
        this.pos = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.cornerOffsets = [new Vector(0, 0)]; 
    }

    capVelocity(maxVelocity) {
        this.velocity.x = Math.min(Math.max(-maxVelocity.x, this.velocity.x), maxVelocity.x);
        this.velocity.y = Math.min(Math.max(-maxVelocity.y, this.velocity.y), maxVelocity.y);
    }

    runCollisions(objects, engine) {
        /** If this has collided with objects, fix them all.
         * This does not run collisions between the objects in the objects list.
         */
        // console.log(this.velocity)
        for (let object of objects) {
            this._runCollision(object, engine);
        }
    }

    _runCollision(other, engine) {
        /** If this and other are collided, fix it and return true, otherwise return false.  */
        let collisionVector = this._getCollisionLine(other);
        if (!(collisionVector.x == 0 && collisionVector.y == 0)) {

            // Momentum in direction of collision
            let thisMomentum = collisionVector.multiplied(this.mass);
            let otherMomentum = collisionVector.multiplied(other.mass);
            let totalMomentum = thisMomentum.plus(otherMomentum);

            let totalMass = this.mass + other.mass;
            let velocityChange = totalMomentum.divided(totalMass).divided(engine.clock.getdtime());

            this.pos = this.pos.plus(totalMomentum.multiplied(0.5 * this.mass / totalMass));
            other.pos = other.pos.minus(totalMomentum.multiplied(0.5 * other.mass / totalMass));

            this.velocity = this.velocity.plus(velocityChange.multiplied(this.mass / totalMass));
            other.velocity = other.velocity.minus(velocityChange.multiplied(other.mass / totalMass));
        }
    }

    _getSpeedInDir(axis) {
        /** Return the speed of this in the direction of axis.
         * Found by the projection of the velocity vector onto axis.
        */
       return this.velocity.getProjectionOnto(axis);
    }

    _getCollisionLine(other) {
        let minOverlap;
        let minAxis;
        let isOverlapped = true;

        for (let axis of this._getAxes(other)) {
            let thisProj = this._getAxisProjection(axis);
            let otherProj = other._getAxisProjection(axis);
            let overlap = this._getProjectionOverlap(thisProj, otherProj);

            if (isLeft(overlap.end, overlap.start)) {
                // engine.drawer.drawGameLine(overlap, "#00a", 0.04);
            } else {
                // engine.drawer.drawGameLine(overlap, "#a00", 0.04);
                isOverlapped = false;
                // return new Vector(0, 0)
            }
            if (minOverlap == null || overlap.getLength() < minOverlap.getLength()) {
                minOverlap = overlap;
                minAxis = axis;
            }
            // engine.drawer.drawGameLine(thisProj, "#a00", 0.02);
            // engine.drawer.drawGameLine(otherProj, "#0a0", 0.02);
        }

        let thisProjCentre = this._getAxisProjection(minAxis).getCentrePos();
        let otherProjCentre = other._getAxisProjection(minAxis).getCentrePos();
        let centreDifference = new Vector(thisProjCentre.x - otherProjCentre.x,
            thisProjCentre.y - otherProjCentre.y)

        if (isOverlapped) {
            return centreDifference.getUnit().multiplied(Math.abs(minOverlap.getLength()));
        } else {
            return new Vector(0, 0);
        }
    }

    _getProjectionOverlap(proj1, proj2) {
        /** Return the overlap of the lines proj1 and proj2 as a line. */
        return new Line(getLeftMost(proj1.end, proj2.end), getRightMost(proj1.start, proj2.start));
    }

    _getAxisProjection(axis) {
        /** Return the projection of this onto axis. */
        let projLine = new Line();
        for (let corner of this.getCorners()) {
            let proj = corner.getProjectionOnto(axis);
            if (projLine.start == null) {
                projLine.start = proj;
                projLine.end = proj;
            }
            projLine.start = getLeftMost(projLine.start, proj);
            projLine.end = getRightMost(projLine.end, proj);
        }
        return projLine;
    }

    _getAxes(other) {
        /** Return all the projection axes (from this and other) */
        let usedSlopes = [];
        let axes = [];
        for (let edge of this.getEdges().concat(other.getEdges())) {
            let axis = this._getAxis(edge);
            let slope = axis.y / axis.x;
            // if (!(slope in usedSlopes)) {
            axes.push(axis);
            usedSlopes.push(slope);
            // }
        }
        return axes;
    }
    _getAxis(edge) {
        let normal = getVectorNormal(edge.getComponentLength().getUnit());
        return normal;

        let axis = new Vector(0, 0);
        if (normal.x < 0 && normal.y < 0) {
            axis.x = -normal.x;
            axis.y = -normal.y;
        } else if (normal.y < 0) {
            axis.x = -normal.y;
            axis.y = normal.x;
        } else if (normal.y == 0) {
            axis.x = -normal.x;
            axis.y = normal.y;
        } else {
            axis = normal;
        }
        return axis;
    }

}


function isLeft(pos1, pos2) {
    /** Return whether pos1 is left of pos2.
     * If both have the same x value, return whether pos1 is lower than pos2. */
    return (pos1.x < pos2.x || (pos1.x == pos2.x && pos1.y < pos2.y));
}


function getLeftMost(pos1, pos2) {
    /** Return the leftmost position (according to isLeft). */
    if (isLeft(pos1, pos2)) {
        return pos1;
    } else {
        return pos2;
    }
}


function getRightMost(pos1, pos2) {
    /** Return the rightmost position (according to isLeft). */
    if (!isLeft(pos1, pos2)) {
        return pos1;
    } else {
        return pos2;
    }
}


function getVectorNormal(vector) {
    /** Return the normal to the vector. */
    return new Vector(vector.y, -vector.x)
}