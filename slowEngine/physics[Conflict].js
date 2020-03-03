import Pos from "./geometry/pos.js";
import Rect from "./geometry/rect.js";


export default class BoxCollider {
    constructor(parentRef) {
        this.parentRef = parentRef;
        this.pos = new Pos(0, 0);
        this.corners = [new Pos(0, 0)];
    }
    getCorners() {
        let corners = [];
        for (let corner of this.corners) {
            corners.push(corner.plus(this.pos));
        }
        return corners;
    }
    getEdges() {
        let lines = [];
        for (let index = 0; index < this.corners.length; index++) {
            let start = this.corners[index].plus(this.pos);
            let end = this.corners[(index + 1) % this.corners.length].plus(this.pos);
            let line = [start, end];
            lines.push(line);
        }
        return lines;
    }
    isOverlapping(engine, other) {
        let overlapping = true;
        let gradients = this._getGradients();
        for (let gradient of gradients) {
            let axis = this._getAxis(gradient);
            if (!(this._checkAxis(engine, axis, other))) {
                overlapping = false
            }
        }
        return overlapping;
    }
    _getGradients() {
        let edges = this.getEdges()
        let used = [];
        let unique = [];
        for (let edge of edges) {
            let dx = edge[0].x - edge[1].x
            let dy = edge[0].y - edge[1].y
            let slope = dy / dx;
            if (!(slope in used)) {
                used.push(slope);
                unique.push(edge);
                unique.push(this._getFlipped(edge));
            }
        }
        return unique;
    }
    _getFlipped(edge) {
        return [new Pos(edge[0].y, edge[0].x), new Pos(edge[1].y, edge[1].x)];
    }
    _getAxis(gradientLine) {
        return [new Pos(0, 0), new Pos(gradientLine[1].x - gradientLine[0].x, gradientLine[1].y - gradientLine[0].y)];
    }
    _checkAxis(engine, axisLine, other) {
        let thisLeft;
        let thisRight;
        let otherLeft;
        let otherRight;

        for (let corner of this.getCorners()) {
            let proj = this._getPointLineProjection(axisLine, corner) 
            thisLeft = getLeftMost(thisLeft, proj);
            thisRight = getRightMost(thisRight, proj);
        }
        for (let corner of other.getCorners()) {
            let proj = this._getPointLineProjection(axisLine, corner) 
            otherLeft = getLeftMost(otherLeft, proj);
            otherRight = getRightMost(otherRight, proj);
            // engine.draw.drawGameRect(new Rect(proj.x, proj.y, 0.1, 0.1));
        }
        engine.draw.drawGameLine(thisLeft, thisRight, "#0a0", 0.05);
        engine.draw.drawGameLine(otherLeft, otherRight, "#00a", 0.02);

        let inDomain = otherLeft.x <= thisRight.x && thisLeft.x <= otherRight.x;
        if (thisLeft.x == thisRight.x && otherLeft.x == otherRight.x && otherLeft.x == thisLeft.x) {
            let inRange = thisLeft.y <= otherRight.y && thisRight.y >= otherLeft.y;
            return inRange
        } else {
            return inDomain;
        }
    }
    _getPointLineProjection(line, point) {
        let offset = line[0];
        let a = line[1].minus(offset);

        let projLen = this._getProjLength(line, point)
        let proj = new Pos(offset.x + a.x * projLen, offset.y + a.y * projLen);

        return proj;
    }
    _getProjLength(line, point) {
        let offset = line[0];

        let a = line[1].minus(offset);
        let b = point.minus(offset);

        let aDotb = a.x * b.x + a.y * b.y;
        let aLen = Math.sqrt(a.x * a.x + a.y * a.y);

        let projLen = aDotb / (aLen * aLen)
        return projLen;
    }
}


function getLeftMost(pos1, pos2) {
    /** Return the pos that is leftmost, if the x is the same, return the top. */
    if (pos1 == null) {
        return pos2;
    } else if (pos2 == null) {
        return pos1;
    }

    if (pos1.x < pos2.x || (pos1.x == pos2.x && pos1.y < pos2.y)) {
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

    if (pos1.x < pos2.x || (pos1.x == pos2.x && pos1.y < pos2.y)) {
        return pos2;
    } else {
        return pos1;
    }
}

