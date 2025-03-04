const chatmodel= require("../../model/chat.model")
const usermodel=require("../../model/user.model")
module.exports.index = async (req, res) => {
    const userId=res.locals.user.id;
    const fullName=res.locals.user.fullName;
    //socket.io
    _io.once('connection', (socket) => {
        console.log('a user connected',socket.id);
        
      socket.on('CLIENT_SEND_MESSAGE',async (content)=>{
          const chat =new chatmodel({
            user_id:userId,
            content:content
          });
          await chat.save();

          //tra dât ve cho client
          _io.emit("SERVER_RETURN_MESSGAE",{
            userId:userId,
            fullName:fullName,
            content:content
          })
        })
        socket.on("CLENT_SEND_TYPING",(type)=>{
          socket.broadcast.emit("SERVER_RETURN_TYPING",{
            userId:userId,
            fullName:fullName,
            type:type
          })
        });
      });
      

      const chats=await chatmodel.find({
        deleted:false
      });

      for(const chat of chats){
        const infoUser= await usermodel.findOne({
          _id: chat.user_id
        }).select("fullName");
        chat.infoUser=infoUser;
      }
    //end sokcet.io
    res.render("client/pages/chat/index", {
        pagetitle: "Chat",
        chats:chats
    });
};