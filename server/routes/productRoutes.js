const express = require("express");
const { getProducts, addProduct, updateProduct, deleteProduct, getIndividualProduct } = require('../controllers/productController');
const protect = require('../middlewares/protect');
const isAdmin = require('../middlewares/isAdmin');
const reviewRoutes = require('./reviewRoutes')
const router = express.Router();

router.route('/')
    .get(protect, getProducts)
    .post(protect, isAdmin, addProduct)

router.route('/:id')
    .get(protect, getIndividualProduct)
    .patch(protect, isAdmin, updateProduct)
    .delete(protect, isAdmin, deleteProduct)

router.use('/:productId/reviews', reviewRoutes)

module.exports = router;