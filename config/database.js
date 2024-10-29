const mongoose = require('mongoose');

module.exports.connect= async()=>{
    try{
        await mongoose.connect(process.env.mongo_url);
        console.log("connect success")
    }catch(error){
        console.log(error) 
    }
}
