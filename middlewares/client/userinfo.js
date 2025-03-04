const usermodel=require(`../../model/user.model.js`)
const cart=require("../../model/carts.model")
module.exports.infouser=async(req,res,next)=>{

   if(req.cookies.token_user){
    const user=await usermodel.findOne({token:req.cookies.token_user,deleted:false}).select("-password");
  
    const Cart= await cart.findOne({
        user_id:user.id
    });
    if(Cart){
        Cart.totalQuantity= Cart.products.reduce((sum,item)=>sum + item.quantity,0)
        }
   if(user){
    res.locals.user=user;
    res.locals.userCart=Cart;
   }
}
    next();
   
}