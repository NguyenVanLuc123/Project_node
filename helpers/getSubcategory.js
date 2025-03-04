const product_category = require("../model/product_category.model")
module.exports.getSubCategory= async (perentID)=>{
    const getCategory= async (parentId)=>{
        const subs = await product_category.find({
          parent_id : parentId,
          deleted : false,
          status:true
        }
        );
      
        let allSub=[...subs];
        for(const sub of subs){
          const childs = await getCategory(sub._id);
          allSub=allSub.concat(childs);
        }
      
        return allSub;
      }
const result=await getCategory(perentID);
return result;
}