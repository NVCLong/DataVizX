const authentication = require("./auth.route");
const site = require("./site.route");
const report = require("./report.route");
const collection = require("./collection.route");
const chartRoutes = require("./chartRoutes");
module.exports = function route(app) {
    app.use("/auth", authentication);
    app.use("/report", report);
    app.use("/collection", collection);
    app.use("/", site);
    app.use("/collection-raw-data", chartRoutes);
};
