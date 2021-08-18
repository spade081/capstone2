const express = require('express');
const router = express.Router();
const {createOrder, getAllOrder, ordered, userOrder} = require('../controller/orderController')
const{verifyToken, verifyIsAdmin} = require('../auth')

// router.post('/order', createOrder)
router.get('/all',verifyToken,verifyIsAdmin, getAllOrder)
router.post('/myOrder', verifyToken, ordered)
router.get('/userOrder', verifyToken, userOrder)
module.exports = router;