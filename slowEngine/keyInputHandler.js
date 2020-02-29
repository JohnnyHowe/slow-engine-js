
export default class KeyHandler {
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
        return !!this.keyState.get(key);
    }
}