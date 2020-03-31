import SlowEngine from "../slowEngine/index.js";
import {Wall} from "./wall.js";

let Vector = SlowEngine.Geometry.Vector;


function getWalls() {
    let size = new Vector(20, 15);
    return [
        new Wall(new Vector(0, size.y / 2), new Vector(size.x, 1)),
        new Wall(new Vector(0, -size.y / 2), new Vector(size.x, 1)),
        new Wall(new Vector(size.x / 2, 0), new Vector(1, size.y)),
        new Wall(new Vector(-size.x / 2, 0), new Vector(1, size.y)),
    ]
}


export {getWalls}