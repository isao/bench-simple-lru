const run = require('./bench.js')
const num = 2e5
const results = []

const LRUCache = require('lru_cache').LRUCache
results.push(run('lru_cache', num, new LRUCache(num)))

const Simple = require('simple-lru-cache')
results.push(run('simple-lru-cache', num, new Simple({maxSize: num})))

const LruMapCache = require('./LruMapCache.js').default
results.push(run('LruMapCache', num, new LruMapCache(num)))

console.table(results);
