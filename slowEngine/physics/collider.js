// import collisionFixer from "./collisionFixer.js";
import Vector from "../geometry/vector.js";
import Line from "../geometry/line.js";
// import Rect from "../geometry/rect.js";


export default class Collider {
    constructor() {
        this.pos = new Vector(0, 0);
        this.cornerOffsets = [new Vector(0, 0)]; 
    }

    runCollision(other) {
        let collisionLine = this._getCollisionLine(other);
        let thisMult;
        let otherMult;
        if (other.mass.toString() == "Infinity" && this.mass.toString() == "Infinity") {
            console.log("WARNING TWO INFINITE MASS OBJECTS COLLIDED");
            thisMult = 0;
            otherMult = 0;
        } else if (other.mass == Infinity) {
            thisMult = 1;
            otherMult = 0;
        } else if (this.mass == Infinity) {
            thisMult = 0;
            otherMult = 1;
        } else {
            let totalMass = this.mass + other.mass;
            thisMult = this.mass / totalMass;
            otherMult = other.mass / totalMass;
        }
        if (thisMult != 0) {
            this.pos.x += collisionLine.x * thisMult;
            this.pos.y += collisionLine.y * thisMult;
        }
        if (otherMult != 0) {
            other.pos.x -= collisionLine.x * otherMult;
            other.pos.y -= collisionLine.y * otherMult;
        }
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