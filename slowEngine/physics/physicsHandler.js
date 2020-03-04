import allObjects from "./allObjects.js";


export default class PhysicsHandler {
    constructor() {
    }
    getObjects() {
        return allObjects;
    }
    runCollisions() {
        // Fix this - order of collisions wrong
        for (let object1 of this.getObjects()) {
            for (let object2 of this.getObjects()) {
                if (object1 != object2) {
                    object1.runCollision(object2);
                }
            }
        }
    }
}