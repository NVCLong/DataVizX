const express = require("express");
const PORT = process.env.PORT || 8000;

const app = express();

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(PORT, ()=>{
    console.log(`Server listening on port http://localhost:${PORT}`)
})