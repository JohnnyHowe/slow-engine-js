import allObjects from "./gameObjectList.js";

export default function updateObjects() {
    for (let object of allObjects) {
        for (let key of Object.keys(object.components)) {
            object.components[key].run();
        }
    }
}