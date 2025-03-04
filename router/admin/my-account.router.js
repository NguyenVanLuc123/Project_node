const express = require('express');
const multer = require('multer')


const uploadCloud= require("../../middlewares/admin/UploadOnCloud_middlewares")

const upload = multer()

const router = express.Router();


const controller=require('../../controller/admin/My-account.controller')
router.get("/",controller.index)
router.get("/edit/:id",controller.edit)
router.patch("/edit/:id",upload.single('avatar'),uploadCloud.upload,controller.update)
module.exports=router
