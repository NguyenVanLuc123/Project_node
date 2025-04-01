const express = require('express');

const router = express.Router();
const roomchatcontroller=require("../../controller/client/roomchat.controller");
module.exports=router;

router.get('/',roomchatcontroller.index)
router.get("/create",roomchatcontroller.create)
router.post("/create",roomchatcontroller.createPost)
