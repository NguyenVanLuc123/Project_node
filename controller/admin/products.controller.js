const Product = require("../../model/product.model")
const filterStatus=require("../../helpers/filter")
const search = require("../../helpers/search");
const pagePagination = require("../../helpers/pagePagination");
const product = require("../../model/product.model");

const systeamCOnfig=require("../../config/system")
// [GET]  admin get product
module.exports.products= async(req,res) =>{

    
     

    let find= {
      deleted:false  
    };

    //filter ALL-active-unactive
    if(req.query.status){
    find.status=req.query.status
    }
    //filter ALL-active-unactive

    //search form
    search(req.query.keyword,find);
    
     //search form
     
    //paginTION


    let objectPaginayion={
      limitItem:4,
      skip_page:0,
      current_page:1,
      totalPage:0
    }

    const totalProducts = await Product.countDocuments(find);


    pagePagination(req.query,objectPaginayion,totalProducts);
   
    //paginTION
    
  
    const products= await Product.find(find).sort({position:"desc"}).limit(objectPaginayion.limitItem).skip(objectPaginayion.skip_page);
   

    res.render("admin/pages/products/index",{
        pagetitle:"danh sach san pham ",
        products:products,
        filterStatus: filterStatus(req.query),
        Page_pagi:objectPaginayion,
    });
}
 
module.exports.changeStatus= async(req,res)=>{
  // console.log(req.params);

  const status=req.params.status;
  const id = req.params.id;
  
  await product.updateOne({_id:id},{status:status});
  req.flash('Success', 'Cập nhật trạng thái thành công!');

  res.redirect("back");
}

module.exports.changeMutil= async(req,res)=>{
   const IDs=req.body.ids.split(',').map(item => item.trim());

  if(req.body.type=="delete"){
    await product.updateMany({ _id: { $in: IDs} },{$set:{
      deleted:true,
      deletedAt: new Date()
    }});
    req.flash('Success', `Xóa ${IDs.length} sản phẩm thành công!`);
}
  else if(req.body.type=="change-position"){
  for (const item of IDs) {
    let[id,position]=item.split("-")
    position=parseInt(position)
    await product.updateOne({_id:id},{position:position})
  }
  req.flash('Success', `đổi vị trí ${IDs.length} sản phẩm thành công!`);
}
  else if(req.body.type=="true"){
  await product.updateMany(
    { _id: { $in: IDs} },  
    { $set: { status:req.body.type } }   
  )
  req.flash('Success', `Cập nhật trạng thái của ${IDs.length} sản phẩm thành công!`);
}
else if(req.body.type=="false"){
  await product.updateMany(
    { _id: { $in: IDs} },  
    { $set: { status:req.body.type } }   
  )
  req.flash('Success', `Cập nhật trạng thái của ${IDs.length} sản phẩm thành công!`);
}
  res.redirect("back");
}


module.exports.deleteProduct= async (req,res)=>{
  const id=req.params.id
 
  // await product.deleteOne({ _id: id });
  await product.updateOne({ _id: id },{
    deleted:true,
    deletedAt: new Date()
  });
  res.redirect("back");
}

module.exports.create=async (req,res)=>{
  res.render("admin/pages/products/create",{
    pagetitle:"tao moi san pham ",
});
}


module.exports.createPost= async(req,res)=>{


  req.body.price=parseInt(req.body.price);
  req.body.discountPercentage=parseInt( req.body.discountPercentage);
  req.body.stock=parseInt( req.body.stock);
  if(req.body.position==""){
    const countProduct= await Product.countDocuments();
    req.body.position=countProduct+1;
  }
  else{
    req.body.position=parseInt(req.body.position)
  }
 
  if(req.file){
  req.body.thumbnail=`/uploads/${req.file.filename}`;
  }
  const product= new Product(req.body);
  await product.save();
  res.redirect(`${systeamCOnfig.prefixAdmin}/products`)
}


module.exports.repair=async (req,res)=>{

  try{
  
  let find= {
    _id:req.params.id
  };
  const products= await Product.find(find);
  res.render("admin/pages/products/repair",{
    products:products,
    pagetitle:" sủa san pham ",
});
  }catch(erorr){
    res.redirect(`${systeamCOnfig.prefixAdmin}/products`)
  }
}
module.exports.update= async(req,res)=>{


  req.body.price=parseInt(req.body.price);
  req.body.discountPercentage=parseInt( req.body.discountPercentage);
  req.body.stock=parseInt( req.body.stock);
  req.body.position=parseInt(req.body.position);
 
  if(req.file){
  req.body.thumbnail=`/uploads/${req.file.filename}`;
  }
  await Product.updateOne(
    { _id: req.body._id },  // Điều kiện để tìm document
    { $set: req.body },     // Dữ liệu mới từ req.body
    { runValidators: true } // Kiểm tra ràng buộc dữ liệu
  );
  req.flash('Success', `sửa sản phẩm thành công!`);
  res.redirect(`${systeamCOnfig.prefixAdmin}/products`)
}


module.exports.detail=async (req,res)=>{

  try{
  
  let find= {
    _id:req.params.id
  };
  const products= await Product.find(find);
  console.log(products)
  res.render("admin/pages/products/detail",{
    products:products,
    pagetitle:" chi tiet san pham ",
});
  }catch(erorr){
    res.redirect(`${systeamCOnfig.prefixAdmin}/products`)
  }
}
//[GET] admin get product