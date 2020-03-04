
export default class KeyInput {
    constructor() {
        this.keyState = new Map();

        window.addEventListener("keydown", ev => {
            this.keyState.set(ev.key, true);
        });
        window.addEventListener("keyup", ev => {
            this.keyState.set(ev.key, false);
        });
    }
    isPressed(key) {
        /** Return whether the current key is pressed. */
        return !!this.keyState.get(key);
    }
}