const product_category = require("../../model/product_category.model")
const products = require("../../model/product.model")
const creata = require("../../helpers/creatTree")
module.exports.index = async (req, res) => {

    let finds = {
        deleted: false,
        status: true,
        featured: 1
    }

    const record = await products.find(finds).limit(6);


    record.forEach(item => {
        item.newprice = (item.price * (100 - item.discountPercentage) / 100).toFixed(0)
    })
    //san pham moi
    const productsNew = await products.find({
        status: "true",
        deleted: "false"
    }).sort({ position: "desc" }).limit(6);

    productsNew.forEach(item => {
        item.newprice = (item.price * (100 - item.discountPercentage) / 100).toFixed(0)
    })

    res.render("client/pages/home/index", {
        pagetitle: "trang chu ",
        feature_products: record,
        productsNew: productsNew
    });
};