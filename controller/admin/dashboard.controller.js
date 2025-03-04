const Category_product_model=require("../../model/product_category.model")
const product_model=require("../../model/product.model")
const account_model=require("../../model/Account.model")
const User_model=require("../../model/user.model")
module.exports.dashboard= async (req, res) => {

    const statistic={
        categoryProduct:{
            total:0,
            active:0,
            inactive:0
        },
        Product:{
            total:0,
            active:0,
            inactive:0
        },
        account:{
            total:0,
            active:0,
            inactive:0
        },
        user:{
            total:0,
            active:0,
            inactive:0
        },
    };

    statistic.categoryProduct.total=await Category_product_model.countDocuments({deleted:false})
    statistic.categoryProduct.active=await Category_product_model.countDocuments({status:true})
    statistic.categoryProduct.inactive=await Category_product_model.countDocuments({status:false})

    statistic.Product.total=await product_model.countDocuments({deleted:false})
    statistic.Product.active=await product_model.countDocuments({status:true})
    statistic.Product.inactive=await product_model.countDocuments({status:false})

    statistic.account.total=await account_model.countDocuments({deleted:false})
    statistic.account.active=await account_model.countDocuments({status:true})
    statistic.account.inactive=await account_model.countDocuments({status:false})

    statistic.user.total=await User_model.countDocuments({deleted:false})
    statistic.user.active=await User_model.countDocuments({status:"active"})
    statistic.user.inactive=await User_model.countDocuments({status:"inactive"})


    res.render("Admin/pages/dashboard/index",{
        pagetitle:"trang chu ",
        statistic:statistic
    });
   };