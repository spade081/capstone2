const express = require('express');
const router = express.Router();
const { getAllOrder, createOrder, userOrder,createMultipleOrders} = require('../controller/orderController')
const{verifyToken, verifyIsAdmin} = require('../auth')

// router.post('/order', createOrder)
router.get('/all',verifyToken,verifyIsAdmin, getAllOrder)
router.post('/myOrder/:productId', verifyToken, createOrder)
router.get('/userOrder', verifyToken, userOrder)
router.post('/order-all', verifyToken, createMultipleOrders)
module.exports = router;

