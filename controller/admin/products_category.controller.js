module.exports.products= async(req,res) =>{
    res.render("Admin/pages/products_category/index",{
        pagetitle:"danh sach san pham ",
    });
}

module.exports.creat=async(req,res)=>{
    res.render("Admin/pages/products_category/create.pug",{
        pagetitle:"tao danh muc san pham ",
    });
}