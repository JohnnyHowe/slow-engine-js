import SlowEngine from "../slowEngine/index.js";
import {Player} from "./player.js";
import {getWalls} from "./roomGenerator.js";

let Vector = SlowEngine.Geometry.Vector;


class Level {

    constructor() {
        this.walls = getWalls();
        this.player = new Player();
    }

    setWalls(walls) {
        this.walls = walls;
    }

    run() {
        this.player.run();
        this.player.getComponent("BoxCollider").runCollisions(this.walls);

        for (let wall of this.walls) {
            wall.run();
        }
    }
}


export {Level}