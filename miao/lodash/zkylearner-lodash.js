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
    head: function(ary) {
        return ary[0]
    },
    indexOf: function(ary, val, fromIndex = 0){
        for(let i = fromIndex; i < ary.length; i++) {
            if(ary[i] === val) {return i}
        }
        return -1
    },
    initial: function(ary) {
        return ary.slice(0, ary.length - 1)
    },
    intersection: function(...ary) {
        var res = ary[0]
        for(let i = 1; i < ary.length; i++){
            var temp = []
            res.forEach(x => ary[i].includes(x) ? temp.push(x) : null)
            res = temp
        }
        return res
    },
    join: function(ary, separator=',') {
        var last = ary[ary.length - 1], res = ""
        for(let i of ary) {
            if(i !== last){
                res += i + '' + separator
            } else {
                res += i
            }
        }
        return res
    },
    last: function(ary) {
        return ary[ary.length - 1]
    },
    lastIndexOf: function(ary, val, fromIndex=ary.length-1) {
        for(let i = fromIndex; i > 0; i--) {
            if(ary[i] === val) {return i}
        }
        return -1
    },
    nth: function(ary, n = 0) {
        if(n < 0){
            return ary[ary.length + n]
        }else{
            return ary[n]
        }
    },
    pull: function(ary, ...val) {
        for(let x of val) {
            for(let i = 0; i < ary.length; i++){
                if(ary[i] === x){
                    ary.splice(i,1)
                    i--
                }
            }
        }
        return ary
    },
    pullAll: function(ary, val) {
        for(let x of val) {
            for(let i = 0; i < ary.length; i++){
                if(ary[i] === x){
                    ary.splice(i,1)
                    i--
                }
            }
        }
        return ary
    },
    remove: function(ary, predicate) {
        var res = []
        for(let i = 0; i < ary.length; i++){
            if(predicate(ary[i])){
                res.push(ary.splice(i,1)[0])
                i--
            }
        }
        return res
    },
    reverse: function(ary) {
        var len = ary.length - 1
        for(let i = 0; i <= len >> 1; i++) {
            if(i === len - i){continue}
            var temp = ary[i]
            ary[i] = ary[len - i]
            ary[len - i] = temp
        }
        return ary
    },
    slice: function(array, start=0, end=array.length) {
        var res = []
        for(let i = start; i < end; i++){
            res.push(ary[i])
        }
        return res
    },
    sortedIndex: function(ary, val){
        var i = 0, j = ary.length - 1, mid
        while(i <= j){
            mid = (i + j)>>1
            if(ary[mid] >= val && ary[mid - 1] < val){return mid}
            if(val > ary[mid]) {
                i = mid + 1
            }else{
                j = mid -1
            }
        }
        return mid
    },
    tail: function(ary) {
        return ary.slice(1)
    },
    take: function(ary, n = 1) {
        return ary.slice(0, n)
    },
    takeRight: function(ary, n = 1) {
        if(n === 0)return []
        return ary.slice(-n)
    },
    union: function(...ary) {
        var x = new Set, res = []
        for(let i = 0; i < ary.length; i++) {
            ary[i].forEach(val=>x.add(val))
        }
        x.forEach(i => res.push(i))
        return res
    },
    uniq: function(ary) {
        var x = new Set, res = []
        ary.forEach(val=>x.add(val))
        x.forEach(i => res.push(i))
        return res
    },
    without: function(ary, ...val){
        return ary.filter(x => !val.includes(x))
    },
    xor: function(...ary){
        var res = [], map = {}
        for(let i of ary){
            i.forEach(x => x in map ? map[x]++ : map[x] = 1)
        }
        for(let num in map){
            if(map[num] === 1){
                res.push(+num)
            }
        }
        return res
    },
    //Collection
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

    // Math
    add: function(a, b) {
        return a + b
    },
    ceil: function(num, precision=0) {
        var power = 10 ** precision
        return Math.ceil(num * power)/power
    },
    divide: function(a, b) {
        return a / b
    },
    floor: function(num, precision=0) {
        var power = 10 ** precision
        return Math.floor(num * power)/power
    },
    max: function(ary){
        if(ary.length == 0)return undefined
        return Math.max(...ary)
    },
    maxBy: function(ary, iteratee){
        var max = ary[0], temp
        for(let i = 1; i < ary.length; i++) {
            if(typeof(iteratee) === "function"){
                temp = iteratee(ary[i])
                if(iteratee(max) < temp){max = ary[i]}
            }
            if(typeof(iteratee) === "string"){
                temp = ary[i][iteratee]
                if(max[iteratee] < temp){max = ary[i]}
            } 
        }
        return max
    },
    mean: function(ary){
        if(ary.length == 0)return undefined
        return ary.reduce((s,v,i)=>((s * i + v) / (i + 1)))
    },
    meanBy: function(ary, iteratee){
        var res = 0, temp = 0
        for(let i = 0; i < ary.length; i++) {
            if(typeof(iteratee) === "function"){
                temp = iteratee(ary[i])
            }
            if(typeof(iteratee) === "string"){
                temp = ary[i][iteratee]
            }
            res += temp
        }
        return res / ary.length
    },
    min: function(ary){
        if(ary.length == 0)return undefined
        return Math.min(...ary)
    },
    minBy: function(ary, iteratee){
        var min = ary[0], temp
        for(let i = 1; i < ary.length; i++) {
            if(typeof(iteratee) === "function"){
                temp = iteratee(ary[i])
                if(iteratee(min) > temp){min = ary[i]}
            }
            if(typeof(iteratee) === "string"){
                temp = ary[i][iteratee]
                if(min[iteratee] > temp){min = ary[i]}
            } 
        }
        return min
    },
    multiply: function(a, b) {
        return a * b
    },
    round: function(num, precision=0) {
        var power = 10 ** precision
        return Math.round(num * power)/power
    },
    subtract: function(a, b) {
        return a - b
    },
    sum: function(ary) {
        return ary.reduce((x, y)=> x + y)
    },
    sumBy: function(ary, iteratee){
        var res = 0, temp = 0
        for(let i = 0; i < ary.length; i++) {
            if(typeof(iteratee) === "function"){
                temp = iteratee(ary[i])
            }
            if(typeof(iteratee) === "string"){
                temp = ary[i][iteratee]
            }
            res += temp
        }
        return res
    },
    // Number
    clamp: function(number, lower = 0, upper){
        if(number >= upper){return upper}
        if(number > lower){return number}
        if(number < lower){return lower}
        return number
    },
    inRange: function(number, start, end){
        if(typeof(end) === "undefined"){end = start; start = 0}
        if(start > end){
            start += end
            end = start - end
            start = start - end
        }
        if(number < end && number >= start){return true}
        return false
    },
    random: function(lower, upper, floating){
        // 无参数
        if(typeof(lower) === "undefined" && typeof(upper) === "undefined" && typeof(floating) === "undefined"){
            lower = 0
            upper = 1
            floating = false
        }
        // 1个参数
        if(typeof(lower) !== "undefined" && typeof(upper) === "undefined" && typeof(floating) === "undefined"){
            if(typeof(lower) === "boolean"){
                floating = lower
                lower = 0
                upper = 1
            }else{
                upper = lower
                lower = 0
            }
        }
        // 2个参数
        if(typeof(lower) !== "undefined" && typeof(upper) !== "undefined" && typeof(floating) === "undefined"){
            if(typeof(upper) === "boolean"){
                floating = upper
                upper = lower
                lower = 0
            }
        }

        if(floating || ~~lower !== lower || ~~upper !== upper){
            return Math.random() * (upper - lower)
        }else{
            return ~~(Math.random() * (upper - lower))
        }
    },
    // Object
    forOwn: function(obj, iteratee) {
        var hasOwn = Object.prototype.hasOwnProperty
        for(let i in obj){
            if(hasOwn.call(obj, i)){
                iteratee(obj.i, i, obj)
            }
        }
        return obj
    },

    // Util
    identity: function(...val){
        return val[0]
    },
}