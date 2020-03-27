
/**
 * SlowEngine.Geometry.Vector - Class representing a vector.
*/
class Vector {

    /**
     * Create the vector.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Get a copy of this vector.
     * @returns {Vector} The copy of this vector.
     */
    getCopy() {
        return new Vector(this.x, this.y);
    }

    /**
     * Get the string representation of the vector.
     * In the format "Vector(x, y)".
     * @returns the formatted string.
     */
    toString() {
        return "Vector(" + this.valuesToString() + ")";
    }

    /**
     * Get the string representation of the components of the vector.
     * In the format "x, y".
     * @returns the formatted string.
     */
    valuesToString() {
        return this.x.toString() + ", " + this.y.toString();
    }

    // ==================================================
    // Math
    // ==================================================

    /**
     * Add this to other
     * this and other are unchanged by this function.
     * @param {Vector} vector to add to this.
     * @returns {Vector} vector sum of this and other
     */
    plus(other) {
        return new Vector(this.x + other.x, this.y + other.y)
    }

    /**
     * minus other from this.
     * this and other are unchanged by this function.
     * @param {Vector} vector to subtract from this.
     * @returns {Vector} diffence between this and other
     */
    minus(other) {
        return new Vector(this.x - other.x, this.y - other.y)
    }

    /**
     * Get this multiplied component wise by n.
     * @param {number} n - to multiply this by
     * @returns {Vector} this multiplied by n
     */
    multiplied(n) {
        return new Vector(this.x * n, this.y * n)
    }

    /**
     * Get this divied component wise by n.
     * @param {number} n - to divide this by
     * @returns {Vector} this divided by n
     */
    divided(n) {
        return new Vector(this.x / n, this.y / n)
    }



}


export {Vector};