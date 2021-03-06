"use strict";

class TsBuffer {
    constructor() {
        this.chunks = [];
        this.length = 0;
    }

    add(chunk) {
        this.chunks.push(chunk);
        this.length += chunk.length;
    }

    clear() {
        this.chunks = [];
        this.length = 0;
    }

    concat() {
        return Buffer.concat(this.chunks);
    }
}

module.exports = TsBuffer;
