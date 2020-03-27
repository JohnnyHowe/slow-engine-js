
/**
 * Clock object - controls all time related things.
 */
class ClockClass {

    // Attributes
    startTime;      // Time the clock was created.
    lastUpdateTime; // Time of last frame.
    deltaTime;      // Time between current and last frame

    /** 
     * Update the clock and its attributes.
     */
    update() {
        let currentTime = Date.now();
        this.deltaTime = (currentTime - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = currentTime;
    }

    /**
     * Get the time between the current and the last frame.
     * The time between the clock update function to be exact.
     * @returns {number} time difference between this and last frame.
     */
    getDeltaTime() {
        return this.deltaTime;
    }

    /**
     * Make/Initialize the clock
     * Sets start time etc
     * @ignore
     */
    constructor() {
        this.startTime = Date.now();
        this.lastUpdateTime = this.startTime;
        this.deltaTime = 0;
    }
}


let Clock = new ClockClass();
export {Clock}