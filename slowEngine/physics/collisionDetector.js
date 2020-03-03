import Pos from "../geometry/pos.js";
import Line from "../geometry/line.js";
import Rect from "../geometry/rect.js";


export default class CollisionDetetor {
    constructor(parentRef) {
        this.parentRef = parentRef;
        this.pos = new Pos(0, 0);
        this.corners = [new Pos(0, 0)];
    }
    isOverlapping(engine, other) {
        let overlapping = true;
        for (let axis of this._getAxes(other)) {
            if (!(this._checkAxis(engine, axis, other))) {
                overlapping = false
            }
        }
        return overlapping;
    }
    collisionGradient(engine, other) {
        let minOverlap;
        let minAxis;
        for (let axis of this._getAxes(other)) {
            // engine.draw.drawGameLine(new Line(new Pos(0, 0), axis.getUnit()), "#0a0", 0.01);
            let overlap = this._getAxisOverlap(engine, axis, other)
            if (minOverlap == null || minOverlap > overlap) {
                minOverlap = overlap;
                minAxis = axis;
            }
        }

        if (minAxis) {
            let extremes = this._getAxisExtremes(minAxis);
            let avg = new Pos((extremes.start.x + extremes.end.x) / 2, (extremes.start.y + extremes.end.y) / 2)
            minAxis = avg.getUnit();
        }

        return minAxis;
    }
    _getGradients(other) {
        let edges = this.getEdges().concat(other.getEdges())
        let used = [];
        let unique = [];
        for (let edge of edges) {
            let dx = edge.start.x - edge.end.x;
            let dy = edge.start.y - edge.end.y;
            let slope = dy / dx;
            if (!(slope in used)) {
                used.push(slope);
                unique.push(new Pos(dx, dy));
            }
        }
        return unique;
    }
    _getAxes(other) {
        let axes = [];
        let gradients = this._getGradients(other);
        for (let gradient of gradients) {
            
            axes.push(this._getFixedGradientQuadrant(gradient))
            axes.push(this._getFixedGradientQuadrant(getFlipped(gradient)));
        }
        return axes;
    }
    _getFixedGradientQuadrant(gradient) {
        gradient = gradient.copy();
        if (gradient.y <= 0) {
            gradient.x = -gradient.x;
            gradient.y = -gradient.y;
        }
        if (gradient.x <= 0) {
            gradient.x = -gradient.x;
            gradient.y = -gradient.y;
        }
        return gradient;
    }
    _getAxis(gradientLine) {
        return new Pos(gradientLine.end.x - gradientLine.start.x, gradientLine.end.y - gradientLine.start.y);
    }
    _checkAxis(engine, axis, other) {
        let overlap = this._getAxisOverlap(engine, axis, other);
    }
    _getAxisOverlap(engine, axis, other) {
        let thisRange = this._getAxisExtremes(axis);
        let otherRange = other._getAxisExtremes(axis);

        let min = getRightMost(otherRange.start, thisRange.start);
        let max = getLeftMost(otherRange.end, thisRange.end);

        let distance = Math.sqrt((min.x - max.x) ** 2 + (min.y - max.y) ** 2);

        if (!isLeft(min, max)) {
            distance = 0;
        }

        return distance;
    }
    _getAxisExtremes(axis) {
        let range = new Line();
        for (let corner of this.getCorners()) {
            let proj = this._getPointVectorProjection(axis, corner) 
            range.start = getLeftMost(range.start, proj);
            range.end = getRightMost(range.end, proj);
        }
        return range
    }
    
    _getPointVectorProjection(axis, point) {
        let offset = new Pos(0, 0);
        let a = axis;

        let projLen = this._getProjLength(axis, point)
        let proj = new Pos(offset.x + a.x * projLen, offset.y + a.y * projLen);

        return proj;
    }
    _getProjLength(axis, point) {
        let a = axis;
        let b = point;

        let aDotb = a.x * b.x + a.y * b.y;
        let aLen = Math.sqrt(a.x * a.x + a.y * a.y);

        let projLen = aDotb / (aLen * aLen)
        return projLen;
    }
}


function isLeft(pos1, pos2) {
    return pos1.x < pos2.x || (pos1.x == pos2.x && pos1.y < pos2.y)
}


function getLeftMost(pos1, pos2) {
    /** Return the pos that is leftmost, if the x is the same, return the top. */
    if (pos1 == null) {
        return pos2;
    } else if (pos2 == null) {
        return pos1;
    }

    if (isLeft(pos1, pos2)) {
        return pos1;
    } else {
        return pos2;
    }
}


function getRightMost(pos1, pos2) {
    /** Return the pos that is rightmost, if the x is the same, return the bottom. */
    if (pos1 == null) {
        return pos2;
    } else if (pos2 == null) {
        return pos1;
    }

    if (isLeft(pos1, pos2)) {
        return pos2;
    } else {
        return pos1;
    }
}

function getFlipped(axis) {
    return new Pos(axis.y, -axis.x)
}