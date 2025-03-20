const Product = require("../../model/product.model")
const product_category = require("../../model/product_category.model")
const filterStatus=require("../../helpers/filter")
const search = require("../../helpers/search");
const pagePagination = require("../../helpers/pagePagination");
const product = require("../../model/product.model");
const creata=require("../../helpers/creatTree")
const systeamCOnfig=require("../../config/system")
const account=require("../../model/Account.model")
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
    //select-sort
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
    const products= await Product.find(find).sort(sort).limit(objectPaginayion.limitItem).skip(objectPaginayion.skip_page);
   
    for(const item of products){
     
      const Account = await account.findOne({_id:item.CreateBy.account_id})
      if(Account){
        item.account_name = Account.fullName
      }

      const updateBy= item.updatedBy.slice(-1)[0];
      if(updateBy){
      const userUpdateed= await account.findOne({_id:updateBy.account_id});
      if(userUpdateed){
      updateBy.account_name=userUpdateed.fullName;
      }
      }
     
    }
 
    res.render("Admin/pages/products/index",{
        pagetitle:"danh sach san pham ",
        products:products,
        select_KEYVALUE:select_KEYVALUE,
        filterStatus: filterStatus(req.query),
        Page_pagi:objectPaginayion,
    });
}
 
module.exports.changeStatus= async(req,res)=>{
  // console.log(req.params);

  const status=req.params.status;
  const id = req.params.id;
  try{
    const updatedBy={
      account_id:res.locals.user._id,
      updatedAt:new Date()
    }
  await product.updateOne({_id:id},{
    status:status,
    $push:{updatedBy:updatedBy}
  });
  req.flash('Success', 'Cập nhật trạng thái thành công!');
}catch(error){
  req.flash('Error', 'Cập nhật trạng thái thất bại!'+error);
}
  res.redirect("back");
}

module.exports.changeMutil= async(req,res)=>{
   const IDs=req.body.ids.split(',').map(item => item.trim());
try{
  if(req.body.type=="delete"){
const deletedBy={
  account_id:res.locals.user._id,
  deletedAt:new Date()
}
    await product.updateMany({ _id: { $in: IDs} },{$set:{
      deleted:true,
      deletedBy:deletedBy
    }});
    req.flash('Success', `Xóa ${IDs.length} sản phẩm thành công!`);
}
  else if(req.body.type=="change-position"){
  for (const item of IDs) {
    let[id,position]=item.split("-")
    position=parseInt(position);
    const updatedBy={
      account_id:res.locals.user._id,
      updatedAt:new Date()
    }
    await product.updateOne({_id:id},{position:position,$push:{updatedBy:updatedBy}})
  }
  req.flash('Success', `đổi vị trí ${IDs.length} sản phẩm thành công!`);
}
  else if(req.body.type=="true"){
    const updatedBy={
      account_id:res.locals.user._id,
      updatedAt:new Date()
    }
  await product.updateMany(
    { _id: { $in: IDs} },  
    { $set: { status:req.body.type },$push:{updatedBy:updatedBy} }   
  )
  req.flash('Success', `Cập nhật trạng thái của ${IDs.length} sản phẩm thành công!`);
}
else if(req.body.type=="false"){
  await product.updateMany(
    { _id: { $in: IDs} },  
    { $set: { status:req.body.type ,$push:{updatedBy:updatedBy}} }   
  )
  req.flash('Success', `Cập nhật trạng thái của ${IDs.length} sản phẩm thành công!`);
}
}catch(error){
  req.flash('Error', 'Cập nhật  thất bại!'+error);
}
  res.redirect("back");
}


module.exports.deleteProduct= async (req,res)=>{
  const id=req.params.id
  
  // await product.deleteOne({ _id: id });
  await product.updateOne({ _id: id },{
    deleted:true,
    status:false,
    deletedBy:{
      account_id:res.locals.user._id,
      deletedAt:new Date()
    }
  });
  res.redirect("back");
}

module.exports.create=async (req,res)=>{
  let find={
    deleted: false
  }


  const record = await product_category.find(find);

  const newRecord=creata.Tree(record);
  res.render("Admin/pages/products/create",{
    pagetitle:"tao moi san pham ",
    category:newRecord
});
}


module.exports.createPost= async(req,res)=>{


  req.body.price=parseInt(req.body.price);
  req.body.discountPercentage=parseInt( req.body.discountPercentage);
  req.body.stock=parseInt( req.body.stock);

  if(req.body.position===""){
    const countProduct= await Product.countDocuments();
    req.body.position=countProduct+1;
  }
  else{
    req.body.position=parseInt(req.body.position)
  }
  req.body.CreateBy={
    account_id:res.locals.user._id,
    createdAt: new Date()
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

  let finds={
    deleted: false
  }

  const records = await product_category.find(finds);

  const newRecord=creata.Tree(records);

  res.render("Admin/pages/products/repair",{
    products:products,
    category:newRecord,
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
  const updatedBy={
    account_id:res.locals.user._id,
    updatedAt:new Date()
  }

  await Product.updateOne(
    { _id: req.body._id },  // Điều kiện để tìm document
    { $set: req.body ,$push:{updatedBy:updatedBy}},     // Dữ liệu mới từ req.body
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
  res.render("Admin/pages/products/detail",{
    products:products,
    pagetitle:" chi tiet san pham ",
});
  }catch(erorr){
    res.redirect(`${systeamCOnfig.prefixAdmin}/products`)
  }
}
//[GET] admin get product