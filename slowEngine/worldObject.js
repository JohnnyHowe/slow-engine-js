import Collider from "./physics/collider.js";
import Line from "./geometry/line.js";
const DEFAULT_OUTLINE_COLOR = "#000";


export default class WorldObject extends Collider {
    constructor(pos, cornerOffsets) {
        super();
        this.pos = pos
        this.corners = cornerOffsets;
    }
    drawOutline(engine, color=DEFAULT_OUTLINE_COLOR) {
        for (let line of this.getEdges()) {
            engine.draw.drawGameLine(line, color, 0.01);
        }
    }
    draw(engine, color=DEFAULT_OUTLINE_COLOR) {
        this.drawOutline(engine, color);
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
            lines.push(new Line(start, end));
        }
        return lines;
    }
}