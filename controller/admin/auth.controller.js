const Account=require("../../model/Account.model")
const Role=require("../../model/roles.model")
const systemconfig=require("../../config/system")
const md5=require("md5")

module.exports.index=async(req,res)=>{
    const user=await Account.findOne({token:req.cookies.token});
    if(user){
        res.redirect(`${systemconfig.prefixAdmin}/dashboard`);
        return;
       }
    res.render("admin/pages/auth/login"),{
        pageTitle:"trang dang nhap"
    }
}
module.exports.login=async(req,res)=>{
   const email=req.body.email;
   const password=req.body.password;

   const user=await Account.findOne({email:email,deleted:false});
   console.log(user);
   if(!user){
    req.flash("error","Email không tồn tại");
     res.redirect("back");
     return;
   }
   else if(user.password!=md5(password)){
    req.flash("error","Mật khẩu không đúng");
    res.redirect("back");
    return;
   }
   else if(user.status=="false"){
    req.flash("error","Tài khoản đã bị khóa");
    res.redirect("back");
    return;
   }
    res.cookie("token",user.token);
    req.flash("Success","Đăng nhập thành công");
    res.redirect(`${systemconfig.prefixAdmin}/dashboard`);
  
}
module.exports.logout=async(req,res)=>{
    res.clearCookie("token");
    res.redirect(`${systemconfig.prefixAdmin}/auth/login`);
}
