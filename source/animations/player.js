import SlowEngine from "../../../slowEngine/index.js";
let Vector = SlowEngine.Geometry.Vector;

let spriteSheet = new SlowEngine.Sprites.SpriteSheet("../../source/images/playerSheet.png", new Vector(8, 3));
let pixelsPerUnit = new Vector(12, 21);


function getAnimation(startIndex, endIndex, duration) {
    let animation = new SlowEngine.Sprites.Animation();

    for (let i = 0; i <= (endIndex - startIndex); i ++) {
        let frame = new SlowEngine.Sprites.Frame(spriteSheet.getImage(startIndex + i), pixelsPerUnit, duration);
        animation.addFrame(frame);
    }
    return animation
}


let runDuration = 0.1;
let runRight = getAnimation(0, 7, runDuration); 
let runLeft = getAnimation(8, 15, runDuration); 

let idleDuration = 2;
let idleRight = getAnimation(16, 17, idleDuration);
let idleLeft = getAnimation(22, 23, idleDuration);

export {
    runRight,
    runLeft,
    idleRight,
    idleLeft
}
