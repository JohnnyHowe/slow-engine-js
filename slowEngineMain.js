import Engine from "./slowEngine/engine.js";
import main from "./source/main.js";


let engine = new Engine();
function loop() {
    /** Main engine/game loop - this calls the users code. */
    engine.update();
    main(engine);
    requestAnimationFrame(loop);
};

loop();