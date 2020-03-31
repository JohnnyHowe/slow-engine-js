import SlowEngine from "../slowEngine/index.js";


class Wall extends SlowEngine.GameObjects.GameObject {
    constructor(position, size) {
        super();
        this.addComponent(SlowEngine.GameObjects.Components.SpriteRenderer);
        this.addComponent(SlowEngine.GameObjects.Components.BoxCollider);
        this.getComponent("Transform").position = position;
        this.getComponent("Transform").size = size;
    }

    run() {
        this.runComponents();
    }
}


export {Wall}