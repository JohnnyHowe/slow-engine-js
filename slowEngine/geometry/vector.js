
export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Helper methods
    getTuple() {
        /** Return the tuple representation of this. (this.x this.y). */
        return [this.x, this.y];
    }
    copy() {
        /** Return a copy of this. */
        return new Vector(this.x, this.y);
    }
    offsetBy(pos) {
        /** Add pos component wise to this. */
        this.x += pos.x;
        this.y += pos.y;
    }

    // Vector math
    getUnit() {
        let size = Math.sqrt(this.x ** 2 + this.y ** 2);
        return new Vector(this.x / size, this.y / size);
    }
    getOriginLength() {
        /** Return the length from (0, 0) to this. */
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    getDotProduct(other) {
        /** Return the dot product of this and other. */
        return this.x * other.x + this.y * other.y
    }
    getProjectionOnto(vector) {
        /** Return the position of the projection of this onto vector. */
        let projLen = (vector.getDotProduct(this) / vector.getOriginLength() ** 2);
        return new Vector(vector.x * projLen, vector.y * projLen);
    }

    // Position math
    plus(pos) {
        /** Return a new pos where the components are the product of this and pos. */
        return new Vector(this.x + pos.x, this.y + pos.y);
    }
    minus(pos) {
        /** Return a new pos where the components are the difference of this and pos. */
        return new Vector(this.x - pos.x, this.y - pos.y);
    }
    multiplied(n) {
        /** Return a new vector with the components of this multiplied by n. */
        return new Vector(this.x * n, this.y * n);
    }
    divided(n) {
        /** Return a new vector with the components of this divided by n. */
        return new Vector(this.x / n, this.y / n);
    }
}