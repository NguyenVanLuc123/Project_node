const express = require('express');

const router = express.Router();

const validate= require("../../validate/client/user.validate")
const userMiddleware=require("../../middlewares/client/auth.middleware.js")
const controller = require('../../controller/client/user.controller')
router.get('/register', controller.register);
router.post("/register",validate.registerPost,controller.registerPost)
router.get('/login', controller.login);
router.post('/login',validate.loginPost, controller.loginPost);
router.get('/logout', controller.logout);
router.get('/password/forgot', controller.forgotPassword);
router.post('/password/forgot',validate.forgotPasswordPost, controller.forgotPasswordPost);
router.get('/password/otp', controller.otpPassword);
router.post('/password/otp', controller.otpPasswordPost);
router.get('/password/reset', controller.ResetPassword);
router.post('/password/reset',validate.ResetPasswordPost, controller.ResetPasswordPost);
router.get('/info',userMiddleware.userinfo, controller.info);
module.exports=router;