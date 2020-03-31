import {getGamePosition} from "./draw/index.js";
import {Vector} from "./geometry/index.js";

/** 
 * Class to handle mouse things
 * left button number = 0
 * mid button number = 1
 * right button number = 2
 */
class MouseClass {

    // Attributes
    screenPosition;
    buttonBuffer;
    buttons;
    lastButtonStates;

    /** Create mouse obj */
    constructor() {
        this.screenPosition = new Vector(0, 0);
        this.buttons = [0, 0, 0];
        this.buttonBuffer = [0, 0, 0];
        this.lastButtonStates = [0, 0, 0];
        this.setListener();
    }

    /**
     * Update the mouse.
     * set this.buttons to the buffer,
     */
    update() {
        this.lastButtonStates = [...this.buttons];
        this.buttons = [...this.buttonBuffer];
        // this.buttonBuffer = [0, 0, 0];
    }

    /**
     * Has the requested button just been pressed? 
     * @param {number} buttonNumber 
     */
    isJustPressed(buttonNumber) {
        return (this.buttons[buttonNumber] - this.lastButtonStates[buttonNumber]) == -1;
    }

    /**
     * Has the requested button just been released? 
     * @param {number} buttonNumber 
     */
    isJustReleased(buttonNumber) {
        return (this.buttons[buttonNumber] - this.lastButtonStates[buttonNumber]) == -1;
    }

    /**
     * Get the state of the requested mouse button
     * @param {number} buttonNumber
     * @returns {Boolean} Whether the button is pressed
     */
    isPressed(buttonNumber) {
        return this.buttons[buttonNumber];
    }

    /**
     * Get the position of the mouse on screen
     * @returns {Vector} mouse position
     */
    getScreenPosition() {
        return this.screenPosition;
    }

    /**
     * Get the position of the mouse in game units
     * @returns {Vector} mouse position
     */
    getGamePosition() {
        return getGamePosition(this.screenPosition);
    }

    /**
     * The function called when the mouse is moved
     * @param {MouseClass} self 
     * @param {MouseEvent} event 
     */
    onMouseMove(self, event) {
        self.screenPosition = new Vector(event.clientX, event.clientY);
    }

    /**
     * The function called when the mouse is clicked
     * @param {MouseClass} self - this
     * @param {MouseEvent} event - the mouse event
     */
    onButtonDown(self, event) {
        self.buttonBuffer[event.button] = 1;
    }

    /**
     * The function called when the mouse is released
     * @param {MouseClass} self - this
     * @param {MouseEvent} event - the mouse event
     */
    onButtonUp(self, event) {
        self.buttonBuffer[event.button] = 0;
    }

    setListener() {
        let self = this;
        document.onmousemove = function(event) {self.onMouseMove(self, event)};
        document.onmousedown = function(event) {self.onButtonDown(self, event)};
        document.onmouseup = function(event) {self.onButtonUp(self, event)};
    }
}


let Mouse = new MouseClass();
export {Mouse}