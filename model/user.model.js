const mongoose=require("mongoose")

const generate= require("../helpers/generate");

const UserSchema =new mongoose.Schema({
   fullName:String,
   email:String,
   password:String,
   token:{
    type:String,
    default:generate.generateRandomString(20)
   },
   phone:String,
   avatar:String,
   friendList:[
    {
        user_id: String,
        room_chat_id:String
    }
   ],
   acceptFriend:Array,
   requestFriend:Array,
   statusOnline:String,
   status:{
    type:String,
    default:"active"
   },
    deleted:{
        type: String,
        default: false
    },
    deletedAt:Date
},{
    timestamps:true
})
const User= mongoose.model('User',UserSchema,"users")

module.exports=User