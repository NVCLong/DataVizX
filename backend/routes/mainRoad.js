const authentication = require("./auth.route");
const site = require("./site.route");
const report = require("./report.route");
const collection = require("./collection.route");
const searchEngine = require("./searchEngine.route");
const collectionSorting = require("./collectionSorting.route");
const note= require("./note.route");
const userProfile = require("./userProfile.route");
const support= require("./support.route")

module.exports = function route(app) {
    app.use("/auth", authentication);
    app.use("/report", report);
    app.use("/collection", collection);
    app.use("/search", searchEngine);
    app.use("/collection", collectionSorting);
    app.use("/note",note);
    app.use("/user", userProfile);
    app.use("/support", support);
    app.use("/", site);

};
