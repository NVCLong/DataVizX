const Collection = require("../models/collection.model");
const chartList = require("../models/chartlist.model");

const collectionController = {
    //[GET] /collection/:id
    // need modify to response the update data
    async getCollectionDetails(req, res) {
        try {
            await Collection.findOne({ _id: req.params.id })
                .then(function (collection) {
                    console.log(collection);
                    res.json(collection);
                })
                .catch(function (err) {
                    console.log(err);
                    res.json({ msg: "can not find the collection" });
                });
        } catch (e) {
            console.log(e);
        }
    },

    //[POST] /collection/add
    // auto 10 values
    async addNewCollection(req, res) {
        try {
            const collectionValues = [
                { category: req.body.category0, value: req.body.value0 },
                { category: req.body.category1, value: req.body.value1 },
                { category: req.body.category2, value: req.body.value2 },
                { category: req.body.category3, value: req.body.value3 },
                { category: req.body.category4, value: req.body.value4 },
                { category: req.body.category5, value: req.body.value5 },
                { category: req.body.category6, value: req.body.value7 },
                { category: req.body.category7, value: req.body.value7 },
                { category: req.body.category8, value: req.body.value8 },
                { category: req.body.category9, value: req.body.value9 },
            ];
            const newCollection = await new Collection({
                name: req.body.name,
                values: collectionValues,
            });
            newCollection.save();
            console.log(newCollection);
            const userId = req.cookies.userId;
            await chartList
                .findOne({ userId: userId })
                .then(function (lists) {
                    lists.DataList.push(newCollection._id);
                    lists.save();
                    console.log(lists);
                })
                .catch(function (err) {
                    console.log(err);
                });
            res.json({ success: true, message: "add new successfully" });
        } catch (e) {
            console.log(e);
        }
    },

    //[PUT] /collection/edit/:id
    async updateCollection(req, res) {
        try {
            const collectionValues = [
                { category: req.body.category0, value: req.body.value0 },
                { category: req.body.category1, value: req.body.value1 },
                { category: req.body.category2, value: req.body.value2 },
                { category: req.body.category3, value: req.body.value3 },
                { category: req.body.category4, value: req.body.value4 },
                { category: req.body.category5, value: req.body.value5 },
                { category: req.body.category6, value: req.body.value6 },
                { category: req.body.category7, value: req.body.value7 },
                { category: req.body.category8, value: req.body.value8 },
                { category: req.body.category9, value: req.body.value9 },
            ];
            await Collection.findByIdAndUpdate(
                req.params.id,
                { value: collectionValues },
                function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(collectionValues);
                    }
                }
            );
        } catch (e) {
            console.log(e);
        }
    },
};
module.exports = collectionController;
