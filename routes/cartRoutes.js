const express = require("express");
const { addToCart, getCart, deleteCart, getUserCart,deleteUserCart, getAllCarts } = require("../controller/cartController");
const router = express.Router();
const { verifyToken, verifyNonAdmin, verifyIsAdmin } = require("../auth");



router.post("/add-cart/:prodId", verifyToken, addToCart); //#9 create order

router.get("/get-cart", verifyToken, getCart);

// router.put("/update-cart", updateCart)

router.delete("/delete", deleteCart)
router.get('/all', getAllCarts)
router.get('/user-cart',verifyToken, getUserCart)
router.delete('/delete-cart/:productId',verifyToken, deleteUserCart)


module.exports = router;