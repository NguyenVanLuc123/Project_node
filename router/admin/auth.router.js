const express = require('express');

const router = express.Router();


const controller=require('../../controller/admin/auth.controller')
router.get("/login",controller.index)
router.post("/login",controller.login)
router.get("/logout",controller.logout)

module.exports=router