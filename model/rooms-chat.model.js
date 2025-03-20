const mongoose=require("mongoose")
slug = require('mongoose-slug-updater'),
mongoose.plugin(slug)


const RoomchatSchema =new mongoose.Schema(
    {
    title:String,
    avatar:String,
    typeRoom:String,
    status:String,
    color:String,
    users:[
        {
            user_id:String,
            role:String
        }
    ],
    deleted:{
        type:Boolean,
        default:false
    },
    deletedAt:Date
},{
    timestamps:true
})
const Roomchat= mongoose.model('Roomchat',RoomchatSchema,"rooms-chat")

module.exports=Roomchat