const products= require("../../model/product.model");
const ProductHelper= require("../../helpers/ProductNewprice")
module.exports.index=async(req,res)=>{
    const keyword= req.query.keyword;
    let newProduct=[];
    if(keyword){

    const keywordRegex= new RegExp(keyword,"i");
    
    const records= await products.find({
        deleted:false,
        title:keywordRegex,
        status:true
    });

    newProduct=ProductHelper.PriceNew(records)

}
    res.render("client/pages/search/index", {
        pagetitle: "trang chu ",
        keyword:keyword,
        products:newProduct
    });
}