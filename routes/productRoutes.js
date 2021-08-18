const express = require('express');
const router = express.Router();
const {inputNewProduct, getAllProducts, getSingleProduct, updateProduct, archiveProduct} =require('../controller/productController')
const {verifyToken, verifyIsAdmin} = require('../auth')


router.post('/addProduct', verifyToken, verifyIsAdmin, inputNewProduct)
router.get('/getSingleProduct/:productId',verifyToken, verifyIsAdmin, getSingleProduct)
router.put('/update/:productId', verifyToken, verifyIsAdmin ,updateProduct)
router.put('/archive/:productId', verifyToken, verifyIsAdmin, archiveProduct)
router.get('/all',verifyToken, verifyIsAdmin, getAllProducts)
module.exports = router