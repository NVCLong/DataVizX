const Tree= require("../algorithm/Node");
const chartSorting= require("../algorithm/chartSorting")

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


    // replace by sorting algorithm

    findPosition(array, value){
        this.sortArray(array)
        console.log(array)
        // array.sort(function(a,b){ return a-b})
        let upperBound= array.length;
         let lowerBound= 0;
        let curIndex=0;
        if(array.length===1){
          if(array[0]!==value){
              return {msg: " can not find position"}
          }
          else return {msg: " found position", index: 0}
        }
        while(true){
          curIndex= Math.floor((upperBound+lowerBound)/2)
          if(array[curIndex]<value){
              lowerBound= curIndex;
          }else if(array[curIndex]>value){
              upperBound= curIndex;
          }
          else if(array[curIndex]===value){
              return {msg: " found position", index: curIndex}
          }else if(lowerBound> upperBound){
              return {msg: "can not find position"}
          }
        }
    },

    // merge sort
    sortArray(array)
    {
        let length= Math.floor(array.length);
        if(length<= 1) return;
        let middle= Math.floor(length/2);
        let leftArray= [];
        let rightArray= [];

        let i=0;
        let j=0;

        for ( i = 0; i < length; i++) {
            if (i < middle) {
                leftArray.push(array[i]);
            } else {
                rightArray.push(array[i])
                j++;
            }
        }

        this.sortArray(leftArray);
        this.sortArray(rightArray);
        this.mergeSortArray(leftArray,rightArray, array)

    },
    mergeSortArray(leftArray, rightArray, array){
        let leftSize = Math.floor(array.length/2);
        let rightSize = array.length-leftSize;

        let i=0;
        let l=0;
        let r=0;

        while(l<leftSize && r<rightSize){
            if(leftArray[l]< rightArray[r]){
                array[i]=leftArray[l];
                i++;
                l++;
            }
            else{
                array[i]=rightArray[r];
                i++;
                r++;
            }
        }
        while(l< leftSize){
            array[i]=leftArray[l];
            i++;
            l++;
        }
        while( r< rightSize){
            array[i]=rightArray[r];
            i++;
            r++;
        }
    }

    ,

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
    // find mean function
    findMean(array){
        let mean;
        let sum=0;
        for (let i=0; i<array.length;i++){
            sum += array[i]
        }
        return (sum/array.length)
    },

    // find standard deviation function
    standardDeviation(array){
        let mean= this.findMean(array);
        let x=0;
        for (let i = 0; i <array.length ; i++) {
            x=Math.pow((array[i]- mean), 2);
        }
        return  Math.sqrt(x/array.length-1);
    },


    // Tree to find the value in the collection

    findValue(array, value){

        let tree= new Tree();
        for (let i=0; i<array.length; i++) {
            tree.insert(array[i]);
        }
        return tree.findNode(value);
    },

    // trEE, graph



}
module.exports=algorithm