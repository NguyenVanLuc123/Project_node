const cart = require("../../model/carts.model")
const Products = require("../../model/product.model")
const newprice = require("../../helpers/ProductNewprice")
const usermodel = require("../../model/user.model")
module.exports.addcart = async (req, res, next) => {
    const CartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);

    var Cart;

    if (req.cookies.token_user) {
        const user = await usermodel.findOne({ token: req.cookies.token_user, deleted: false }).select("-password");

         Cart = await cart.findOne({
            user_id: user.id
        });
      
    }
    else {
         Cart = await cart.findOne({
            _id: CartId
        });
    }
        const exisProductinCart = Cart.products.find(item => item.product_id == productId);

        if (exisProductinCart) {
            const newQuantity = quantity + exisProductinCart.quantity;
            await cart.updateOne({
                _id: Cart.id,
                'products.product_id': productId
            }, {
                'products.$.quantity': newQuantity
            })
        }
        else {
            const objectCart = {
                product_id: productId,
                quantity: quantity
            };
            await cart.updateOne({
                _id: Cart.id
            }, {
                $push: { products: objectCart }
            });
        }
    
    req.flash("Success", "Thêm giỏ vào giỏ hàng thành công !")
    res.redirect("back");

}

module.exports.index = async (req, res) => {
    var Cart;
    if (req.cookies.token_user) {
        const user = await usermodel.findOne({ token: req.cookies.token_user, deleted: false }).select("-password");

        Cart = await cart.findOne({
            user_id: user.id
        });
    } else {
        const cartid = req.cookies.cartId;

        Cart = await cart.findOne({
            _id: cartid
        })
    }
    let totalPrice_products = 0;
    if (Cart.products.length > 0) {
        for (const item of Cart.products) {
            const productId = item.product_id;

            const productInfo = await Products.find({
                _id: productId
            });

            productInfo[0].newprice = newprice.PriceNewOne(productInfo);
            totalPrice_products += productInfo[0].newprice * item.quantity;
            item.productInfo = productInfo;

        }
    }

    res.render("client/pages/cart/index", {
        pagetitle: "trang chu ",
        cartDetail: Cart,
        totalPrice_products: totalPrice_products
    });
}
module.exports.Update = async (req, res, next) => {
    const quantity = req.params.quantity;
    const productId = req.params.id;
    const CartId = req.cookies.cartId;



    if (req.cookies.token_user) {
        const user = await usermodel.findOne({ token: req.cookies.token_user, deleted: false }).select("-password");

        await cart.updateOne({
            user_id: user.id,
            'products.product_id': productId
        }, {
            'products.$.quantity': quantity
        });
    }
    else {
        await cart.updateOne({
            _id: CartId,
            'products.product_id': productId
        }, {
            'products.$.quantity': quantity
        })
    }
    res.redirect("back");
}

module.exports.delete = async (req, res) => {
    const ProductID = req.params.productId;
    const CartId = req.cookies.cartId;
    if (req.cookies.token_user) {
        const user = await usermodel.findOne({ token: req.cookies.token_user, deleted: false }).select("-password");

        await cart.updateOne({
            user_id: user.id,
        }, { $pull: { products: { product_id: ProductID } } }
        ) // Xóa sản phẩm theo product_id);
    }
    else {
        await cart.updateOne(
            { _id: CartId }, // Tìm giỏ hàng của người dùng
            { $pull: { products: { product_id: ProductID } } } // Xóa sản phẩm theo product_id
        )
    }
    req.flash("Success", "xoa thanh cong!")

    res.redirect("back");
}