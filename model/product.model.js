const mongoose=require("mongoose")
slug = require('mongoose-slug-updater'),
mongoose.plugin(slug)


const productSchema =new mongoose.Schema({
    id:Number,
    title: String,
    slug: { type: String, slug: "title", unique: true },
    description:String,
    category:String,
    price: Number,
    discountPercentage:Number,
    rating:Number,
    thumbnail: String,
    stock:Number,
    position:Number,
    status:String,
    deleted:{
        type: String,
        default: false
    },
    deletedAt:Date
},{
    timestamps:true
})
const product= mongoose.model('product',productSchema,"product")

module.exports=product