const express = require('express');

const router = express.Router();
const userscontroller=require("../../controller/client/users.controller");
module.exports=router;

router.get('/not-friends',userscontroller.notfriend)
router.get('/request',userscontroller.request)
router.get('/accept',userscontroller.accept)
router.get('/friends',userscontroller.listfriend)