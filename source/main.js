import SlowEngine from "../slowEngine/index.js";
import {Player} from "./player.js";


let player;


function setup() {
    player = new Player();
}


function main() {
    SlowEngine.update();
    SlowEngine.Display.clear();
    player.run();
}


export {
    setup,
    main,
}