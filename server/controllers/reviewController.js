const Review = require("../models/reviewSchema");

exports.createReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;
        const { title, review, rating } = req.body;

        const existingReview = await Review.findOne({ product: productId, user: userId });
        if (existingReview) {
            return res.status(400).json({ error: 'You have already reviewed this product' });
        }

        const newReview = await Review.create({
            user: userId,
            product: productId,
            title,
            review,
            rating,
        });

        res.status(201).json({ message: 'Review submitted', review: newReview });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.getProductReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const productReview = await Review.find({ product: productId })
            .populate('user', 'name _id')
            .sort({ createdAt: -1 });

        res.status(200).json({ reviews: productReview });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const userId = req.user.id;
        const review = await Review.findById(reviewId)

        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        if (review.user.toString() !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }

}