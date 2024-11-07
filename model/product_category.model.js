const mongoose=require("mongoose")
slug = require('mongoose-slug-updater'),
mongoose.plugin(slug)


const product_categorySchema =new mongoose.Schema({
    title: String,
    slug: { type: String, slug: "title", unique: true },
    parent_id:String,
    description:String,
    category:String,
    thumbnail: String,
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
const product_category= mongoose.model('product_category',product_categorySchema,"products_category"
)

module.exports=product_category