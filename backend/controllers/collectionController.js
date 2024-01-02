const Collection= require('../models/collection.model')
const chartList= require('../models/chartlist.model')
const algorithm= require("../algorithm/algorithm")

const collectionController= {
    //[GET] /collection/:id
    // need modify to response the update data
    async getCollectionDetails(req, res){
        try{
            await Collection.findOne({_id:req.params.id})
                .then(function(collection){
                    let array= [];
                    for (const arrayElement of collection.values){
                        array.push(arrayElement.value);
                    }
                    console.log( array)
                    let result=algorithm.findValue(array,6);
                    res.status(200).json(collection);
                })
                .catch(function(err){
                    console.log(err);
                    res.json({msg: "can not find the collection"})
                })
        }catch(e){
            console.log(e)
        }
    },

    //[POST] /collection/add
    // auto 10 values
    async addNewCollection(req, res){
        try{
            const values= req.body.values.split(",").map(function(value){
                return parseInt(value,10);
            })
            const categories= req.body.categories.split(",");
            console.log(values)
            const collectionValues=[];
            if(categories.length === values.length){
                for (let i = 0; i < values.length; i++) {
                    let newValues={category: categories[i], value: values[i]}
                    collectionValues.push(newValues);
                }
            }
             const newCollection=await new Collection({
                name: req.body.name,
                values: collectionValues
            })
            newCollection.save()
            console.log(newCollection)
             const userId= req.cookies.userId;
             await chartList.findOne({userId : userId})
                 .then(function (lists) {
                     lists.DataList.push(newCollection._id)
                     lists.save()
                     console.log(lists)
                 })
                 .catch(function (err) {
                     console.log(err);
                 })
            res.json({success: true, message: "add new successfully"})
        }catch(e){
            console.log(e)
        }
    },


    //[GET] collection/groupData/:id
    async groupingData(req, res){
        try{
            await Collection.findOne({_id:req.params.id})
                .then(function(collection){
                    let median= algorithm.findMedian(collection.values)
                    let colletcionBelowValues= algorithm.groupBelowData(collection.values,median.value)
                    let collectionAboveValues= algorithm.groupAboveData(collection.values,median.value)
                    let belowCollection={
                        colletcionBelowValues:colletcionBelowValues
                    }
                    let aboveCollection={
                        collectionAboveValues:collectionAboveValues
                    }
                    res.json({colletcionBelowValues: belowCollection,collectionAboveValues: aboveCollection ,collection: collection, median:median})
                })
                .catch(function(err){
                    console.log(err);
                    res.json({msg: "can not find the collection"})
                })
        }catch(e){
            console.log(e)
        }
    },

    // [PUT]   /collection/edit/:id
    async editCollection(req, res){

        try{
            let collectionValues= []
            let values= req.body.values.split(",").map(function(value){
                return parseInt(value, 10)
            })
            let categories = req.body.categories.split(",")
            for (let i = 0; i < values.length; i++) {
                collectionValues.push({category: categories[i], value: values[i]})
            }
            await Collection.findOneAndUpdate({_id: req.params.id}, {values: collectionValues})
                .then(function (collection) {
                    console.log(collection)
                    res.json({collection})
                })
                .catch(function(err){
                    console.log(err)
                })
        }catch (e) {
            console.log(e)
        }
    },

    // [GET]


    // [GET]
}
module.exports= collectionController