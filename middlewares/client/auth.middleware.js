const usermodel=require(`../../model/user.model.js`)

module.exports.userinfo=async(req,res,next)=>{

    if(!req.cookies.token_user){
        res.redirect(`/user/login`);
        return;
    }
   if(req.cookies.token_user){
    const user=await usermodel.findOne({token:req.cookies.token_user,deleted:false}).select("-password");
   if(!user){
    res.redirect(`/user/login`);
    return;
   }
   res.locals.user=user;
}
    next();
   
}