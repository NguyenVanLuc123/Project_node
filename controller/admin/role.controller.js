const Role = require("../../model/roles.model")

const systeamCOnfig=require("../../config/system")
module.exports.index= async (req, res) => {

   let find={
    deleted:false
   }

   const record = await Role.find(find);
    res.render("Admin/pages/role/index",{
        pagetitle:"Nhom quyen",
        record:record
    });
   };

module.exports.create=(req,res)=>{
    res.render("Admin/pages/role/create",{
        pagetitle:"Them moi nhom quyen"
    });
}

module.exports.createPost=async (req,res)=>{
try{
    const record= new Role(req.body);
    await record.save();
    req.flash('Success', `Tao nhom quyen thanh cong!`);
    res.redirect(`${systeamCOnfig.prefixAdmin}/roles`)
}catch (error){
  console.log(error)
}
}
module.exports.repair= async (req,res)=>{

    try {

        let find = {
            _id: req.params.id
        };

       
      
        const record = await Role.find(find);
       
       
        res.render("Admin/pages/role/repair", {
            record: record,
            pagetitle: " Sua nhom quyen",
        });
    } catch (erorr) {
        res.redirect(`${systeamCOnfig.prefixAdmin}/roles`)
        console.log(erorr);
    }
}

module.exports.update=async (req,res)=>{
    try{
        await Role.updateOne(
            { _id: req.body._id },  // Điều kiện để tìm document
            { $set: req.body },     // Dữ liệu mới từ req.body
            { runValidators: true } // Kiểm tra ràng buộc dữ liệu
        );
        req.flash('Success', `sửa nhóm quyền thành công!`);
        res.redirect(`${systeamCOnfig.prefixAdmin}/roles`)
    }catch(error){
        console.log(error)
    }
}
module.exports.detail=async(req,res)=>{
    try {

        let find = {
            _id: req.params.id
        };
        const record = await Role.find(find);
        res.render("Admin/pages/role/detail", {
            record:record,
            pagetitle: " chi tiet nhom quyen ",
        });
    } catch (erorr) {
        console.log(erorr)
        res.redirect(`${systeamCOnfig.prefixAdmin}/roles`)
    }

}

module.exports.deleteRole = async (req, res) => {
    try{
    const id = req.params.id
    // await product.deleteOne({ _id: id });
    await Role.updateOne({ _id: id }, {
        deleted: true,
        deletedAt: new Date()
    });
    req.flash('Success', `xoa nhom quyen thành công!`);
    res.redirect("back");
}catch(error){
    console.log(error);
}
}

module.exports.permission= async(req,res)=>{
    let find={
        deleted:false,
       }
    
       const record = await Role.find(find);
        res.render("Admin/pages/role/permission",{
            pagetitle:"Phan quyen",
            record:record
        });
       
}
module.exports.permissionPatch=async(req,res)=>{

    const permisions=JSON.parse(req.body.permission);

    for(const item of permisions){
       await Role.updateOne({_id:item.id},{permissions:item.permision});
    }
    req.flash('Success', `Cap nhat phan quyen thanh cong!`);
    res.redirect(`back`)
}