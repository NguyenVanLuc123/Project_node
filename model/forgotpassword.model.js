const mongoose=require("mongoose")
slug = require('mongoose-slug-updater'),
mongoose.plugin(slug)


const ForgotPasswordSchema =new mongoose.Schema(
    {
        email:String,
        otp:String,
        expireAt:{
            type:Date,
            expires:60
        }

},{
    timestamps:true
})
const forgotPassword= mongoose.model('forgotPassword',ForgotPasswordSchema,"forgotpassword")

module.exports=forgotPassword