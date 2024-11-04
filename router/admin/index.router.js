const dashboardRouter = require("./dashboard.router.js")

const SystemConfig=require(`${__dirname}/../../config/system.js`)

const productsAdminRouter=require("./product.router.js")
module.exports = (app)=>{
    const PATH_ADMIN= SystemConfig.prefixAdmin
    app.use(PATH_ADMIN+'/dashboard',dashboardRouter );

    app.use(PATH_ADMIN+'/products',productsAdminRouter)
}
