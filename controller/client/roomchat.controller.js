const User_model= require("../../model/user.model");
const RoomChat_model= require("../../model/rooms-chat.model")
module.exports.index = async(req,res)=>{
    const userId= res.locals.user.id
    const listRoom = await RoomChat_model.find({
        typeRoom: "group",
        deleted: false,
        users: {
            $elemMatch: { user_id: userId } // Kiểm tra trong mảng users có user_id khớp không
        }
    });
    res.render("client/pages/room-chat/index", {
        pagetitle: "room-cat",
        listRoom:listRoom
    });
}


module.exports.create = async(req,res)=>{
    const listfriend= res.locals.user.friendList
    
    for(const friend of listfriend){
        const infor= await User_model.findOne({
            _id:friend.user_id
        }).select("fullName avatar");

        friend.infor=infor;
    }
    res.render("client/pages/room-chat/create", {
        pagetitle: "create-room",
        friendlist:listfriend
    });
}

module.exports.createPost = async(req,res)=>{
   const title= req.body.title;
   const usersId= [].concat(req.body.userid);
   if(usersId.length>=2){
   const datachat={
    title:title,
    typeRoom:"group",
    users:[]
   }
   usersId.forEach(userid => {
    datachat.users.push({
        user_id:userid.toString(),
        role:"user"
    })
    
   });
   

   datachat.users.push({
    user_id:res.locals.user.id,
    role:"supperAdmin"
});

    const room= new RoomChat_model(datachat);
    await room.save(); 
    res.redirect(`/chat/${room.id}`);

}
else{
    req.flash('error', 'Room chat phai toi thieu tu 3 nguoi tro len!');
    res.redirect("back");
}

}
