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