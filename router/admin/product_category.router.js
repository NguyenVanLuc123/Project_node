const express = require('express');

const router = express.Router();

const controller = require("../../controller/admin/products_category.controller")
router.get("/", controller.products);
router.get("/create", controller.creat);
module.exports=router