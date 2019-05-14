function range(start, end, step=1) {
	let arr = [];
	for(let i=start; i < end; i++){
		if(i%step==0){arr.push(i)}
	}
	return arr;
}

function prime(arr){
    var flag = true,i = 2,max = arr[arr.length-1];

    while(flag){
        arr = arr.filter(x=>{return x%i!==0})
        i++
        if(i>8){
            flag = false;
        }
    }
    arr.splice(0,1,2,3,5,7)
    return arr;
}

var arr = range(1,101);
list = prime(arr);