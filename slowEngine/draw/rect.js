import {Display} from "../display/index.js";
import * as Conversions from "./vectorConversions.js";


/**
 * Draw a solid color rect on the screen centered on position.
 * Measured in pixels.
 * @param {Vector} position - centre position of rect.
 * @param {Vector} size - size of rect.
 * @param {string} color - fill color of rect.
 */
function drawScreenRect(position, size, color) {
    Display.context.fillStyle = color;
    let topLeft = position.minus(size.divided(2))
    Display.context.fillRect(topLeft.x, topLeft.y, size.x, size.y);
}


/**
 * Draw a solid color rect on the screen centered on position.
 * Measured in game units.
 * @param {Vector} position - centre position of rect.
 * @param {Vector} size - size of rect.
 * @param {string} color - fill color of rect.
 */
function drawGameRect(position, size, color) {
    let screenPosition = Conversions.getScreenPosition(position);
    let screenSize = Conversions.getScreenSize(size);
    drawScreenRect(screenPosition, screenSize, color);
}



export {
    drawScreenRect,
    drawGameRect,
}
