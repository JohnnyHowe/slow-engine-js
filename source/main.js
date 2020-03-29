import SlowEngine from "../slowEngine/index.js";
import {Player} from "./player.js";


let player;


function setup() {
    player = new Player();
}


function main() {
    SlowEngine.update();
    SlowEngine.Display.clear();
    player.runComponents();
    console.log(SlowEngine.Keyboard.isPressed(" "))
}


export {
    setup,
    main,
}