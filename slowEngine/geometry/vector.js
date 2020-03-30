
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
     * Get the length of the vector.
     * @returns {number} vector length
     */
    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Return the product of the components of this.
     * If the vector represents a rectange then its the area
     * @returns {number} product of x and y
     */
    getArea() {
        return this.x * this.y;
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

    // ==================================================
    // Linear Algebra
    // ==================================================

    /**
     * Get the dot product of this and other
     * @param {Vector} other 
     * @returns {number} dot product
     */
    getDotProduct(other) {
        return this.x * other.x + this.y * other.y;
    }

    /**
     * Get the length of the projection of this onto other
     * @param {Vector} other 
     */
    getProjectionOntoLength(other) {
        return this.getDotProduct(other) / other.getLength();
    }

    /**
     * Get the vector projection of this onto other
     * @param {Vector} other 
     */
    getProjectionOnto(other) {
        return other.multiplied(this.getProjectionOntoLength(other) / other.getLength())
    }
}


export {Vector};