const express = require('express');
const router = express.Router();
const {inputNewProduct, getAllProducts, getSingleProduct, updateProduct, archiveProduct, activateProduct} =require('../controller/productController')
const {verifyToken, verifyIsAdmin} = require('../auth')


router.post('/addProduct', verifyToken, verifyIsAdmin, inputNewProduct)
router.get('/getSingleProduct/:productId', getSingleProduct)
router.put('/update/:productId', verifyToken, verifyIsAdmin ,updateProduct)
router.delete('/archive/:productId', verifyToken, verifyIsAdmin, archiveProduct)
router.put('/activate/:productId', verifyToken, verifyIsAdmin, activateProduct)

router.get('/all', getAllProducts)
module.exports = router