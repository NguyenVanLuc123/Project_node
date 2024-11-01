const Product = require("../../model/product.model")
module.exports.index= async  (req, res) => {
    const products= await Product.find({
        status: "true",
        deleted: "false"
    }).sort({position:"desc"});

    products.forEach(item=>{
        item.newprice=(item.price *(100-item.discountPercentage)/100).toFixed(0)
    })

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
        console.log(products);
        res.render("client/pages/product/detail",{
          products:products,
          pagetitle:" chi tiet san pham ",
      });
        }catch(erorr){
          res.redirect(`/products`)
        }
}
