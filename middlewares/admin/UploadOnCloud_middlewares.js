const uploadCloudinary =require("../../helpers/uploadcloudDinary")

module.exports.upload= async (req, res, next)=> {
    if(req.file){
    const result = await uploadCloudinary(req.file.buffer);
    console.log(result);
    req.body[req.file.fieldname] =result;   
    }
        next();
   
    
}