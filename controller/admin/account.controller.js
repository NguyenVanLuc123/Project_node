const Account=require("../../model/Account.model")
const Role=require("../../model/roles.model")
const systemconfig=require("../../config/system")
const md5=require("md5")
module.exports.index= async (req, res) => {

    let find={
     deleted:false
    }
 
    const record = await Account.find(find).select("-password-token");

    for(const item of record    ){
        const role=await Role.findOne({_id:item.role_id,deleted:false});

        item.role=role;
    }
     res.render("Admin/pages/accounts/index",{
         pagetitle:"Danh sach tai khoan",
         record:record
     });
    };

module.exports.create= async (req, res) => {
    let find={
        deleted:false
       }
    const roles = await Role.find(find);
    res.render("Admin/pages/accounts/create",{
        pagetitle:"Them moi tai khoan",
        roles:roles
    });
}
module.exports.createPost=async(req,res)=>{
    const emailExit=await Account.findOne({email:req.body.email,deleted:false})
    if(emailExit){
        req.flash("error",`Email ${req.body.email} da ton tai`)
        res.redirect("back")
    }
    else{
    req.body.password=md5(req.body.password)
    console.log(req.body)
    const record=new Account(req.body)
    await record.save()
    req.flash("success","Tao tai khoan thanh cong")
    res.redirect(`${systemconfig.prefixAdmin}/accounts`)
    }
}

module.exports.changeStatus= async(req,res)=>{
    // console.log(req.params);
  
    const status=req.params.status;
    const id = req.params.id;
    
    await Account.updateOne({_id:id},{status:status});
    req.flash('Success', 'Cập nhật trạng thái thành công!');
  
    res.redirect("back");
}

module.exports.repair=async(req,res)=>{
    const id=req.params.id;
    const record=await Account.findOne({_id:id,deleted:false});
    let find={
        deleted:false
       }
    const roles = await Role.find(find);
    res.render("Admin/pages/accounts/repair",{
        pagetitle:"Sua tai khoan",
        record:record,
        roles:roles
    });
}
module.exports.repairPost=async(req,res)=>{
    const id=req.params.id;
    const emailExit=await Account.findOne({_id:{$ne:id},email:req.body.email,deleted:false})
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

    await Account.updateOne({_id:id},{$set:req.body});
    req.flash("Success","Sua tai khoan thanh cong")
    res.redirect(`${systemconfig.prefixAdmin}/accounts`);
    }
    
}

module.exports.delete=async(req,res)=>{
    const id=req.params.id;

    try{
    if(id!="6763f235f3630484f81f4e3a"){
    await Account.deleteOne({_id:id});
    req.flash("Success","xoa tai khoan thanh cong");
    res.redirect("back");}
    else{
    req.flash("error","khong the xoa tai khoan admin");
    res.redirect("back");
    }}
    catch(error){
        console.log("loi xay ra",error);
    }
}
