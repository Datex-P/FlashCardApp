const mongoose = require("mongoose");

//const dotenv = require('dotenv')
const cors = require('cors')
//dotenv.config
const express = require('express');
const app = express();
 const DataBase = require('./models/database')
app.use(cors())
app.use(express.json())
//const mongoose = require('mongoose');

app.get('/:_id',(req,res)=>{
  DataBase.findById(req.params._id,(err,d)=>res.json(d))
    // DataBase.create(req.query).then(d=>res.json(d))
})
app.post('/database',(req,res)=>{
  DataBase.create(req.body,(err,d)=>{
    if(err){
      console.log(err)
      res.statusCode(413)
    }else{
      res.status(200).json(d)
    }
  })

})
app.put('/database/:_id',(req,res)=>{
  console.log(req.body)
  DataBase.findById(req.params._id).update(req.body,(err,d)=>res.json(d))
})

// import mongoose = require("mongoose");

// const mongoose = require('mongoose')
// connect to mongo
const dbURI = 'mongodb+srv://fab:06601618158mongo@cluster0.dnnru.mongodb.net/FlashCardVanillaJavascript?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology:true }).then((result)=>console.log('connected')).catch((err)=>console.log(err));
app.listen(8000, ()=>console.log('server is running'))