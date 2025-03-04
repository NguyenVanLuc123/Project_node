const mongoose=require("mongoose")
slug = require('mongoose-slug-updater'),
mongoose.plugin(slug)


const productSchema =new mongoose.Schema({
    id:Number,
    title: String,
    newprice:String,
    product_category_id:String,
    slug: { type: String, slug: "title", unique: true },
    description:String,
    category:String,
    price: Number,
    CreateBy:{
        account_id:String,
        createdAt:{
            type:Date,
            default:Date.now
        }
    },
    discountPercentage:Number,
    rating:Number,
    thumbnail: String,
    stock:Number,
    position:Number,
    status:String,
    featured:String,
    deleted:{
        type: String,
        default: false
    },
    deletedBy:{
        account_id:String,
        deletedAt:Date
    },
    updatedBy:[{
        account_id:String,
        updatedAt:Date
    }]
},{
    timestamps:true
})
const product= mongoose.model('product',productSchema,"product")

module.exports=product