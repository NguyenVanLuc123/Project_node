const express = require('express');

const router = express.Router();


const controller=require('../../controller/admin/role.controller')
router.get("/",controller.index)
router.get("/create",controller.create)
router.post("/create",controller.createPost)
router.get("/repair/:id", controller.repair);
router.patch("/repair/:id", controller.update);
router.get("/detail/:id", controller.detail);
router.delete("/delete/:id",controller.deleteRole);
router.get("/permission", controller.permission);
router.patch("/permission", controller.permissionPatch);
module.exports=router