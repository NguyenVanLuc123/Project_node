const roomChat_model= require("../../model/rooms-chat.model")
module.exports.isAccess=async(req,res,next)=>{
    const user_id= res.locals.user.id;
    const roomchatid=req.params.roomChatid;
    try {
        const isAccessRoomchat= await roomChat_model.findOne({
            _id:roomchatid,
            "users.user_id":user_id,
            deleted: false,
        });
        if(isAccessRoomchat){
        next();}
        else{
            res.redirect("/");
        }
    } catch (error) {
        res.redirect("/");
    }
    
}