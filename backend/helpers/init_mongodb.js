const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://backendatavizx:backendatavizx@cluster1.cm1bbkf.mongodb.net/', {
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
})

mongoose.connection.on('error', (err) => {
    console.log(err.message);
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected to Database');
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})