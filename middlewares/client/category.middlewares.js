const product_category = require("../../model/product_category.model")
const creata=require("../../helpers/creatTree")
module.exports.categorys= async(req,res,next)=>{
    try{
    const productsCategory= await product_category.find({
        deleted:false
    });
    const newProductsCategory=creata.Tree(productsCategory); 
    
    res.locals.layoutProductsCategory= newProductsCategory;
    next();
}catch(error){
        next(error);
}
}