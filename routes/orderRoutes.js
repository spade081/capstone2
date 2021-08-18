const express = require('express');
const router = express.Router();
const {createOrder, getAllOrder, ordered, userOrder} = require('../controller/orderController')
const{verifyToken} = require('../auth')

// router.post('/order', createOrder)
router.get('/all', getAllOrder)
router.post('/myOrder', verifyToken, ordered)
router.get('/userOrder', verifyToken, userOrder)
module.exports = router;