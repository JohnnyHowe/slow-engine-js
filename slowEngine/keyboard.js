
/** Class to handle key input */
export default class KeyboardClass {

    /**
     * Initialize the keyboard/key handler
     */
    constructor() {
        this.keyState = new Map();

        window.addEventListener("keydown", ev => {
            this.keyState.set(ev.key, true);
        });
        window.addEventListener("keyup", ev => {
            this.keyState.set(ev.key, false);
        });
    }

    /**
     * Is the key currently pressed down?
     * @param {string} key 
     * @returns {Boolean} whether the key is pressed
     */
    isPressed(key) {
        return !!this.keyState.get(key);
    }
} 


let Keyboard = new KeyboardClass();
export {Keyboard}