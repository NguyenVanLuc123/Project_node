const express = require('express');

const router = express.Router();

const controller = require('../../controller/client/Chat.controller')
const chatMiddle= require("../../middlewares/client/chat.middleware")
router.get('/:roomChatid',chatMiddle.isAccess,controller.index);

module.exports=router;