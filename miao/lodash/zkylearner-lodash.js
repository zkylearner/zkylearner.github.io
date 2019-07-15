var zkylearner = {
    chunk: function (array, size = 1) {
        if(size === 1){return array.slice()}
        var result = []
        var block = []
        for(let i = 0; i < array.length; i++) {
            block.push(array[i])
            if((i + 1) % size === 0) {
                result.push(block)
                block = []
            }
        }
        if(block.length !== 0) {result.push(block)}
        return result
    },
    compact: function (arr) {
        return arr.filter(it => it)
    },
    concat: function (array, ...values) {
        var arr = array.slice()
        for(let val of values) {
            if(Array.isArray(val)){
                val.map(x=>arr.push(x))
            } else {
                arr.push(val)
            }
        }
        return arr
    },
    difference: function(array, ...values){
        var arr = array.slice()
        for(let val of values) {
            arr = arr.filter(n => !val.includes(n))
        }
        return arr
    },
    drop: function(arr, n = 1){
        // return ary.length > n ? ary.slice(n) : []
        return arr.slice(n)
    },
}