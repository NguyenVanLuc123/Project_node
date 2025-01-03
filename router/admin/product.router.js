const express = require('express');
const multer = require('multer')

// const storageMulter =require("../../helpers/storageMulter")

const uploadCloud= require("../../middlewares/admin/UploadOnCloud_middlewares")

const upload = multer()
const router = express.Router();
const validate = require("../../validate/admin/product.validate")
const controller = require("../../controller/admin/products.controller")
router.get("/", controller.products);

router.patch("/change-status/:status/:id", controller.changeStatus);
router.delete("/delete/:id", controller.deleteProduct);
router.patch("/change-multi", controller.changeMutil);
router.get("/create", controller.create);
router.post("/create", upload.single('thumbnail'),uploadCloud.upload, validate.createPost, controller.createPost);

router.get("/repair/:id", controller.repair);

router.patch("/repair/:id", upload.single('thumbnail'), uploadCloud.upload,validate.createPost, controller.update);

router.get("/detail/:id", controller.detail);
module.exports = router