// Initialize MongoDB
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
    path: `${__dirname}/config/.env.development`,
});

// Connect to MongoDB database
mongoose
    .connect(process.env.DATABASE_URL, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB Connected!");
    })

    // Throw error if there is any
    .catch((err) => {
        console.log(err.message);
    });

// Initialize mongoose connection
mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected to Database");
    // console.log(process.env.DB_NAME);
});

// Throw error if there is any
mongoose.connection.on("error", (err) => {
    console.log(err.message);
});

// Disconnect from MongoDB database
mongoose.connection.on("disconnected", () => {
    console.log("Mongoose is disconnected to the Database");
});

// Terminate the process
process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
});
