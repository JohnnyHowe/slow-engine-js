import Engine from "./slowEngine/engine.js";
import {setUp, main} from "./source/main.js";


let engine = new Engine();
function loop() {
    /** Main engine/game loop - this calls the users code. */
    engine.update();
    main(engine);
    requestAnimationFrame(loop);
};

setUp(engine);
loop();