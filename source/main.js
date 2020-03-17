import Vector from "../slowEngine/geometry/vector.js"

import Player from "./player.js";

import Chunk from "./chunk.js";
import {CHUNKSIZE, ChunkHandler} from "./chunkHandler.js";


let player = new Player();

let chunkHandler = new ChunkHandler();
let w = 21
for (let y = -1; y >= -10; y --) {
    for (let x = Math.ceil(-w/2); x < Math.ceil(w/2); x++) {
        let pos = new Vector(x, y);
        let chunk = new Chunk(pos);
        chunk.fill();
        chunkHandler.addChunk(pos.toString(), chunk);
    }
}


function playerBlockCollisions(engine, player, chunkHandler) {
    // player.runCollisions(engine, chunkHandler.getChunk(player.getCurrentChunkPos()).)
    let centreChunkPos = player.getCurrentChunkPos();
    player.collisionVectors = [];

    // for (let chunkPosChange of [new Vector(-1, 0), new Vector(0, 0), new Vector(1, 0), new Vector(0, 1), new Vector(0, -1)]) {
    for (let dx = -1; dx < 2; dx ++) {
        for (let dy = -1; dy < 2; dy ++) {
            let chunkPosChange = new Vector(dx, dy);

            let chunkPos = centreChunkPos.plus(chunkPosChange);
            let chunk = chunkHandler.getChunk(chunkPos.toString());
            // engine.drawer.drawGameCircle(chunkPos.multiplied(CHUNKSIZE), "#000", 0.5);

            if (chunk) {
                let iterator = chunkHandler.getBlockIterator();
                let result = iterator.next();
                while (!result.done) {
                    let collisions = player.runCollisions(engine, [chunk.getBlock(result.value)]);
                    for (let i of collisions) {
                        player.collisionVectors.push(i);
                    }
                    result = iterator.next();
                }
            }
        }
    }
}



// Called once as program starts.
function setUp(engine) {
    // engine.camera.pos.y = CHUNKSIZE;
    engine.camera.pixelsPerUnit = 30;
}


// Called every frame.
function main(engine) {
    player.update(engine);
    playerBlockCollisions(engine, player, chunkHandler);

    console.log(Math.round(engine.clock.getAvgFPS()));

    engine.camera.pos.x = player.pos.x;
    engine.camera.pos.y = player.pos.y;

    chunkHandler.draw(engine);
    player.draw(engine);
}


// Export your stuff so it can be called.
export {setUp, main};