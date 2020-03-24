import Vector from "../slowEngine/geometry/vector.js";
const CHUNKSIZE = 5;


class ChunkHandler {
    constructor() {
        this.chunks = {};
    }

    getChunk(id) {
        return this.chunks[id];
    }

    addChunk(id, chunk) {
        this.chunks[id] = chunk;
    }

    draw(engine) {
        for (let key of Object.keys(this.chunks)) {
            let chunk = this.chunks[key];
            if (chunk.isOnScreen(engine)) {
                chunk.draw(engine);
            }
        }
    }

    getBlockIterator() {
        let currentPos = new Vector(-1, 0);
        const iterator = {
            next: function() {
                let result;
                currentPos.x += 1;
                if (currentPos.x >= CHUNKSIZE) {
                    currentPos.x -= CHUNKSIZE;
                    currentPos.y += 1;
                }
                if (currentPos.y < CHUNKSIZE) {
                    result = {value: currentPos, done: false};
                } else {
                    result = {value: currentPos, done: true};
                }
                return result;
            }
        }
        return iterator;
    }

}


export {
    CHUNKSIZE,
    ChunkHandler,
}