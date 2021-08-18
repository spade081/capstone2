const express = require('express');
const router = express.Router();
const {register, getAllUsers ,getAllProducts, adminLogin, getSingleProduct, userToAdmin} = require('../controller/userController')
const {verifyToken, verifyIsAdmin} = require('../auth')




router.post('/adminLogin', adminLogin, verifyToken, verifyIsAdmin)

router.get('/getAllProducts', getAllProducts)
router.get('/getSingleProduct/:productId', getSingleProduct)


router.get('/all', verifyToken, verifyIsAdmin, getAllUsers)
router.post('/register', register)

router.put('/userToAdmin/:userId', verifyToken, verifyIsAdmin, userToAdmin)

module.exports = router;