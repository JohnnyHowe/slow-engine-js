import SlowEngine from "./slowEngine/index.js";

let Vector = SlowEngine.Geometry.Vector;
let spriteSheet;
let object;


function loadImages() {
    spriteSheet = new SlowEngine.Sprites.SpriteSheet("./images/runSheet.png", new Vector(8, 1));
}


function setup() {
    object = new SlowEngine.GameObjects.GameObject();
    object.addComponent(SlowEngine.GameObjects.Components.SpriteRenderer)

    let runAnimation = new SlowEngine.Sprites.Animation()
    let frameTime = 0.1;
    let pixelsPerUnit = new Vector(10, 10);

    for (let i = 0; i <= 7; i++) {
        let frame = new SlowEngine.Sprites.Frame(spriteSheet.getImageAtIndex(i), pixelsPerUnit, frameTime);
        runAnimation.addFrame(frame);
    }
    object.getComponentByName("SpriteRenderer").addAnimation("run", runAnimation);
    object.getComponentByName("SpriteRenderer").setCurrentAnimation("run");
}


function main() {
    SlowEngine.update();
    SlowEngine.Display.clear();
    object.getComponentByName("SpriteRenderer").run();
}


export {
    loadImages,
    setup,
    main,
}