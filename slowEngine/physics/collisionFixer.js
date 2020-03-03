import CollisionDetector from "./collisionDetector.js";
import Line from "../geometry/line.js";
import Pos from "../geometry/pos.js";


export default class collisionFixer extends CollisionDetector {
    runCollision(engine, other) {
        let collisionAxis = this.collisionGradient(engine, other);
        if (collisionAxis) {
            let axis = collisionAxis.getUnit();
            // engine.draw.drawGameLine(new Line(new Pos(0, 0), axis), "#a00", 0.05);
            let overlap = this._getAxisOverlap(engine, axis, other);
            let change = new Pos(axis.x * overlap, axis.y * overlap);
            this.pos.x += change.x;
            this.pos.y += change.y;
        }
    }
}