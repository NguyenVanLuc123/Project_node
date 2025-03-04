const express = require('express');
const multer = require('multer')
const router = express.Router();
const uploadCloud= require("../../middlewares/admin/UploadOnCloud_middlewares")
const upload = multer()

const controller=require('../../controller/admin/setings.controller')
router.get("/general",controller.general)
router.patch("/general",upload.single('logo'),uploadCloud.upload,controller.generalPatch)

module.exports=router