// Based on David Herges' implementation described here:
// https://medium.com/spektrakel-blog/a-simple-lru-cache-in-typescript-cba0d9807c40

class LruMapCache<K, V> {
    private cache: Map<K, V>
    private limit: number
    private isEvicting: number

    constructor(limit: number) {
        this.cache = new Map
        this.limit = limit
        this.isEvicting = 0
        this.evict = this.evict.bind(this)
    }

    get(key: K): V {
        let val
        if (this.cache.has(key)) {
            val = this.cache.get(key)
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
        this.cache.clear()
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
