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


function getGamePosition(screenPosition) {
    let gamePos = screenPosition.getCopy();
    gamePos = gamePos.minus(Display.getSize().divided(2));
    gamePos = gamePos.divided(Display.Camera.pixelsPerUnit);
    gamePos.y = -gamePos.y;
    return gamePos;
}


export {
    getScreenPosition,
    getScreenSize,
    getGamePosition,
}