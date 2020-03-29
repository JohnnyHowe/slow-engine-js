import SlowEngine from "./index.js";
import {setup, main} from "../source/main.js";


function slowEngineMain() {
    main();
    requestAnimationFrame(slowEngineMain)
}


setup();
slowEngineMain();