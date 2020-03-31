import SlowEngine from "../slowEngine/index.js";
import {Level} from "./level.js";

let level;


function setup() {
    level = new Level();
}


function main() {
    SlowEngine.update();
    SlowEngine.Display.clear();
    level.run();    
}


export {
    setup,
    main,
}