import SlowEngine from "./slowEngine/index.js";
import {setup, main} from "./main.js";


function slowEngineMain() {
    main();
    requestAnimationFrame(slowEngineMain)
}


setup();
slowEngineMain();