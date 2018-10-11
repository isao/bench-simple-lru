// Based on David Herges' implementation described here:
// https://medium.com/spektrakel-blog/a-simple-lru-cache-in-typescript-cba0d9807c40

class LruMapCache<K, V> {
    cache: Map<K, V>
    limit: number
    isEvicting: number

    constructor(limit: number) {
        this.cache = new Map
        this.limit = limit
        this.isEvicting = 0
        this.evict = this.evict.bind(this)
    }

    get(key: K): V {
        let val = this.cache.get(key)
        if (val != null) {
            this.cache.delete(key)
            this.cache.set(key, val)
        }
        return val
    }

    set(key: K, val: V): void {
        this.cache.set(key, val)
        if (!this.isEvicting && this.cache.size > this.limit) {
            this.isEvicting = setTimeout(this.evict)
        }
    }

    clear(): void {
        this.cache = new Map;
    }

    private evict(): void {
        const keys = this.cache.keys()
        do {
            this.cache.delete(keys.next().value)
        } while (this.cache.size > this.limit)
        this.isEvicting = 0
    }
}

export default LruMapCache
