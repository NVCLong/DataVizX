const authentication = require("./auth.route");
const site = require("./site.route");
const report = require("./report.route");
const collection = require("./collection.route");
const collectionSorting = require("./collectionSorting.route");
const note= require("./note.route");
const userProfile = require("./userProfile.route");
const support= require("./support.route")
const verify= require("./verify.route");

module.exports = function route(app) {
    app.use("/auth", authentication);
    app.use("/report", report);
    app.use("/collection", collection);
    app.use("/chartList", collectionSorting);
    app.use("/note",note);
    app.use("/user", userProfile);
    app.use("/support", support);
    app.use("/verify",verify)
    app.use("/", site);

};
