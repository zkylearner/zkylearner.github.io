// var _ = {
var zkylearner = {
    chunk: function (array, size = 1) {
        if (size === 1) {
            return array.slice()
        }
        var result = []
        var block = []
        for (let i = 0; i < array.length; i++) {
            block.push(array[i])
            if ((i + 1) % size === 0) {
                result.push(block)
                block = []
            }
        }
        if (block.length !== 0) {
            result.push(block)
        }
        return result
    },
    compact: function (arr) {
        return arr.filter(it => it)
    },
    concat: function (array, ...values) {
        var arr = array.slice()
        for (let val of values) {
            if (Array.isArray(val)) {
                val.map(x => arr.push(x))
            } else {
                arr.push(val)
            }
        }
        return arr
    },
    difference: function (array, ...values) {
        var arr = array.slice()
        for (let val of values) {
            arr = arr.filter(n => !val.includes(n))
        }
        return arr
    },
    drop: function (arr, n = 1) {
        // return ary.length > n ? ary.slice(n) : []
        return arr.slice(n)
    },
    fill: function (arr, val, start = 0, end = arr.length) {
        for (let i = start; i < end; i++) {
            arr[i] = val
        }
        return arr
    },
    flatten: function (arr) {
        return [].concat(...arr)
    },
    flattenDeep: function (ary) {
        var result = []
        for (var item of ary) {
            if (Array.isArray(item)) {
                var flattedItem = zkylearner.flattenDeep(item)
                result.push(...flattedItem)
            } else {
                result.push(item)
            }
        }
        return result
    },
    flattenDepth: function (ary, depth = 1) {
        var result = [],
            flattedItem
        for (var item of ary) {
            if (Array.isArray(item)) {
                if (depth !== 0) {
                    flattedItem = zkylearner.flattenDepth(item, depth - 1)
                    result.push(...flattedItem)
                } else {
                    result.push(item)
                }
            } else {
                result.push(item)
            }
        }
        return result
    },
    //collection
    // every : (a, p) => !_.some(a, negate(p)),
    every: function (ary, predicate) {
        return ary.reduce((result, item, val, ary) => {
            return result && predicate(item, val, ary)
        }, true)
    },
    // some : (a, p) => !_.every(a, negate(p)),
    some: function (ary, predicate) {
        return ary.reduce((result, item, val, ary) => {
            return result || predicate(item, val, ary)
        }, false)
    },
    // Function
    ary: function (f, n = f.length) {
        return function (...args) {
            return f(...args.slice(0, n))
        }
    },
    unary: function (f) {
        return this.ary(f, 1)
    },
    after: function (n, func) {
        var times = 0
        return function (...args) {
            times++
            if (times < n) {
                return
            } else {
                return func(...args)
            }
        }
    },
    before: function (n, func) {
        var times = 0
        var lastResult
        return function (...args) {
            times++
            if (times < n) {
                return lastResult = func(...args)
            } else {
                return lastResult
            }
        }
    },
    flip: function (f) {
        return function (...args) {
            return f(...args.reverse())
        }
    },
    negate: function (f) {
        return function (...args) {
            return !f(...args)
        }
    },
    negate: f => (...args) => !f(...args),
    spread: function(f) {
        return function(ary) {
            return f.apply(null, ary)
        }
    },
    memoize: function(f){
        var cache = {}
        return function(arg){
            if(arg in cache) {
                return cache[arg]
            } else {
                return cache[arg] = f(arg)
            }
        }
    },
}