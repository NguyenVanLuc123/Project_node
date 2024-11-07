const express = require('express');
const multer = require('multer')

const uploadCloud= require("../../middlewares/admin/UploadOnCloud_middlewares")

const upload = multer()

const validate = require("../../validate/admin/product_category.validate")
const router = express.Router();

const controller = require("../../controller/admin/products_category.controller")
router.get("/", controller.products);
router.get("/create", controller.creat);
router.post("/create",upload.single('thumbnail'),uploadCloud.upload, validate.createPost, controller.createPost);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMutil);
router.get("/detail/:id", controller.detail);
router.get("/repair/:id", controller.repair);
router.patch("/repair/:id", upload.single('thumbnail'), uploadCloud.upload,validate.createPost, controller.update);
router.delete("/delete/:id", controller.deleteProduct);
module.exports=router