const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const cookiesParser = require("cookie-parser");
const dotenv = require("dotenv");
const route= require("./routes/mainRoad");
dotenv.config({
    path: `${__dirname}/config/.env.development`,
});
require("./helpers/init_mongodb");
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());
app.use(express.static("public"));
// connect to route
route(app);

// return error
app.use(async (req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port  http://localhost:${PORT}`);
});
