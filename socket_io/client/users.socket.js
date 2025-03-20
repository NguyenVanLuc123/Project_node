const user_model = require("../../model/user.model");
const romm_chat_model=require("../../model/rooms-chat.model");
module.exports = async (res) => {

    _io.once('connection', (socket) => {
        //nguoi dung gui yeu cau ket ban
        socket.on("CLIENT_ADD_FRIEND", async (user_id) => {
            const Myuserid = res.locals.user.id;//id cua a
            // them id cuar A vaof accetfriend cuar b
            const exitUserB = await user_model.findOne({
                _id: user_id,//id cua b
                acceptFriend: Myuserid
            })
            if (!exitUserB) {
                const addIdAToUserB = await user_model.updateOne({
                    _id: user_id
                }, {
                    $push: { acceptFriend: Myuserid }
                });
            }

            // them id cuar b  vaof requestFriend cuar a

            const exitUserA = await user_model.findOne({
                _id: Myuserid,//id cua b
                requestFriend: user_id
            });
            if (!exitUserA) {
                const addIdBtoUserA = await user_model.updateOne({
                    _id: Myuserid
                }, {
                    $push: { requestFriend: user_id }
                });

                //lay do dai acceptfirnd cua b tra ve cho b
                const inforUserB = await user_model.findOne({
                    _id: user_id
                })
                const lengthAcceptFriend = inforUserB.acceptFriend.length;

                socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                    userId: user_id,
                    lengthAcceptFriend: lengthAcceptFriend
                });

                //lay thong tin nguoi A ban tra ve tro b
                const inforUserA = await user_model.findOne({
                    _id: Myuserid
                });
                
                socket.broadcast.emit("SERVER_RETURN_HUMAN_ACCEPT_FRIEND", {
                    userid:user_id,
                    infouser: inforUserA,
                });

                //ay thong tin A gui cho B de xoa hien o ben b trang(not-friend)
                socket.broadcast.emit("SERVER_RETURN_HUMAN_NOT_FRIEND", {
                    user_id:user_id,
                    infouser: inforUserA,
                });

            }
        });
        //nguoi dung huy yeu cau ket ban
        socket.on("CLIENT_CANCEL_FRIEND", async (user_id) => {

            const Myuserid = res.locals.user.id;//id cua a
            // cancel id cuar A trong accetfriend cuar b

            const cancelIdAToUserB = await user_model.updateOne(
                { _id: user_id },
                { $pull: { acceptFriend: Myuserid } } 
            );



            // cancelcancel id cuar b  trongtrong requestFriend cuar a



            const cancelIdBtoUserA = await user_model.updateOne({
                _id: Myuserid
            }, {
                $pull: { requestFriend: user_id }
            });
            //lay do dai acceptfirnd cua b tra ve cho b
            const inforUserB = await user_model.findOne({
                _id: user_id
            })
            const lengthAcceptFriend = inforUserB.acceptFriend.length;

            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                userId: user_id,
                lengthAcceptFriend: lengthAcceptFriend
            });
            //lay thong tin nguoi A ban tra ve tro b
            const inforUserA = await user_model.findOne({
                _id: Myuserid
            });

           
            socket.broadcast.emit("SERVER_RETURN_DELETE_HUMAN_ACCEPT_FRIEND", {
                userid:user_id,
                infouser: inforUserA,
            });

            //lay thong tin nguoi A ban tra ve tro b hien len tren not_friend
            socket.broadcast.emit("SERVER_RETURN_CANCEL_HUMAN_NOT_FRIEND", {
                user_id:user_id,
                infouser: inforUserA,
            });


        });
        //nguoi dung tu choi yeu cau ket ban
        socket.on("CLIENT_REFUSE_FRIEND", async (user_id) => {

            const Myuserid = res.locals.user.id;//id cua a
            // cancel id cuar A trong requestFriend cuar b

            const refuseIdAToUserB = await user_model.updateOne(
                { _id: user_id },
                { $pull: { requestFriend: Myuserid } } // Xóa Myuserid khỏi mảng acceptFriend
            );



            // cancel id cuar b  trong acceptFriend cuar a



            const refuseIdBtoUserA = await user_model.updateOne({
                _id: Myuserid
            }, {
                $pull: { acceptFriend: user_id }
            });

            
        });
        //nguoi dung chap nhan yeu cau 
        socket.on("CLIENT_ACCEPT_FRIEND", async (user_id) => {

            const Myuserid = res.locals.user.id;//id cua a
            //them {user_id, room_chat_id} cua A vaof friendList cuar B
            // cancel id cuar A trong requestFriend cuar b
            const frienedA = await user_model.findOne({
                _id: user_id,
                friendList: { user_id: Myuserid }
            });
            const exitUserAinB = await user_model.findOne({
                _id: user_id,
                requestFriend: Myuserid
            });

            const frienedB = await user_model.findOne({
                _id: Myuserid,
                friendList: { user_id: user_id }
            });
            const exitUserBinA = await user_model.findOne({
                _id: Myuserid,
                acceptFriend: user_id
            })
            let roomchat;
            let exitRoomchat;
            //tao phong chat
            if(exitUserBinA&&exitUserAinB){
                 exitRoomchat= await romm_chat_model.findOne({
                    "users.user_id": { $all: [user_id,Myuserid] }, // Đảm bảo cả 2 user_id tồn tại trong users
                    
                    "users": { $size: 2 }
                })
                if(exitRoomchat){
                    const id_rooom=exitRoomchat.id;
                    await romm_chat_model.updateOne({
                        _id:id_rooom
                    },{
                        deleted:"false"
                    });
                }
                else{
                roomchat= new romm_chat_model({
                    typeRoom:"friend",
                    users:[
                        {
                            user_id:user_id,
                            role:"supperAdmin"
                        },
                        {
                            user_id:Myuserid,
                            role:"supperAdmin"
                        }
                    ],
                });
                await roomchat.save();
            }
            
            }
            if (exitUserAinB && !frienedA) {
                const refuseIdAToUserB = await user_model.updateOne(
                    { _id: user_id },
                    {
                        $push: {
                            friendList: {
                                user_id: Myuserid,
                                room_chat_id:  roomchat ? roomchat.id : exitRoomchat.id 
                            }
                        },
                        $pull: { requestFriend: Myuserid }
                    }
                    
                );
            }
            // cancel id cuar b  trong acceptFriend cuar a
            //them {user_id, room_chat_id} cua b vaof friendList cuar a
         
            if (exitUserBinA && !frienedB) {
                const refuseIdBtoUserA = await user_model.updateOne({
                    _id: Myuserid
                }, {
                    $push: {
                        friendList: {
                            user_id: user_id,
                            room_chat_id:  roomchat ? roomchat.id : exitRoomchat.id 
                        }
                    },
                    $pull: { acceptFriend: user_id }
                });
            }


        });
        //nguoi dung uy ket ban
        socket.on("CLIENT_UN_FRIEND", async (user_id) => {

            const Myuserid = res.locals.user.id;//id cua a
            // cancel id cuar A trong Friendlist cuar b

            //xoa roomchat
            const userA= await user_model.findOne({
                _id:Myuserid
             });
             const friendRecord = userA.friendList.find(friend => friend.user_id === user_id);
             const id_rooom=friendRecord.room_chat_id;
             await romm_chat_model.updateOne({
                _id:id_rooom
             },{
                deleted:"true"
             })


            const refuseIdAToUserB = await user_model.updateOne(
                { _id: user_id },
                { $pull: { friendList: { user_id: Myuserid } } }
            );
            

            // cancel id cuar b  trong friendList cuar a

            const refuseIdBtoUserA = await user_model.updateOne({
                _id: Myuserid
            }, {
                $pull: { friendList: { user_id: user_id } }
            });

            
             
        });
      
        

    });
}

