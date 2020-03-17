import Vector from "../slowEngine/geometry/vector.js"
import WorldObject from "../slowEngine/worldObject.js";

import Block from "./block.js";
import {CHUNKSIZE} from "./chunkHandler.js";


export default class Chunk extends WorldObject {
    constructor(pos) {
        super();

        this.pos = pos;
        this.cornerOffsets = [
            new Vector(Math.floor(CHUNKSIZE / 2), Math.floor(CHUNKSIZE / 2)),
            new Vector(Math.floor(CHUNKSIZE / 2), -Math.floor(CHUNKSIZE / 2)),
            new Vector(-Math.floor(CHUNKSIZE / 2), -Math.floor(CHUNKSIZE / 2)),
            new Vector(-Math.floor(CHUNKSIZE / 2), Math.floor(CHUNKSIZE / 2)),
        ]

        this.blocks = this.getNewBlocksMatrix();
    }

    getNewBlocksMatrix() {
        let blocks = []
        for (let i = 0; i < CHUNKSIZE; i ++) {
            blocks.push(new Array(CHUNKSIZE));
        }
        return blocks;
    }

    getCentrePos() {
        return this.pos.multiplied(CHUNKSIZE);
    }

    getPos() {
        return this.getCentrePos();
    }

    getChunkPos() {
        return this.pos;
    }

    setBlock(pos, block) {
        this.blocks[pos.y][pos.x] = block;
    }

    getBlock(pos) {
        return this.getBlockWithRelativePos(pos);
    }

    getBlockWithRelativePos(pos) {
        return this.blocks[pos.y][pos.x];
    }

    toString() {
        return "Chunk at " + this.pos.toString();
    }

    isOnScreen(engine) {
        let screenSize = engine.window.getGameSize();
        let maxPos = engine.camera.pos.plus(screenSize.divided(2));
        let minPos = engine.camera.pos.minus(screenSize.divided(2));

        let thisPos = this.getPos();
        return (
            thisPos.x < maxPos.x && thisPos.x > minPos.x &&
            thisPos.y < maxPos.y && thisPos.y > minPos.y
        )
    }

    draw(engine) {
        this.drawOutline(engine, "#a00");
        for (let x = 0; x < CHUNKSIZE; x++) {
            for (let y = 0; y < CHUNKSIZE; y++) {
                this.getBlockWithRelativePos(new Vector(x, y)).draw(engine);
            }
        }
    }

    fill() {
        for (let x = 0; x < CHUNKSIZE; x++) {
            for (let y = 0; y < CHUNKSIZE; y++) {
                let pos = this.getCentrePos().plus(new Vector(x - Math.floor(CHUNKSIZE / 2), y - Math.floor(CHUNKSIZE / 2)));
                this.setBlock(new Vector(x, y), new Block(pos));
            }
        }
    }
}

