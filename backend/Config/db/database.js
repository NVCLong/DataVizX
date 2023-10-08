const mongoose= require('mongoose');
async function connection(){
    try{
        mongoose
            .connect('mongodb+srv://backendatavizx:backendatavizx@cluster1.cm1bbkf.mongodb.net/dataVizX')
            .then(()=>{console.log('Connected to database')})
        console.log('Connect to database');
    }catch (e) {
        console.log('Error connecting to database')
    }
}

module.exports= {
    connection: connection
}

