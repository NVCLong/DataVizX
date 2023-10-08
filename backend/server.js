const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const morgan = require("morgan")
const route = require("../backend/route/index")
const database = require("../backend/Config/db/database");


//Connect to the database
database.connection()
    .then(()=>{
        console.log("Connected to database")
    });

app.use(morgan('combined'))
app.use(express.urlencoded())

route(app);


app.get('/', function (req, res) {
    res.send('DataVizX Project')
})


app.listen(PORT, ()=>{
    console.log(`Server listening on port http://localhost:${PORT}`)
})