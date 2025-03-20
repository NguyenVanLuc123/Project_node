const chatmodel= require("../../model/chat.model")
const uploadCloudinary =require("../../helpers/uploadcloudDinary")
module.exports.clientMasage = async (req,res)=>{
    const userId=res.locals.user.id;
    const fullName=res.locals.user.fullName;
    const roomChatid=req.params.roomChatid;
    //socket.io
    _io.once('connection', (socket) => {
      socket.join(roomChatid)
        console.log('a user connected',socket.id);
        
      socket.on('CLIENT_SEND_MESSAGE',async (data)=>{
        
         let images=[];
         for(const imageBuffer of data.images){
          const link = await uploadCloudinary(imageBuffer);
          images.push(link);
         }
          const chat =new chatmodel({
            user_id:userId,
            room_chat_id:roomChatid,
            content:data.content,
            images:images
          });
          await chat.save();
          
          //tra dât ve cho client
          _io.to(roomChatid).emit("SERVER_RETURN_MESSGAE",{
            userId:userId,
            fullName:fullName,
            content:data.content,
            images:images
          })
        })
        socket.on("CLENT_SEND_TYPING",(type)=>{
          socket.broadcast.to(roomChatid).emit("SERVER_RETURN_TYPING",{
            userId:userId,
            fullName:fullName,
            type:type
          })
        });
      });
       //end sokcet.io
}