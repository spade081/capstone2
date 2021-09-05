const express = require('express');
const router = express.Router();
const {register, getAllUsers ,getAllProducts, login, getSingleProduct, userToAdmin, profile} = require('../controller/userController')
const {verifyToken, verifyIsAdmin} = require('../auth')




router.post('/login', login)

router.get('/getAllProducts',getAllProducts)
router.get('/profile', verifyToken, profile)

router.get('/getSingleProduct/:productId', getSingleProduct)


router.get('/all', verifyToken, verifyIsAdmin, getAllUsers)
router.post('/register', register)

router.put('/userToAdmin/:userId', verifyToken, verifyIsAdmin, userToAdmin)

module.exports = router;