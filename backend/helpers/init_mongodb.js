const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config({
    path: `${__dirname}/config/.env.development`
});
mongoose
    .connect(process.env.DATABASE_URL, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB Connected!');
    })

    .catch((err) => {
        console.log(err.message);
    })

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected to Databse');
    // console.log(process.env.DB_NAME);
})

mongoose.connection.on('error', (err) => {
    console.log(err.message);
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected to the Database');
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})