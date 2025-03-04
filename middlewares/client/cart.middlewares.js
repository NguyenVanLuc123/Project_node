const cart=require("../../model/carts.model")
module.exports.cartid= async(req,res,next)=>{
    if(!req.cookies.cartId){
        const Cart= new cart();
        await Cart.save();

        const expiresTime=1000*60*60*24*365
        res.cookie("cartId",Cart.id, {expires: new Date(Date.now()+expiresTime)})
    }else{
        const Cart= await cart.findOne({
            _id: req.cookies.cartId
        });

      
        if(Cart){

        Cart.totalQuantity= Cart.products.reduce((sum,item)=>sum + item.quantity,0)
        res.locals.Cart=Cart;
        }
    }
    next();
}