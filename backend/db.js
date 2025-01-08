const mongoose = require('mongoose');
const {MongoClient} = require('mongodb')

const mongoURI='mongodb://localhost:27017/Tomato'
const mongoDB =async()=>{
    await mongoose.connect(mongoURI,{useNewUrlParser:true},async(err,result)=>{
    try{
       let result =  await mongoose.connect(mongoURI);
       if(result){
        console.log("connected")
       }
       // console.log("connected");
       let client = new MongoClient(mongoURI)
       let db = client.db("Tomato");
        const fetched_data= db.collection("FoodItems");
        fetched_data.find().toArray().then(result =>{
            console.log(result);
           
        }).catch(err =>{
            console.log(err.message)
        })
        fetched_data.find({}).toArray(async function(err,data){
            //console.log(data)
            const FoodCategory = await mongoose.connection.db.collection("FoodCategory");
            FoodCategory.find({}).toArray(function(err,catData){
                if(err)console.log(err);
                 else{
                     FoodItems = data;
                     FoodCategory= catData;
                      console.log(global.foodItems)
                     console.log(global.FoodCategory)
                 } 
            })
            
            
            // if(err)console.log(err);
            // else{
            //     global.foodItems = data;
            //     console.log(global.foodItems)
            // }
            
        })
    }catch(err){
        console.log(err);
    }
})
};      
module.exports= mongoDB;

// const mongoose = require('mongoose');
//     const mongoURI = "mongodb+srv://aditipatel4m:Ruchi@1234@cluster0.zrol0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//     const connectToMongo = async () => {
//       try {
//          mongoose.set("strictQuery", false);
//         await mongoose.connect(mongoURI);
//         console.log("Connected to Mongo Successfully!");
//       } catch (error) {
//         console.error(error);
//       }
//     };
//  connectToMongo();