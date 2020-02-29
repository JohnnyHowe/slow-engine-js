
export default class Clock {
    constructor() {
        this.startTime = Date.now();
        this.lastFrameTime = this.startTime;
        this.ditme = NaN
    }
    update() {
        let currentTime = Date.now()
        this.dtime = (currentTime - this.lastFrameTime) / 1000;
        this.lastFrameTime = currentTime;
    }
    getdtime() {
        return this.dtime;
    }
}