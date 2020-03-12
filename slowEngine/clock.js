
export default class Clock {
    constructor() {
        this.startTime = Date.now();
        this.lastFrameTime = this.startTime;
        this.rawdtime = NaN
        this._dtimeMult = 1
    }
    update() {
        let currentTime = Date.now()
        this.rawdtime = (currentTime - this.lastFrameTime) / 1000;
        this.lastFrameTime = currentTime;
    }
    getdtime() {
        /** Returns the time between the current and previous frame in milliseconds. */
        return this.rawdtime * this._dtimeMult;
    }
}