import SlowEngine from "./slowEngine/index.js";

let Vector = SlowEngine.Geometry.Vector;
let object;
let spriteSheet;
let animation;


function setup() {
    object = new SlowEngine.GameObjects.GameObject();
    object.addComponent(SlowEngine.GameObjects.Components.SpriteRenderer);

    spriteSheet = new SlowEngine.Sprites.SpriteSheet("./images/runSheet.png", new Vector(8, 1));
    animation = new SlowEngine.Sprites.Animation();
    let pixelsPerUnit = new Vector(10, 10);
    let duration = 0.1;
    for (let i = 0; i <= 7; i ++) {
        let frame = new SlowEngine.Sprites.Frame(spriteSheet.getImage(i), pixelsPerUnit, duration);
        animation.addFrame(frame);
    }

    object.getComponent("SpriteRenderer").addAnimation("runLeft", animation);
    object.getComponent("SpriteRenderer").setCurrentAnimation("runLeft");
}


function main() {
    SlowEngine.update();
    SlowEngine.Display.clear();
    object.runComponents();
}


export {
    setup,
    main,
}