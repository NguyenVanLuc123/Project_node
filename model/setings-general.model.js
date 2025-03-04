const mongoose=require("mongoose")
slug = require('mongoose-slug-updater'),
mongoose.plugin(slug)


const setings_generalSchema =new mongoose.Schema(
    {
    WebsiteName:String,
    logo:String,
    phone:String,
    email:String,
    address:String,
    copyright:String
},{
    timestamps:true
})
const setings_general= mongoose.model('setings_general',setings_generalSchema,"setings-general")

module.exports=setings_general