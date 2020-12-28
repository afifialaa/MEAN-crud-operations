const mongoose = require('mongoose');
const mongoDB = process.env.MONGO_CLOUD;

mongoose.connect(mongoDB, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology:true});

let db = mongoose.connection;

db.on('open', ()=>{
    console.log('connection to database is established');
})

db.on('error', ()=>{
    console.log('failed to connect to database');
})

module.exports = db;