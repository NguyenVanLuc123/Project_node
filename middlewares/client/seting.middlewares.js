const setingsModel=require("../../model/setings-general.model")

module.exports.settingGeneral= async(req,res,next)=>{
    const setingGeneral =await setingsModel.findOne({});

    res.locals.setingGeneral=setingGeneral;

    next();
}