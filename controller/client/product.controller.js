const product = require("../../model/product.model");
const Product = require("../../model/product.model")
const product_category = require("../../model/product_category.model")
const NewProduct_price= require("../../helpers/ProductNewprice")
const getSubCategoryHelper=require("../../helpers/getSubcategory")
module.exports.index= async  (req, res) => {
    const products= await Product.find({
        status: "true",
        deleted: "false"
    }).sort({position:"desc"});

    NewProduct_price.PriceNew(products);

    res.render("client/pages/product/index",{
        pagetitle:"Danh sach san pham",
        products:products,
    });
};


module.exports.detail=async (req,res)=>{
    try{
        let find= {
          deleted:"false",
          slug:req.params.slug,
          status:"true"
        };
        const products= await Product.find(find);
        
        if(products.product_category_id){
          const category = await product_category.findOne({
            slug : req.params.slugCategory,
            deleted : false,
            status:true
          }
          );

          products.category=category;
        }

     products[0].newprice=NewProduct_price.PriceNewOne(products);


        res.render("client/pages/product/detail",{
          products:products,
          pagetitle:" chi tiet san pham ",
      });
        }catch(erorr){
          res.redirect(`/products`)
        }
}

module.exports.category=async(req,res)=>{
  try{
  const category = await product_category.findOne({
    slug : req.params.slugCategory,
    deleted : false,
    status:true
  }
  );



const listSubCategory= await getSubCategoryHelper.getSubCategory(category._id);
const listSubCategory_ID=listSubCategory.map(item=>item._id);
console.log(listSubCategory_ID)

  const newProducts = await product.find({
  product_category_id:{$in:[category._id,...listSubCategory_ID]},
  deleted: false
  }).sort({position:"desc"});

  NewProduct_price.PriceNew(newProducts);

res.render("client/pages/product/index",{
  pagetitle:category.title,
  products:newProducts,
});
}
  catch(error){
    req.flash('error', `Đã xảy ra lỗi: ${error.message}`);
    res.redirect('back')
  }
}