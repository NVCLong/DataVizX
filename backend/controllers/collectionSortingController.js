const Collection = require("../models/collection.model");
const CollectionSorting = require("../algorithm/CollectionSorting");
const User = require("../models/user.model");
const chartList = require("../models/chartlist.model");

const collectionSortingController = {
    // [GET] /collection/sort/asc/:id
    async performSortAsc(req, res) {
        try {
            await chartList
                .findOne({ userId: req.params.id })
                .then(async function (results) {
                    if (!results) {
                        res
                            .status(200)
                            .json({
                                msg: "No collections found, please create a new one!",
                                success: false,
                            });
                    } else {
                        const user = await User.findOne({ _id: req.params.id });
                        if (!user) {
                            console.log("error");
                        }
                        const lists = results;
                        const listCollection = lists.DataList;
                        let userCollection = [];

                        for (let collection of listCollection) {
                            let element = await Collection.findById(collection._id);
                            userCollection.push(element);
                        }

                        // Sort by a -> z order
                        const sortedUserCollectionAsc =
                            CollectionSorting.sortByValueAndCategoryAsc(
                                userCollection,
                                "name"
                            );

                        res.json({
                            success: true,
                            collectionAsc: sortedUserCollectionAsc,
                        });
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        } catch (e) {
            console.log("error: " + e);
        }
    },

    // [GET] /collection/sort/desc/:id
    async performSortDesc(req, res) {
        try {
            await chartList
                .findOne({ userId: req.params.id })
                .then(async function (results) {
                    if (!results) {
                        res
                            .status(200)
                            .json({
                                msg: "No collections found, please create a new one!",
                                success: false,
                            });
                    } else {
                        const user = await User.findOne({ _id: req.params.id });
                        if (!user) {
                            console.log("error");
                        }
                        const lists = results;
                        const listCollection = lists.DataList;
                        let userCollection = [];

                        for (let collection of listCollection) {
                            let element = await Collection.findById(collection._id);
                            userCollection.push(element);
                        }

                        // Sort by z -> a order
                        const sortedUserCollectionDesc =
                            CollectionSorting.sortByValueAndCategoryDesc(
                                userCollection,
                                "name"
                            );

                        res.json({
                            success: true,
                            collectionDesc: sortedUserCollectionDesc,
                        });
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        } catch (e) {
            console.log("error: " + e);
        }
    },
};

module.exports = collectionSortingController;
