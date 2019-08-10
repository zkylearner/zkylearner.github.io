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
    differenceBy: function(ary, ...values){
        if(!values)return ary
        var run
        if(typeof(values[values.length - 1]) === "function"){
            var iteratee = values.pop()
            function run(x){return iteratee(x)}
        }
        if(typeof(values[values.length - 1]) === "string"){
            var iteratee = values.pop()
            function run(x){return x[iteratee]}
        }
        if(!run){run = x => x}
        var temp, res = ary
        for(let i = 0; i < values.length; i++) {
            temp = values[i].map(x => run(x))
            res = res.filter(x => !temp.includes(run(x)))
        }
        return res
    },
    // - - -
    differenceWith: function (array, ...values) {
        if(typeof(values[values.length - 1]) === "function"){
            var comparator = values.pop()
        }
        var arr = array.slice()
        for (let val of values) {
            for(let i of val){
                arr = arr.filter(n => !comparator(n, i))
            }
        }
        return arr
    },
    drop: function (arr, n = 1) {
        // return ary.length > n ? ary.slice(n) : []
        return arr.slice(n)
    },
    dropRight: function (arr, n = 1) {
        var len = arr.length
        if(n >= len)return []
        if(n === 0)return arr
        return arr.slice(0, len - n)
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
    fromPairs: function (pairs) {
        var obj = {}
        for(let val of pairs) {
            obj[val[0]] = val[1]
        }
        return obj
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
    intersectionBy: function(...ary) {
        var run
        if(typeof(ary[ary.length - 1]) === "function"){
            var iteratee = ary.pop()
            function run(x){return iteratee(x)}
        }
        if(typeof(ary[ary.length - 1]) === "string"){
            var iteratee = ary.pop()
            function run(x){return x[iteratee]}
        }
        var res = ary[0]
        var map = {}
        res.forEach(x => map[x] = run(x))
        for(let i = 1; i < ary.length; i++){
            var temp = ary[i].map(x => run(x))
            res = res.filter(x => temp.includes(map[x]))
        }
        return res
    },
    intersectionWith: function (...ary) {
        if(typeof(ary[ary.length - 1]) === "function"){
            var comparator = ary.pop()
        }
        var res = []
        for(let i = 1; i < ary.length; i++){
            for(let obj of ary[i]){
                // res.filter(x => comparator(obj,x))
                var temp = []
                for(let i of ary[0]){
                    if(comparator(obj,i)){temp.push(i)}
                }
                res.push(...temp)
            }
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
    pullAllBy: function(...ary) {
        var run = zkylearner.baseBy(ary)
        var res = ary[0]
        for(let i = 1; i < ary.length; i++) {
            var map = {}
            ary[i].forEach(x => map[run(x)] = x)
            // res = res.filter(x => !(run(x) in map))
            for(let j = 0; j < res.length; j++){
                if((run(res[j]) in map)){
                    res.splice(j,1)
                    j--
                }
            }
        }
        return res
    },
    pullAllWith: function(...ary) {
        if(typeof(ary[ary.length - 1]) === "function"){
            var comparator = ary.pop()
        }
        var res = ary[0]
        for(let i = 1; i < ary.length; i++) {
            for(let obj of ary[i]){
                for(let j = 0; j < res.length; j++){
                    if(comparator(res[j], obj)){
                        res.splice(j,1)
                        j--
                    }
                }
            }
        }
        return res
    },
    pullAt: function(ary, ...idx){
        var temp = [], j = 0, count = 0
        idx.forEach(x => {
            for(let i = 0; i < ary.length; i++){
                if(i === x[j] - count){
                    temp.push(ary.splice(i,1)[0])
                    count++
                    i--
                    j++
                }
            }
        })
        return temp
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
    curry: function(func, arity=func.length) {
        var temp = [], i = 0
        function a(...val) {
            val.forEach(x=>{
                if (i < arity) {
                    temp[i] = x
                    i++
                } else {
                    i = temp.indexOf(window)
                    if (i !== -1) {
                        temp[i] = x
                    }
                }
            })
    
            if (temp.length >= arity && !temp.includes(window)) {
                return func(...temp)
            } else {
                return a
            }
        }
        return a
    },
    // window为占位符
    curry: function(func, arity=func.length) {
        var temp = [], i = 0, record = []
        function a(...val) {
            val.forEach(x=>{
                if (i < arity) {
                    if(x !== window){temp[i] = x}
                    else{record.push(i)}
                    i++
                } else {
                    temp[record.shift()] = x
                }
            })
    
            if (temp.length >= arity && record.length === 0) {
                return func(...temp)
            } else {
                return a
            }
        }
        return a
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
    // Lang
    isLength: function(value){
        return typeof value == 'number' && 
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
    },
    isMatch: function(object, source){
        if(object === source){return true}
        for(let key in source){
            if(typeof source[key] == "object" && source[key] != null){
                if(!zkylearner.isMatch(object[key], source[key])){
                    return false
                }
            }else if(object[key] != source[key]){
                return false
            }
        }
        return true
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
    matches: function(src){
        return function(obj) {
            return zkylearner.isMatch(obj, src)
        }
    },
    // other
    baseBy: function(ary){
        var run
        if(typeof(ary[ary.length - 1]) === "function"){
            var iteratee = ary.pop()
            function run(x){return iteratee(x)}
        }
        if(typeof(ary[ary.length - 1]) === "string"){
            var iteratee = ary.pop()
            function run(x){return x[iteratee]}
        }
        return run
    },
}
// const _ = "_Placeholder_"
