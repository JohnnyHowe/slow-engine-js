import SlowEngine from "../slowEngine/index.js";
import {runRightAnimation} from "./animations/player/runRight.js";


class Player extends SlowEngine.GameObjects.GameObject {
    constructor() {
        super();
        let animator = this.addComponent(SlowEngine.GameObjects.Components.SpriteRenderer);
        animator.addAnimation("runRight", runRightAnimation);
        animator.setCurrentAnimation("runRight");
    }
}


export {Player}