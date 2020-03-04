import Engine from "./slowEngine/engine.js";
import {update, show} from "./source/main.js";
// import {_allObjects} from "./slowEngine/worldObject.js";


let engine = new Engine();
function loop() {
    /** Main engine/game loop - this calls the users code. */
    engine.update();
    update(engine);
    engine.physicsHandler.runCollisions();
    show(engine);
    requestAnimationFrame(loop);
};

loop();