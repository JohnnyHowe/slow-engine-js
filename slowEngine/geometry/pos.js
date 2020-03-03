
export default class Pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getTuple() {
        return (this.x, this.y);
    }
    copy() {
        return new Pos(this.x, this.y);
    }
    plus(pos) {
        /** Return a new pos where the components are the product of this and pos. */
        return new Pos(this.x + pos.x, this.y + pos.y);
    }
    minus(pos) {
        /** Return a new pos where the components are the difference of this and pos. */
        return new Pos(this.x - pos.x, this.y - pos.y);
    }
    offsetBy(pos) {
        /** Add pos component wise to this. */
        this.x += pos.x;
        this.y += pos.y;
    }
    getUnit() {
        let size = Math.sqrt(this.x ** 2 + this.y ** 2);
        return new Pos(this.x / size, this.y / size);
    }
}