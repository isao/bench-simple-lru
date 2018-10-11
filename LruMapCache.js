"use strict";
// Based on David Herges' implementation described here:
// https://medium.com/spektrakel-blog/a-simple-lru-cache-in-typescript-cba0d9807c40
Object.defineProperty(exports, "__esModule", { value: true });
class LruMapCache {
    constructor(limit) {
        this.cache = new Map;
        this.limit = limit;
        this.isEvicting = 0;
        this.evict = this.evict.bind(this);
    }
    get(key) {
        let val = this.cache.get(key);
        if (val != null) {
            this.cache.delete(key);
            this.cache.set(key, val);
        }
        return val;
    }
    set(key, value) {
        this.cache.set(key, value);
        if (!this.isEvicting && this.cache.size > this.limit) {
            this.isEvicting = setTimeout(this.evict);
        }
    }
    clear() {
        this.cache = new Map;
    }
    evict() {
        const keys = this.cache.keys();
        do {
            this.cache.delete(keys.next().value);
        } while (this.cache.size > this.limit);
        this.isEvicting = 0;
    }
}
exports.default = LruMapCache;
