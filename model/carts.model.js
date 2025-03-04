const mongoose=require("mongoose")
slug = require('mongoose-slug-updater'),
mongoose.plugin(slug)


const CartsSchema =new mongoose.Schema(
    {
        user_id:String,
        products:[
            {
                product_id:String,
                quantity:Number,
            }
        ]
},{
    timestamps:true
})
const Cart= mongoose.model('Cart',CartsSchema,"carts")

module.exports=Cart