var zkylearner = {
    chunk: function (array, size = 1) {
        if(size === 1){return array.slice()}
        var result = []
        var block = []
        for(let i in array) {
            block.push(array[i])
            if((+i + 1) % size === 0) {
                result.push(block)
                block = []
            }
        }
        if(block.length !== 0) {result.push(block)}
        return result
    },
    compact: function (ary) {
        return ary.filter(it => it)
    },
    difference: function(array, ...values){
        var arr = array.slice()
        for(let val of values) {
            arr = arr.filter(n => !val.includes(n))
        }
        return arr
    },
}