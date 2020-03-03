import Pos from "./geometry/pos.js";
import Line from "./geometry/line.js";


export default class Draw {
    constructor(parentEngine) {
        this._parentEngine = parentEngine;
    }
    getWindowPos(pos) {
        let window = this._parentEngine.window;
        let camera = this._parentEngine.camera;
        return new Pos(
            window.size.w / 2 + (pos.x - camera.pos.x) * camera.pixelsPerUnit,
            window.size.h / 2 + (-pos.y + camera.pos.y) * camera.pixelsPerUnit,
        )
    }
    getWindowRect(gameRect) {
        /**
         * Given a rect in game units, return the corresponding rect measured in pixels.
         */
        let window = this._parentEngine.window;
        let camera = this._parentEngine.camera;
        return {
            x: window.size.w / 2 + (gameRect.x - gameRect.w / 2 - camera.pos.x) * camera.pixelsPerUnit,
            y: window.size.h / 2 + (-gameRect.y - gameRect.h / 2 - camera.pos.y) * camera.pixelsPerUnit,
            w: gameRect.w * camera.pixelsPerUnit,
            h: gameRect.h * camera.pixelsPerUnit,
        }
    }
    drawWindowRect(rect, color) {
        this._parentEngine.window.context.fillStyle = color;
        this._parentEngine.window.context.fillRect(rect.x, rect.y, rect.w, rect.h);
    }
    drawGameRect(rect, color) {
        this.drawWindowRect(this.getWindowRect(rect), color);
    }
    drawWindowLine(line, color, lineWidth) {
        // console.log(line)
        this._parentEngine.window.context.lineWidth = lineWidth;
        this._parentEngine.window.context.strokeStyle = color;
        this._parentEngine.window.context.beginPath();
        this._parentEngine.window.context.moveTo(line.start.x, line.start.y);
        this._parentEngine.window.context.lineTo(line.end.x, line.end.y);
        this._parentEngine.window.context.stroke();
    }
    drawGameLine(line, color, lineWidth) {
        let camera = this._parentEngine.camera;
        let scaledLine = new Line(this.getWindowPos(line.start), this.getWindowPos(line.end));
        this.drawWindowLine(scaledLine, color, lineWidth * camera.pixelsPerUnit);
    }
}