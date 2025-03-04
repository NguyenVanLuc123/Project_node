const Account=require(`../../model/Account.model.js`)
const SystemConfig=require(`../../config/system.js`)
const Role=require(`../../model/roles.model.js`)
module.exports.requireAuth=async(req,res,next)=>{
   if(!req.cookies.token){
    res.redirect(`${SystemConfig.prefixAdmin}/auth/login`);
    
   }
   else{
   const user=await Account.findOne({token:req.cookies.token}).select("-password");
   if(!user){
    res.redirect(`${SystemConfig.prefixAdmin}/auth/login`);
   }else{
    const role=await Role.findOne({_id:user.role_id});
    console.log(user)
    res.locals.user=user;
    res.locals.role=role;
    next();
   }
}
}