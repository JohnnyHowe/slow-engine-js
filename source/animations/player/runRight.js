import SlowEngine from "../../../slowEngine/index.js";
let Vector = SlowEngine.Geometry.Vector;


let rightSheet = new SlowEngine.Sprites.SpriteSheet("../../source/images/runRight.png", new Vector(8, 1));
let pixelsPerUnit = new Vector(10, 10);
let duration = 0.1;

let runRightAnimation = new SlowEngine.Sprites.Animation();
for (let i = 0; i <= 7; i ++) {
    let frame = new SlowEngine.Sprites.Frame(rightSheet.getImage(i), pixelsPerUnit, duration);
    runRightAnimation.addFrame(frame);
}

let leftSheet = new SlowEngine.Sprites.SpriteSheet("../../source/images/runLeft.png", new Vector(8, 1));
let runLeftAnimation = new SlowEngine.Sprites.Animation();
for (let i = 0; i <= 7; i ++) {
    let frame = new SlowEngine.Sprites.Frame(leftSheet.getImage(i), pixelsPerUnit, duration);
    runLeftAnimation.addFrame(frame);
}
 

export {runRightAnimation, runLeftAnimation}