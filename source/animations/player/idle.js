import SlowEngine from "../../../slowEngine/index.js";
let Vector = SlowEngine.Geometry.Vector;


let pixelsPerUnit = new Vector(12, 22);
let duration = 0.4;

let rightSheet = new SlowEngine.Sprites.SpriteSheet("../../source/images/idleRight.png", new Vector(2, 1));
let rightIdleAnimation = new SlowEngine.Sprites.Animation();
for (let i = 0; i <= 1; i ++) {
    let frame = new SlowEngine.Sprites.Frame(rightSheet.getImage(i), pixelsPerUnit, duration);
    rightIdleAnimation.addFrame(frame);
}


let leftSheet = new SlowEngine.Sprites.SpriteSheet("../../source/images/idleLeft.png", new Vector(2, 1));
let leftIdleAnimation = new SlowEngine.Sprites.Animation();
for (let i = 0; i <= 1; i ++) {
    let frame = new SlowEngine.Sprites.Frame(leftSheet.getImage(i), pixelsPerUnit, duration);
    leftIdleAnimation.addFrame(frame);
}



export {
    leftIdleAnimation,
    rightIdleAnimation,
}