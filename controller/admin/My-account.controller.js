const User=require("../../model/Account.model")
const systemconfig=require("../../config/system")
module.exports.index=async(req,res,next)=>{
    res.render("Admin/pages/my-account/index.pug")
}
module.exports.edit=async(req,res,next)=>{

    const finduser={
        deleted:false,
        _id:req.params.id
    }
    const user=await User.findOne(finduser).select("-password-token");


    res.render("Admin/pages/my-account/repair.pug",
        {record:user}
    )
}
module.exports.update=async(req,res,next)=>{
    try {
        const id=req.params.id;
        const emailExit=await User.findOne({_id:{$ne:id},email:req.body.email,deleted:false})
        if(emailExit){
            req.flash("error",`Email ${req.body.email} da ton tai`)
            res.redirect("back")
        }
        else{
        if(req.body.password){
            req.body.password=md5(req.body.password)
        }
        else{
            delete req.body.password
        }
        console.log(req.body)
        await User.updateOne({_id:id},{$set:req.body});
        req.flash("Success","Sua tai khoan thanh cong")
        res.redirect(`${systemconfig.prefixAdmin}/my-account`);
        }
    } catch (error) {
        next(error)
    }
}

