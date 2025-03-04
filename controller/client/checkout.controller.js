const cart = require("../../model/carts.model")
const Products = require("../../model/product.model")
const newprice = require("../../helpers/ProductNewprice")
const order = require("../../model/order.model")
const usermodel=require("../../model/user.model")
module.exports.index = async (req, res) => {
    const ids = req.query.ids.split(',').map(id => id.trim());

    const cartid = req.cookies.cartId;
    var Cart;
    if (req.cookies.token_user) {
        const user = await usermodel.findOne({ token: req.cookies.token_user, deleted: false }).select("-password");

        Cart = await cart.findOne({
            user_id: user.id
        });
    } else {
        Cart = await cart.findOne({
            _id: cartid,
        });
    }

    if (Cart) {
        // Lọc các sản phẩm trong mảng products có product_id nằm trong mảng ids
        Cart.products = Cart.products.filter(product => ids.includes(product.product_id));
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

    res.render("client/pages/checkout/index", {
        pagetitle: "trang chu ",
        cartDetail: Cart,
        totalPrice_products: totalPrice_products
    });
}

module.exports.order = async (req, res) => {
    const cartid = req.cookies.cartId;
    const userInfor = {
        fullname: req.body.fullName,
        phone: req.body.phone,
        address: req.body.address
    };
    const ids = req.body.productIds.split('-').map(id => id.trim());
  var Cart;
    if (req.cookies.token_user) {
        const user = await usermodel.findOne({ token: req.cookies.token_user, deleted: false }).select("-password");

        Cart = await cart.findOne({
            user_id: user.id
        });
    }else{
     Cart = await cart.findOne({
        _id: cartid,
    });
 }
    if (Cart) {
        // Lọc các sản phẩm trong mảng products có product_id nằm trong mảng ids
        Cart.products = Cart.products.filter(product => ids.includes(product.product_id));
    }

    let listproducts = [];
    for (const item of Cart.products) {
        const objectProduct = {
            product_id: item.product_id,
            price: 0,
            discountPercentage: 0,
            quantity: item.quantity,
        }

        const productInfo = await Products.findOne({
            _id: item.product_id
        })
        

         await Products.updateOne({
            _id: item.product_id
        },{
            stock: productInfo.stock - item.quantity
        })
        objectProduct.price = productInfo.price;
        objectProduct.discountPercentage = productInfo.discountPercentage;
        listproducts.push(objectProduct);
    }

    const objectOrder = {
        cart_id: Cart.id,
        userInfor: userInfor,
        products: listproducts
    }

    const Order = new order(objectOrder);
    await Order.save();

    await cart.updateOne({
        _id: Cart.id
    }, {
        products: []
    })
    res.redirect(`/checkout/success/${Order.id}`)
}

module.exports.success = async (req, res) => {
    const Orderid = req.params.Orderid;

    const Order = await order.findOne({
        _id: Orderid
    })

    let totalOrder = 0;
    for (const item of Order.products) {
        const ProductsInfo = await Products.findOne({
            _id: item.product_id
        }).select("title thumbnail");

        item.productInfo = ProductsInfo;
        console.log(item.productInfo)

        item.PriceNew = Math.round(item.price - (item.price * item.discountPercentage) / 100)

        item.totalPrice = item.PriceNew * item.quantity

        totalOrder += item.totalPrice;
    }
    Order.totalOrder = totalOrder;


    res.render("client/pages/checkout/success", {
        pagetitle: "Dat hang thanh cong ",
        Order: Order
    });
}