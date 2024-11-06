const dashboardRouter = require("./dashboard.router.js")

const SystemConfig=require(`../../config/system.js`)

const productsAdminRouter=require("./product.router.js")

const productCategoryRouter=require("./product_category.router.js")
module.exports = (app)=>{
    const PATH_ADMIN= SystemConfig.prefixAdmin;
    app.use(PATH_ADMIN+'/dashboard',dashboardRouter );
    app.use(PATH_ADMIN+'/products_category',productCategoryRouter);
    app.use(PATH_ADMIN+'/products',productsAdminRouter)
}
