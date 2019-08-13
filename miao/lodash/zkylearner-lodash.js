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
                var flattedItem = this.flattenDeep(item)
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
                    flattedItem = this.flattenDepth(item, depth - 1)
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
        var run = this.baseBy(ary)
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
    bind: function(func, thisArg, ...fixedArgs){
        return function(...args){
            var acturalArgs = [...fixedArgs]
            for(let i = 0; i < acturalArgs.length; i++){
                if(acturalArgs[i] == window){
                    acturalArgs[i] = args.shift()
                }
            }
            acturalArgs.push(...args)
            return func.apply(thisArg, acturalArgs)
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
    curry: function(func, arity=func.length) {
        // window为占位符
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
        value > -1 && value % 1 == 0 && value <= Number.MAX_SAFE_INTEGER
    },
    isEqual: function(value, other){
        if(value === other){return true}
        var type1 = Object.prototype.toString.call(value)
        var type2 = Object.prototype.toString.call(other)
        if(type1 !== type2){return false}
        var subType
        if(type1 === "[object Number]" || type1 === "[object Boolean]" || type1 === "[object String]"){
            return value === other
        }
        if(type1 === "[object Object]"){
            var key1 = Object.keys(value)
            var key2 = Object.keys(other)
            if(key1.length !== key2.length){return false}
            for(let key of key1){
                subType = Object.prototype.toString.call(value[key])
                if(subType === "[object Object]" || subType === "[object Array]"){
                    if(!this.isEqual(value[key], other[key])){
                        return false
                    }
                } else if(value[key] !== other[key]){
                    return false
                }
            }
            return true
        }
        if(type1 === "[object Array]"){
            if(value.length !== other.length){return false}
            for(let i = 0; i < value.length; i++){
                subType = Object.prototype.toString.call(value[i])
                if(subType === "[object Object]" || subType === "[object Array]"){
                    if(!this.isEqual(value[i], other[i])){
                        return false
                    }
                } else if(value[i] !== other[i]){
                    return false
                }
            }
            return true
        }
        throw new Error("Undetermined data type")
    },
    isMatch: function(object, source){
        if(object === source){return true}
        for(let key in source){
            if(typeof source[key] == "object" && source[key] != null){
                if(!this.isMatch(object[key], source[key])){
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
    get: function(obj, path, defaultValue){
        var path = this.toPath(path)
        for(let i of path){
            if(obj === undefined){return defaultValue}
            obj = obj[i]
        }
        return obj
    },
    get: function(obj, path, defaultValue){
        if(typeof path === "string")path = this.toPath(path)
        if(obj === undefined){return defaultValue}
        if(path.length == 0){return obj}
        return this.get(obj[path[0]], path.slice(1), defaultValue)
    },
    // Seq

    // String
    camelCase: function(str){
        str = str.toLowerCase()
        return this.words(str).reduce((res, s, i)=>{
            return res + (i ? this.upperFirst(s) : s)
        },"")
    },
    capitalize: function(str){
        return this.upperFirst(str.toLowerCase())
    },
    endsWith: function(str='', target, position=str.length){
        var n = target.length - 1
        for(let i = position - 1; i > 0; i--){
            if(n < 0){break}
            if(str[i] != target[n--]){
                return false
            }
        }
        return true
    },
    escape: function(str){
        const htmlEscapes = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }
        return /[\&|\<|\>|\"|\']/g.test(str) ? str.replace(/[\&|\<|\>|\"|\']/g, s => htmlEscapes[s]): str
    },
    escapeRegExp: function(str){
        return str.replace(/[\^\$\.\[\]\*\+\?\(\)\{\}]/g, "\\" + "$&")
    },
    kebabCase: function(str){
        return this.words(str).reduce((res, s, i)=>{
            return res + (i ? "-" + s.toLowerCase() : s.toLowerCase())
        },"")
    },
    lowerCase: function(str){
        return this.words(str).reduce((res, s, i)=>{
            return res + (i ? " " + s.toLowerCase() : s.toLowerCase())
        },"")
    },
    lowerFirst: function(str = ""){
        return str[0].toLowerCase() + str.slice(1)
    },
    repeatEx: function(str=' ', len = 1){
        var res = ""
        var j = 0
        var strLen = str.length
        if(len <= 0 || strLen <= 0){return ""}
        if(strLen === 1){return this.repeat(str, len)}
        for(let i = 0; i < len; i++){
            res += str[j++]
            if(j == strLen){j = 0}
        }
        return res
    },
    pad: function(str='', len=0, chars=' '){
        var strLen = str.length
        if(len <= strLen){return str}
        var n = len - strLen
        var l = n >> 1
        var r = n - l
        return this.repeatEx(chars, l) + str + this.repeatEx(chars, r)
    },
    padEnd: function(str='', len=0, chars=' '){
        var strLen = str.length
        if(len <= strLen){return str}
        var n = chars.length
        var fillStr = this.repeat(chars, Math.ceil((len - strLen) / n))
        str = str + fillStr
        if(str.length > len){str = str.slice(0, len)}
        return str
    },
    padEnd: function(str='', len=0, chars=' '){
        var strLen = str.length
        if(len <= strLen){return str}
        return str + this.repeatEx(chars, len - strLen)
    },
    padStart: function(str='', len=0, chars=' '){
        var strLen = str.length
        if(len <= strLen){return str}
        return this.repeatEx(chars, len - strLen) + str
    },
    // parseInt: function(str, radix=10){
    // },
    repeat: function(str="", n=1){
        if(n === 0){return ""}
        var res = ""
        while(n--){res+=str}
        return res
    },
    replace: function(str='', pattern, replacement){
        return str.replace(pattern, replacement)
    },
    snakeCase: function(str){
        return this.words(str).reduce((res, s, i)=>{
            return res + (i ? "_" + s.toLowerCase() : s.toLowerCase())
        },"")
    },
    split: function(str='', separator, limit){
        return str.split(separator).slice(0, limit)
    },
    startCase: function(str){
        return this.words(str).reduce((res, s, i)=>{
            return res + (i ? " " + this.upperFirst(s) : this.upperFirst(s))
        },"")
    },
    startsWith: function(str='', target, position=0){
        var n = target.length
        var count = 0
        for(let i = position; i < str.length; i++){
            if(str[i] != target[count++]){
                return false
            }
            if(count >= n){break}
        }
        return true
    },
    // template: function(str="", options={}){
    // },
    toLower: function(str){
        return str.toLowerCase()
    },
    toUpper: function(str){
        return str.toUpperCase()
    },
    trimEx: function(str='', chars=" ", flag = "lr"){
        // ^[\_\-]+|[\_\-]+$
        var temp = ""
        var re
        for(let i of chars){
            temp += "\\" + i
        }
        temp = "[" + temp + "]+"

        if(flag === "lr"){
            re = new RegExp("^" + temp + "|" + temp + "$","g")
        }else if(flag === "l"){
            re = new RegExp("^" + temp,"g")
        }else if(flag === "r"){
            re = new RegExp(temp + "$","g")
        }
        return str.replace(re, "")
    },
    trim: function(str="", chars=" "){
        return this.trimEx(str, chars)
    },
    trimEnd: function(str="", chars=" "){
        return this.trimEx(str, chars, "r")
    },
    trimStart: function(str="", chars=" "){
        return this.trimEx(str, chars, "l")
    },
    truncate: function(str="", options={}){
        var flag = false
        if(options.length === undefined){options.length = 30}
        if(options.omission === undefined){options.omission = "..."}
        if(str.length > options.length){
            str = str.slice(0, options.length - options.omission.length)
            flag = true
        }
        if(options.separator){
            var re = new RegExp(options.separator, "g")
            if(typeof re === "string"){
                re = new RegExp(re, "g")
            }
            if(Object.prototype.toString.call(re) === '[object RegExp]'){
                var index = null, temp
                while(1){
                    temp = re.exec(str)
                    if(temp){index = temp.index}
                    else{break}
                }
                if(index !== null)str = str.slice(0, index)
            }
        }
        if(flag){str += options.omission}
        return str
    },
    unescape: function(str){
        const htmlEscapes = {
            '&amp;':'&',
            '&lt;':'<',
            '&gt;':'>',
            '&quot;':'"',
            '&#39;':"'",
        }
        var re = /\&amp;|\&lt;|\&gt;|\&quot;|\&#39;/g
        return re.test(str) ? str.replace(re, s => htmlEscapes[s]): str
    },
    upperCase: function(str){
        return this.words(str).reduce((res, s, i)=>{
            return res + (i ? " " + s.toUpperCase() : s.toUpperCase())
        },"")
    },
    upperFirst: function(str = ""){
        return str[0].toUpperCase() + str.slice(1)
    },
    words: function(str, pattern){
        if(pattern)return str.match(pattern) || []
        var res = str.replace(/[A-Z]+/g," " + '$&')
        res = res.replace(/[A-Z][a-z]/g," " + '$&')
        res = res.split(/[\W|\_]+/)
        if(res[0] == ""){res.shift()}
        if(res[res.length - 1] == ""){res.pop()}
        return res || []
    },
    // Util
    identity: function(...val){
        return val[0]
    },
    matches: function(src){
        var that = this
        return function(obj) {
            return that.isMatch(obj, src)
        }
    },
    toPath: function(str){
        return str.split(/\.|\[|\]./g)
    },
    property: function(path){
        var that = this
        return function(obj) {
            return that.get(obj, path)
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
