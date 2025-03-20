const User_model= require("../../model/user.model");
const usersSocket= require("../../socket_io/client/users.socket");
module.exports.notfriend= async(req,res)=>{
//socket
    usersSocket(res);
//socket
    const userid= res.locals.user.id;

    const myuser= await User_model.findOne({
        _id:userid
    })
    const requestFriends= myuser.requestFriend;
    const acceptFriends=myuser.acceptFriend;
    const friendLists = myuser.friendList.map(friend => friend.user_id);
    const users= await User_model.find({
        $and:[
            {_id:{$ne:userid}},
            {_id: { $nin: requestFriends}},
            {_id: { $nin: acceptFriends}},
            {_id: { $nin: friendLists}}
        ],
        status:"active",
        deleted: false
    }).select("avatar fullName ");
    res.render("client/pages/users/not-friend", {
        pagetitle: "not-friend",
        users:users,
    });
}

module.exports.request= async(req,res)=>{
    //socket
    usersSocket(res);
    //socket
    const user_id= res.locals.user.id;
    const myuser= await User_model.findOne({
        _id:user_id
    });
    const requestFriends= myuser.requestFriend;
    const users= await User_model.find({
        _id:{$in: requestFriends},
        status:"active",
        deleted:false
    }).select("id avatar fullName");
    res.render("client/pages/users/request", {
        pagetitle: "request",
        users:users
    });
}
module.exports.accept= async(req,res)=>{
    //socket
    usersSocket(res);
    //socket
    const user_id= res.locals.user.id;
    const myuser= await User_model.findOne({
        _id:user_id
    });
    const acceptFriends= myuser.acceptFriend;
    const users= await User_model.find({
        _id:{$in: acceptFriends},
        status:"active",
        deleted:false
    }).select("id avatar fullName");
    res.render("client/pages/users/accept", {
        pagetitle: "request",
        users:users
    });
}
module.exports.listfriend=async(req,res)=>{
    //socket
    usersSocket(res);
    //socket
    const user_id= res.locals.user.id;
    const myuser= await User_model.findOne({
        _id:user_id
    });
    const friendLists =myuser.friendList;
    const friendListsid = myuser.friendList.map(friend => friend.user_id);
    const users= await User_model.find({
        _id:{$in: friendListsid},
        status:"active",
        deleted:false
    }).select("id avatar fullName statusOnline");

    users.forEach(user =>{
        const inforUser= friendLists.find(item =>item.user_id==user.id)
       
        user.roomChatid=inforUser.room_chat_id;
    })
    res.render("client/pages/users/listfriend", {
        pagetitle: "request",
        users:users
    });
}