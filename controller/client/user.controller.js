const userModel= require("../../model/user.model")
const md5=require("md5")
const sendmailHelper= require("../../helpers/sendmail")
const generate= require("../../helpers/generate")
const cartModel= require("../../model/carts.model")
const forgotPasswordModel=require("../../model/forgotpassword.model")
module.exports.register=async(req,res)=>{
    if(req.cookies.token_user){
        res.redirect('/');
        return;
    }
    res.render("client/pages/user/register", {
        pagetitle: "Dang ky tai khoan",
    });
}

module.exports.registerPost=async(req,res)=>{
    const exitEmail =await userModel.findOne({
        email:req.body.email,
        deleted:false
    }) 
    if(exitEmail){
        req.flash("error","email da ton tai")
        res.redirect("back")
    }

    req.body.password=md5(req.body.password);

    const user= userModel(req.body);
    await user.save();

    res.cookie("token_user",user.token);
   
   res.redirect("/");
}

module.exports.login=async(req,res)=>{
    if(req.cookies.token_user){
        res.redirect('/');
        return;
    }
    res.render("client/pages/user/login", {
        pagetitle: "Dang nhap tai khoan",
    });
}

module.exports.loginPost=async(req,res)=>{
    const email= req.body.email;
    const password=req.body.password;
  
    const user= await userModel.findOne({
        email:email,
        deleted:false
    });
    if(!user){
        req.flash("error","email khong ton tai")
        res.redirect("back");
        return;
    }
    if(md5(password)!=user.password){
        req.flash("error","sai mat khau")
        res.redirect("back");
        return;
    }
    if(user.status=="inactive"){
        req.flash("error","tai khoan da bi khoa")
        res.redirect("back");
        return;
    }

    await userModel.updateOne({
        _id:user.id
    },
    {statusOnline:"online"});

    _io.once('connection', (socket) => {
        
            socket.broadcast.emit("SERVER_RETURN_CHECK_ONLINE", {
               user_id:user.id });
    });
    //luu user id vao model Carts
    
    const cartDefault= await cartModel.findOne({ _id:req.cookies.cartId});
    
    const CartUser=await cartModel.findOne({ user_id:user.id});

    if (!cartDefault?.user_id && !CartUser) {
        try {
            await cartModel.updateOne(
                { _id: req.cookies.cartId }, 
                { user_id: user.id }
            );
        } catch (error) {
            console.error("Lỗi cập nhật giỏ hàng:", error);
        }
    }
    
    else if(!CartUser){
        const newCart= new cartModel();
        await newCart.save();

        await cartModel.updateOne({
            _id:newCart.id
        },{
            user_id:user.id
        })
    }


    res.cookie("token_user",user.token)
    res.redirect("/")
}

module.exports.logout= async(req,res)=>{
    const user= await userModel.findOne({
        token:req.cookies.token_user,
        deleted:false
    }).select("-password");
    if(user){
    await userModel.updateOne({
        _id:user.id
    },
    {statusOnline:"offline"})

    _io.once('connection', (socket) => {
        
        socket.broadcast.emit("SERVER_RETURN_CHECK_OFFLINE", {
           user_id:user.id });
});
}
    res.clearCookie("token_user");
    res.redirect("/")
}

module.exports.forgotPassword=async(req,res)=>{
    res.render("client/pages/user/forgotPassword", {
        pagetitle: "Quen mat khau",
    });
}

module.exports.forgotPasswordPost=async(req,res)=>{
    const email = req.body.email;
    const user= userModel.findOne({
        email:email,
        deleted:false
    });

    if(!user){
        req.flash("error","email khong ton tai ")
        res.redirect("back");
        return;
    }

    //tao ma otp , email vao collection forgotpassword
   const ObjectforgotPassword={
    email:email,
    otp:generate.generateRandomNumber(6),
    expireAt:Date.now()
   };
    const forgotpassword= forgotPasswordModel(ObjectforgotPassword);
    await forgotpassword.save();

    const subject="Ma OTP xac minh lay laij mat khau";

    const html=`
    Ma OTP xac minh la: <b>${ObjectforgotPassword.otp}.</b> luu y khong duoc de lo ma otp thoi han su dung la 60s
    `
    
    sendmailHelper.sendmail(email,subject,html);


    res.redirect(`/user/password/otp?email=${email}`);
}

module.exports.otpPassword=async(req,res)=>{
    res.render("client/pages/user/otpPassword", {
        pagetitle: "Quen mat khau",
        email:req.query.email
    });

}

module.exports.otpPasswordPost= async(req,res)=>{
    const email=req.body.email;
    const otp=req.body.otp

    const resuilt= await forgotPasswordModel.findOne({
        email:email,
        otp:otp
    })
     if(!resuilt){
        req.flash("error","sai ma otp ")
        res.redirect("back");
        return;
     }
     const user= await userModel.findOne({
        email:email
     })
     res.cookie("token_user",user.token)
     res.redirect("/user/password/reset")
}

module.exports.ResetPassword=async(req,res)=>{
    if(req.cookies.token_user){
    res.render("client/pages/user/ResetPassword", {
        pagetitle: "Quen mat khau",
        email:req.query.email
    });}
    else{
        res.redirect("/");
    }
}

module.exports.ResetPasswordPost=async(req,res)=>{
    if(req.cookies.token_user){
       await userModel.updateOne({
        token:req.cookies.token_user
       },{
        password:md5(req.body.Newpassword)
       })
       res.redirect("/user/login")
    }
    else{
        res.redirect("/");
    }
}

module.exports.info=async(req,res)=>{


    res.render("client/pages/user/info", {
        pagetitle: "Thong tin tai khoan",
        
    });
}