const setingsModel= require("../../model/setings-general.model")
const systemconfig=require("../../config/system")
const md5=require("md5")

module.exports.general=async(req,res)=>{
    const record= await setingsModel.findOne({});
    res.render("Admin/pages/setings/general",{
        pagetitle:"Cai dat chung",
        record:record
    });
}

module.exports.generalPatch= async(req,res)=>{
    
    const setingGeneral = await setingsModel.findOne({});

    if(!setingGeneral){
    const records= new setingsModel(req.body);
    await records.save();
    }
    else{
        const records= await setingsModel.updateOne({
            _id:setingGeneral.id
        },req.body)
    }
    req.flash('Success', `Cap nhat seting thành công!`);
    res.redirect("back")
}