import SlowEngine from "../../../slowEngine/index.js";
let Vector = SlowEngine.Geometry.Vector;


let runRightAnimation = new SlowEngine.Sprites.Animation();
let spriteSheet = new SlowEngine.Sprites.SpriteSheet("../../source/images/runSheet.png", new Vector(8, 1));
let pixelsPerUnit = new Vector(10, 10);
let duration = 0.1;
for (let i = 0; i <= 7; i ++) {
    let frame = new SlowEngine.Sprites.Frame(spriteSheet.getImage(i), pixelsPerUnit, duration);
    runRightAnimation.addFrame(frame);
}
 

export {runRightAnimation}