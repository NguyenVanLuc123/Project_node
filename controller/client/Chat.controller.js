const chatmodel= require("../../model/chat.model")
const usermodel=require("../../model/user.model")

const chatsocket =require("../../socket_io/client/chat.socket");
module.exports.index = async (req, res) => {
    const userId=res.locals.user.id;
    const fullName=res.locals.user.fullName;

    const roomChatid=req.params.roomChatid;
    //socket.io
   chatsocket.clientMasage(req,res);
       //end sokcet.io

      const chats=await chatmodel.find({
        room_chat_id:roomChatid,
        deleted:false
      });

      for(const chat of chats){
        const infoUser= await usermodel.findOne({
          _id: chat.user_id
        }).select("fullName");
        chat.infoUser=infoUser;
      }
   
    res.render("client/pages/chat/index", {
        pagetitle: "Chat",
        chats:chats,
        roomChatid:roomChatid
    });
};