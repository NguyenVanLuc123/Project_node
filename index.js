
const express = require('express')
require("dotenv").config()
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
const systemconfig=require("./config/system")
const database =require('./config/database')

const router=require("./router/client/index.router")

const routerAdmin=require("./router/admin/index.router")
const flash = require('express-flash')
const session=require('express-session')
const cookieParser=require('cookie-parser')


database.connect();
const app = express();
app.use(methodOverride('_method'));

//flash
app.use(cookieParser('sdasdsa'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//flash

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.port;


app.set("views","./view");
app.set("view engine","pug")

// app locals variables

app.locals.prefixAdmin=systemconfig.prefixAdmin

app.use(express.static('public'))

router(app)
routerAdmin(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})