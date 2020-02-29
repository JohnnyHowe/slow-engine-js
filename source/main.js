import WorldObject from "../slowEngine/worldObject.js";


class Player extends WorldObject {
    constructor() {
        super();
    }
    move(engine) {
        let speed = engine.clock.getdtime() * 2;
        if (engine.keys.isPressed("w")) {
            this.rect.y += speed;
        }
        if (engine.keys.isPressed("s")) {
            this.rect.y -= speed;
        }
        if (engine.keys.isPressed("a")) {
            this.rect.x -= speed;
        }
        if (engine.keys.isPressed("d")) {
            this.rect.x += speed;
        }
    }
}

// let obj = new WorldObject();
let player = new Player();

export default function main(engine) {
    player.move(engine);
    player.draw(engine);
};