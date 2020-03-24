
export default class Clock {
    constructor() {
        this.startTime = Date.now();
        this.lastFrameTime = this.startTime;
        this.rawdtime = NaN
        this._dtimeMult = 1
        this.frameCount = 0;
    }
    update() {
        let currentTime = Date.now()
        this.rawdtime = (currentTime - this.lastFrameTime) / 1000;
        this.lastFrameTime = currentTime;
        this.frameCount += 1;
    }
    getdtime() {
        /** Returns the time between the current and previous frame in milliseconds. */
        return this.rawdtime * this._dtimeMult;
    }
    getFPS() {
        return 1 / this.getdtime();
    }
    getAvgFPS() {
        // console.log(Date.now() - this.startTime)
        return this.frameCount / ((Date.now() - this.startTime) / 1000);
    }
}