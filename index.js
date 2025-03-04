
const express = require('express')
require("dotenv").config()
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
const systemconfig=require("./config/system")
const database =require('./config/database')
const path = require('path');
const router=require("./router/client/index.router")

const routerAdmin=require("./router/admin/index.router")
const flash = require('express-flash')
const session=require('express-session')
const cookieParser=require('cookie-parser')


database.connect();
const app = express();
app.use(methodOverride('_method'));

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
//socket.io 
const io = new Server(server);
global._io=io;


//socket.io


//flash
app.use(cookieParser('sdasdsa'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//flash

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.port;

//tinimce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

//tinimce
app.set("views",`${__dirname}/view`);
app.set("view engine","pug")

// app locals variables

app.locals.prefixAdmin=systemconfig.prefixAdmin

app.use(express.static(`${__dirname}/public`))

router(app)
routerAdmin(app)

app.get("*",(req,res)=>{
  res.render("client/pages/error/404",{
    pagetitle:"404 Not Found ",
   
});
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})