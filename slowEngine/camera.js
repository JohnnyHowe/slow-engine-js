import Vector from "./geometry/vector.js";

export default class Camera {
    constructor() {
        this.pos = new Vector(0, 0);
        this.pixelsPerUnit = 100;
    }
}