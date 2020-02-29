
export default class WorldObject {
    constructor(rect={x: 0, y: 0, w: 1, h: 1}) {
        this.rect = rect;
    }
    draw(engine) {
        engine.draw.gameRect(this.rect, "#990000");
    }
}