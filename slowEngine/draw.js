
export default class Draw {
    constructor(parentEngine) {
        this._parentEngine = parentEngine
    }
    getWindowRect(gameRect) {
        /**
         * Given a rect in game units, return the corresponding rect measured in pixels.
         */
        let window = this._parentEngine.window
        let camera = this._parentEngine.camera
        return {
            x: window.size.w / 2 + (gameRect.x - gameRect.w / 2 - camera.pos.x) * camera.pixelsPerUnit,
            y: window.size.h / 2 + (-gameRect.y - gameRect.h / 2 - camera.pos.y) * camera.pixelsPerUnit,
            w: gameRect.w * camera.pixelsPerUnit,
            h: gameRect.h * camera.pixelsPerUnit,
        }
    }
    windowRect(windowRect, color) {
        this._parentEngine.window.context.fillStyle = color;
        this._parentEngine.window.context.fillRect(windowRect.x, windowRect.y, windowRect.w, windowRect.h);
    }
    gameRect(gameRect, color) {
        this.windowRect(this.getWindowRect(gameRect), color);
    }
}