class Utils{
    multipleMongooseToObject (SQLArray) {
        return SQLArray.map(function (SQL) {
            return SQL.toObject();
        });
    }
    MongooseToObject(SQl) {
        return SQl.toObject();
    }
}

module.exports = new Utils();