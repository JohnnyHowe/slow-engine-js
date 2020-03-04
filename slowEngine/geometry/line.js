import Vector from "./vector.js";


export default class Line {
    constructor(start, end) {
        this.start = start,
        this.end = end;
    }
    getLength() {
        /** Return the length of the line from start to end. */
        return Math.sqrt((this.start.x - this.end.x) ** 2 + (this.start.y - this.end.y) ** 2);
    }
    getComponentLength() {
        /** Return the length of the line component-wise in a vector. */
        return (new Vector(this.start.x - this.end.x, this.start.y - this.end.y)).getUnit();
    }
    getCentrePos() {
        /** Return the centre position. */
        return new Vector((this.start.x + this.end.x) / 2, (this.start.y + this.end.y) / 2);
    }
}