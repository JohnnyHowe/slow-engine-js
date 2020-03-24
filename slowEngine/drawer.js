import Vector from "./geometry/vector.js";
import Line from "./geometry/line.js";


export default class Drawer {
    constructor(parentEngine) {
        this._parentEngine = parentEngine;
        this.window = this._parentEngine.window;
        this.camera = this._parentEngine.camera;
        this.context = this.window.context;
    }
    getWindowPos(gamePos) {
        /** Return the window position (Vector) of gamePos (Vector). */
        let window = this._parentEngine.window;
        let camera = this._parentEngine.camera;
        return new Vector(
            window.size.x / 2 + (gamePos.x - camera.pos.x) * camera.pixelsPerUnit,
            window.size.y / 2 + (-gamePos.y + camera.pos.y) * camera.pixelsPerUnit,
        )
    }
    getWindowRect(gameRect) {
        /** Return the window rect (Rector) of gameRect (Rect). */
        let window = this._parentEngine.window;
        let camera = this._parentEngine.camera;
        return {
            x: window.size.x / 2 + (gameRect.x - gameRect.w / 2 - camera.pos.x) * camera.pixelsPerUnit,
            y: window.size.y / 2 + (-gameRect.y - gameRect.h / 2 - camera.pos.y) * camera.pixelsPerUnit,
            w: gameRect.w * camera.pixelsPerUnit,
            h: gameRect.h * camera.pixelsPerUnit,
        }
    }
    drawWindowRect(rect, color) {
        /** Draw a rect on the screen in the pixel position of rect */
        this._parentEngine.window.context.fillStyle = color;
        this._parentEngine.window.context.fillRect(rect.x, rect.y, rect.w, rect.h);
    }
    drawGameRect(rect, color) {
        /** Draw a rect on the screen in the game position of rect */
        this.drawWindowRect(this.getWindowRect(rect), color);
    }
    drawWindowLine(line, color, lineWidth) {
        /** Draw a line on the screen in the pixel position of line */
        this._parentEngine.window.context.lineWidth = lineWidth;
        this._parentEngine.window.context.strokeStyle = color;
        this._parentEngine.window.context.beginPath();
        this._parentEngine.window.context.moveTo(line.start.x, line.start.y);
        this._parentEngine.window.context.lineTo(line.end.x, line.end.y);
        this._parentEngine.window.context.stroke();
    }
    drawGameLine(line, color, lineWidth) {
        /** Draw a line on the screen in the game position of line */
        let camera = this._parentEngine.camera;
        let scaledLine = new Line(this.getWindowPos(line.start), this.getWindowPos(line.end));
        this.drawWindowLine(scaledLine, color, lineWidth * camera.pixelsPerUnit);
    }
    drawWindowCircle(pos, color, radius) {
        this._parentEngine.window.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
        this.context.stroke();
    }
    drawGameCircle(pos, color, radius) {
        this.drawWindowCircle(this.getWindowPos(pos), color, radius * this.camera.pixelsPerUnit * radius);
    }
}