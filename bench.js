const precise = require('precise')
const retsu = require('retsu')

function run(name, num, lru) {
    console.log('Benchmarking ' + name);
    const time = {
        'set': [],
        get1: [],
        update: [],
        get2: [],
        evict: []
    }

    const results = {
        name,
        'set': 0,
        get1: 0,
        update: 0,
        get2: 0,
        evict: 0,
    }

    const times = 5
    const evicts = num * 2
    const x = 1e6
    const prefix = 'qsdf-xkahl18sfh;qieuhf;qiehrf;qkehf;kqjd;asdnvci3h4p98ph;kn'

    let n = -1;
    while (++n < times) {
        let stimer = precise().start();
        for (let i = 0; i < num; i++) lru.set(prefix + i, Math.random());
        time.set.push(stimer.stop().diff() / x);

        let gtimer = precise().start();
        for (let i = 0; i < num; i++) lru.get(prefix + i);
        time.get1.push(gtimer.stop().diff() / x);

        let utimer = precise().start();
        for (let i = 0; i < num; i++) lru.set(prefix + i, Math.random());
        time.update.push(utimer.stop().diff() / x);

        const g2timer = precise().start();
        for (let i = 0; i < num; i++) lru.get(prefix + i);
        time.get2.push(g2timer.stop().diff() / x);

        let etimer = precise().start();
        for (let i = num; i < evicts; i++) lru.set(prefix + i, Math.random());
        time.evict.push(etimer.stop().diff() / x);
    }

    ['set', 'get1', 'update', 'get2', 'evict'].forEach(i => {
        results[i] = Number((num / retsu.median(time[i]).toFixed(2)).toFixed(0));
    });
    return results
}

module.exports = run
