import SlowEngine from "./slowEngine/index.js";
import {loadImages, setup, main} from "./main.js";


let hasSetup = false;

function slowEngineMain() {
    if (!hasSetup && SlowEngine.Sprites.areSpritesLoaded()) {
        setup();
        hasSetup = true;
    }
    if (hasSetup){
        main();
    }
    requestAnimationFrame(slowEngineMain);
}


loadImages()
slowEngineMain()