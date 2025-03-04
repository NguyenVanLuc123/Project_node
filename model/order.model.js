const mongoose=require("mongoose")
slug = require('mongoose-slug-updater'),
mongoose.plugin(slug)


const ordersSchema =new mongoose.Schema(
    {
    //    user_id:String,
       cart_id:String,
       userInfor:{
        fullname: String,
        phone:String,
        address:String
       },
       products:[
        {
            product_id:String,
            price:Number,
            discountPercentage:Number,
            quantity:Number,
        }
    ]

},{
    timestamps:true
})
const Order= mongoose.model('Order',ordersSchema,"orders")

module.exports=Order