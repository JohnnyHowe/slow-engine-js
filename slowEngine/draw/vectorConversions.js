import {Display} from "../display/index.js";


/**
 * Translate the game position to pixel position on the display.
 * @param {Vector} gamePosition - position to convert
 * @returns {Vector} screenPosition.
 */
function getScreenPosition(gamePosition) {
    let screenPos = gamePosition.getCopy();
    screenPos.y = -screenPos.y;
    screenPos = screenPos.multiplied(Display.Camera.pixelsPerUnit)
    screenPos = screenPos.plus(Display.getSize().divided(2))
    return screenPos;
}


/**
 * Translate the game size to pixel size on the display.
 * @param {Vector} gameSize - size to convert
 * @returns {Vector} screen size.
 */
function getScreenSize(gameSize) {
    return gameSize.multiplied(Display.Camera.pixelsPerUnit);
}


export {
    getScreenPosition,
    getScreenSize,
}