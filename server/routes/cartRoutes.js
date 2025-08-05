const express = require('express');
const { getCart, addToCart, deleteFromCart } = require('../controllers/cartController');
const protect = require('../middlewares/protect');

const router = express.Router();

router.route('/')
    .get(protect, getCart)
router.route('/add')
    .post(protect, addToCart)
router.route('/:productId')
    .delete(protect, deleteFromCart)

module.exports = router;