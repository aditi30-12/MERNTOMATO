const express =require('express')
const app=express()
const port =5000
const { MongoClient, ServerApiVersion } = require('mongodb');
const { default: mongoose } = require('mongoose');
const uri = "mongodb://localhost:27017/Tomato";
let createuser = require('./Routes/CreateUser.js')
let DisplayData= require('./Routes/DisplayData.js')
let bodyparser = require('body-parser')

app.use(bodyparser.json())
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
let mongoDB = ()=>{
    mongoose.connect(uri).then(()=>{
        console.log("connected")
    }).catch(err =>{
        console.log(err.message)
    })
}
mongoDB()
let fetch = () =>{
    let client = new MongoClient(uri);
    let db = client.db("Tomato");
    let collection = db.collection("FoodItems");
    let result = collection.find().toArray().then(result =>{
        console.log(result)
    })
}
fetch()


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type,Accept"
    );
    next();
})
app.post('/data', (req, res) =>{
    let {name} = req.body;
    console.log(name);
    res.send(name);
})
app.use(express.json())
app.use('/api', require("./Routes/CreateUser.js"));
app.use('/api', require("./Routes/DisplayData.js"));
app.get('/',(req,res)=>{
    res.send('Hello World!')
})
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})
