const authentication = require("./auth.route");
const site = require("./site.route");
const report = require("./report.route");
const collection = require("./collection.route");
const searchEngine = require("./searchEngine.route");
const chartSorting = require("./chartSorting.route");
const note= require("./note.route");
module.exports = function route(app) {
    app.use("/auth", authentication);
    app.use("/report", report);
    app.use("/collection", collection);
    app.use("/search", searchEngine);
    app.use("/chartSorting", chartSorting);
    app.use("/note",note)
    app.use("/", site);
};
