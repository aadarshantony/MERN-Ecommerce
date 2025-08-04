const express = require('express');
const { getProductReview, deleteReview, createReview } = require('../controllers/reviewController');
const protect = require('../middlewares/protect');
const router = express.Router({ mergeParams: true });


router.post('/', protect, createReview);
router.get('/', protect, getProductReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
