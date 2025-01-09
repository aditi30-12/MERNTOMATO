const express =require('express')
const router = express.Router()


router.post('/foodData',(req,res)=>{
    try{
        // let FoodItems = "data"
        // console.log(FoodItems)
        console.log(global.FoodItems)
        res.send([global.FoodItems])
    }catch(error){
console.error(error.message);
res.send("Server Error")
    }
})

module.exports = router;