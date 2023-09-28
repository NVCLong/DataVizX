const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const morgan = require("morgan")


app.get('/', function (req, res) {
    res.send('DataVizX Project')
})
app.use(morgan('combined'))

app.listen(PORT, ()=>{
    console.log(`Server listening on port http://localhost:${PORT}`)
})