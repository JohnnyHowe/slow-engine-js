import Pos from "./pos.js";


export default class Line {
    constructor(start, end) {
        this.start = start,
        this.end = end;
    }
    getLength() {
        return Math.sqrt((this.start.x - this.end.x) ** 2 + (this.start.y - this.end.y) ** 2);
    }
}