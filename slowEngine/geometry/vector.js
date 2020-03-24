

/**
 * Class to represent vector
 */
export default class Vector {
    // default attributes
    x = 0;
    y = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * @returns a string in the form "Vector(x, y)
     */
    toString() {
        return "Vector(" + this.valuesToString() + ")";
    }
    /**
     * @returns a string in the form "x, y";
     */
    valuesToString() {
        return this.x.toString() + ", " + this.y.toString();
    }

}