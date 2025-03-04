const express = require('express');

const router = express.Router();

const controller = require('../../controller/client/cart.controller')
router.get('/', controller.index);
router.post('/add/:productId',controller.addcart);
router.patch('/:quantity/:id',controller.Update)
router.delete('delete',controller.delete);
module.exports=router;