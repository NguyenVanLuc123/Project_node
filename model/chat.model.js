const mongoose=require("mongoose")
slug = require('mongoose-slug-updater'),
mongoose.plugin(slug)


const chatsSchema =new mongoose.Schema(
    {
       user_id:String,
       room_chat_id: String,
       content:String,
       images:String,
       deleted:{
        type:Boolean,
        default:false
       },
       deletedAt:Date

},{
    timestamps:true
})
const Chat= mongoose.model('Chat',chatsSchema,"chats")

module.exports=Chat