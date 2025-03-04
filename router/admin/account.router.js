const express = require('express');
const multer = require('multer')


const uploadCloud= require("../../middlewares/admin/UploadOnCloud_middlewares")

const upload = multer()
const router = express.Router();


const controller=require('../../controller/admin/account.controller')
router.get("/",controller.index)
router.get("/create",controller.create)
router.post("/create",upload.single('avatar'),uploadCloud.upload,controller.createPost)
router.patch("/change-status/:status/:id",controller.changeStatus)
router.get("/repair/:id",controller.repair)
router.patch("/repair/:id",upload.single('avatar'),uploadCloud.upload,controller.repairPost)
router.delete("/delete/:id",controller.delete)
module.exports=router