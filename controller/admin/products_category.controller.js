const product_category = require("../../model/product_category.model")
const systeamCOnfig = require("../../config/system");
const filterStatus = require("../../helpers/filter")
const search = require("../../helpers/search");
const pagePagination = require("../../helpers/pagePagination");
module.exports.products = async (req, res) => {

    let find = {
        deleted: false
    };
    //filter ALL-active-unactive
    if (req.query.status) {
        find.status = req.query.status
    }
    //filter ALL-active-unactive

    //search form
    search(req.query.keyword,find);
    
     //search form  


     let objectPaginayion={
        limitItem:4,
        skip_page:0,
        current_page:1,
        totalPage:0
      }
  
      const totalProducts = await product_category.countDocuments(find);
  
  
      pagePagination(req.query,objectPaginayion,totalProducts);
     
      //paginTION

      let sort={}
      if(req.query.select_key&&req.query.sortvalue){
       
        sort[req.query.select_key]=req.query.sortvalue;
      }
      else{
        sort.position="desc";
      }
  
      if(req.query.sortvalue!="desc"&&req.query.sortvalue!="asc"){
        sort={};
        sort.position="desc";
      }
      const select_KEYVALUE=Object.keys(sort)+"-"+sort[Object.keys(sort)];
     
  
      //select-sort
    const record = await product_category.find(find).sort(sort).limit(objectPaginayion.limitItem).skip(objectPaginayion.skip_page);
    res.render("Admin/pages/products_category/index", {
        pagetitle: "danh sach danh muc ",
        record: record,
        filterStatus: filterStatus(req.query),
        select_KEYVALUE:select_KEYVALUE,
        Page_pagi:objectPaginayion,
    });
}

module.exports.creat = async (req, res) => {
    res.render("Admin/pages/products_category/create.pug", {
        pagetitle: "tao danh muc san pham ",
    });
}

module.exports.createPost = async (req, res) => {
    if (req.body.position == "") {
        const countProduct = await product_category.countDocuments();
        req.body.position = countProduct + 1;
    }
    else {
        req.body.position = parseInt(req.body.position)
    }
    const record = new product_category(req.body);
    await record.save();
    res.redirect(`${systeamCOnfig.prefixAdmin}/products_category`)
}

module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await product_category.updateOne({ _id: id }, { status: status });
    req.flash('Success', 'Cập nhật trạng thái thành công!');

    res.redirect("back");
}

module.exports.changeMutil= async(req,res)=>{
    const IDs=req.body.ids.split(',').map(item => item.trim());
 
   if(req.body.type=="delete"){
     await product_category.updateMany({ _id: { $in: IDs} },{$set:{
       deleted:true,
       deletedAt: new Date()
     }});
     req.flash('Success', `Xóa ${IDs.length} sản phẩm thành công!`);
 }
   else if(req.body.type=="change-position"){
   for (const item of IDs) {
     let[id,position]=item.split("-")
     position=parseInt(position)
     await product_category.updateOne({_id:id},{position:position})
   }
   req.flash('Success', `đổi vị trí ${IDs.length} sản phẩm thành công!`);
 }
   else if(req.body.type=="true"){
   await product_category.updateMany(
     { _id: { $in: IDs} },  
     { $set: { status:req.body.type } }   
   )
   req.flash('Success', `Cập nhật trạng thái của ${IDs.length} sản phẩm thành công!`);
 }
 else if(req.body.type=="false"){
   await product_category.updateMany(
     { _id: { $in: IDs} },  
     { $set: { status:req.body.type } }   
   )
   req.flash('Success', `Cập nhật trạng thái của ${IDs.length} sản phẩm thành công!`);
 }
   res.redirect("back");
 }

module.exports.detail = async (req, res) => {
    try {

        let find = {
            _id: req.params.id
        };
        const record = await product_category.find(find);
        res.render("Admin/pages/products_category/detail", {
            products: record,
            pagetitle: " chi tiet danh muc ",
        });
    } catch (erorr) {
        console.log(erorr)
        res.redirect(`${systeamCOnfig.prefixAdmin}/products_category`)
    }

}

module.exports.repair = async (req, res) => {
    try {

        let find = {
            _id: req.params.id
        };
        const record = await product_category.find(find);
        res.render("Admin/pages/products_category/repair", {
            products: record,
            pagetitle: " sủa danh muc",
        });
    } catch (erorr) {
        res.redirect(`${systeamCOnfig.prefixAdmin}/products_category`)
    }
}

module.exports.update = async (req, res) => {


    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);


    await product_category.updateOne(
        { _id: req.body._id },  // Điều kiện để tìm document
        { $set: req.body },     // Dữ liệu mới từ req.body
        { runValidators: true } // Kiểm tra ràng buộc dữ liệu
    );
    req.flash('Success', `sửa sản phẩm thành công!`);
    res.redirect(`${systeamCOnfig.prefixAdmin}/products_category`)
}
module.exports.deleteProduct = async (req, res) => {
    const id = req.params.id
    // await product.deleteOne({ _id: id });
    await product_category.updateOne({ _id: id }, {
        deleted: true,
        deletedAt: new Date()
    });
    res.redirect("back");
}