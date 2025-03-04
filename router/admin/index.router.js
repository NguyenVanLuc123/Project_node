const dashboardRouter = require("./dashboard.router.js")

const AuthMiddleware=require(`../../middlewares/admin/auth.middlewares.js`)

const SystemConfig=require(`../../config/system.js`)

const productsAdminRouter=require("./product.router.js")

const productCategoryRouter=require("./product_category.router.js")

const RoleRouter=require("./roles.router.js")

const AccountRouter=require("./account.router.js")

const AuthRouter=require("./auth.router.js")

const MyAcountRouter= require("./my-account.router.js")

const SetingRouter= require("./setings.router.js")

const authController= require("../../controller/admin/auth.controller.js")

module.exports = (app)=>{
    const PATH_ADMIN= SystemConfig.prefixAdmin;
    app.use(PATH_ADMIN+'/dashboard',AuthMiddleware.requireAuth,dashboardRouter );
    app.use(PATH_ADMIN+'/products_category',AuthMiddleware.requireAuth,productCategoryRouter);
    app.use(PATH_ADMIN+'/products',AuthMiddleware.requireAuth,productsAdminRouter);
    app.use(PATH_ADMIN+'/roles',AuthMiddleware.requireAuth,RoleRouter);
    app.use(PATH_ADMIN+'/accounts',AuthMiddleware.requireAuth,AccountRouter);
    app.use(PATH_ADMIN+'/auth',AuthRouter);
    app.use(PATH_ADMIN,authController.index);
    app.use(PATH_ADMIN+'/setings',AuthMiddleware.requireAuth,SetingRouter);
    app.use(PATH_ADMIN+'/my-account',AuthMiddleware.requireAuth,MyAcountRouter);
}
