const algorithm= {

    findMax(array){
        if(array.length===1){
            return array[0].value;
        }
        let mid= Math.floor(array.length/2);
        const  leftMax= this.findMax(array.slice(0, mid));
        const rightMax= this.findMax(array.slice(mid))
        return Math.max(leftMax, rightMax)
    },

    findMin(array){
        if(array.length===1){
            return array[0].value;
        }
        let mid= Math.floor(array.length/2);
        const leftMin= this.findMin(array.slice(0,mid))
        const rightMin= this.findMin(array.slice(mid))
        return Math.min(leftMin, rightMin)
    },

    // group using hash table
    groupBelowData(array, target){
        let hashTable={}
        for (let i = 0; i < array.length ; i++) {
            let  element = array[i];
            if( element.value < target) {
                let key = element.category;
                let hash = key
                if (!hashTable[hash]) {
                    hashTable[hash] = []
                }
                hashTable[hash].push(element)
            }
        }
        return hashTable
    },
    groupAboveData(array, target){
        let hashTable={}
        for (let i = 0; i < array.length ; i++) {
            let  element = array[i];
            if( element.value > target) {
                let key = element.category;
                let hash = key
                if (!hashTable[hash]) {
                    hashTable[hash] = []
                }
                hashTable[hash].push(element)
            }
        }
        return hashTable
    },
    // replace the sort method  with the sorting method of LAV
    findMedian(array){
        let median;
        array.sort((a, b) => {
            return a.value-b.value
        })
        let mid= Math.floor(array.length/2);
        if( mid %2===0){
            median = (array[mid]+ array[mid+1])/2;
        }else{
            median = (array[mid])
        }
        return median
    },

    // trEE, graph



}
module.exports=algorithm