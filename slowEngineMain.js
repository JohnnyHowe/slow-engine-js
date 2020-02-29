import Engine from "./slowEngine/engine.js";
import main from "./source/main.js";


let engine = new Engine();
function loop() {
    engine.update();
    main(engine);
    requestAnimationFrame(loop);
};

loop();