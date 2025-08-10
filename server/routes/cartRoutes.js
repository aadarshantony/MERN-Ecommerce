const express = require('express');
const { getCart, addToCart, deleteFromCart, updateQuantity } = require('../controllers/cartController');
const protect = require('../middlewares/protect');

const router = express.Router();

router.route('/')
    .get(getCart)
router.route('/add')
    .post(protect, addToCart)
router.route('/:productId')
    .patch(protect, updateQuantity)
    .delete(protect, deleteFromCart)

module.exports = router;