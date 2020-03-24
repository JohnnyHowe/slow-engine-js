import SlowEngine from "../slowEngine/slowEngine.js";


// Called once as program starts.
function setUp() {
}


let obj = new SlowEngine.GameObjects.GameObject;
obj.setComponent(SlowEngine.GameObjects.Components.SpriteRenderer);


// Called every frame.
function main() {
}


// Export your stuff so it can be called.
export {setUp, main};