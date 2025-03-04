const mongoose=require("mongoose")



const Roles_Schema =new mongoose.Schema({
    title: String,
    description:String,
    permissions:{
        type:Array,
        default:[]
    },
    deleted:{
        type: String,
        default: false
    },
    deletedAt:Date
},{
    timestamps:true
})
const Role= mongoose.model('Role',Roles_Schema,"Roles"
)

module.exports=Role