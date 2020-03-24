import SlowEngine from "./slowEngine/slowEngine.js";
import {setUp, main} from "./source/main.js";


function loop() {
    /** Main engine/game loop - this calls the users code. */
    SlowEngine.GameObjects._updateObjects();
    main();
    requestAnimationFrame(loop);
};

setUp();
loop();
