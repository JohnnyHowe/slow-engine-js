import SlowEngine from "./slowEngine/index.js";

let Vector = SlowEngine.Geometry.Vector;
let object;
// let spriteSheet;


function setup() {
    object = new SlowEngine.GameObjects.GameObject();
    // object.addComponent(SlowEngine.GameObjects.Components.SpriteRenderer)
}


function main() {
    SlowEngine.update();
    SlowEngine.Display.clear();
    // SlowEngine.Draw.drawGameImage(spriteSheet.getImageAtIndex(0), new Vector(0, 0), new Vector(10, 10));
}


export {
    setup,
    main,
}