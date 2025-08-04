import toast from "react-hot-toast";
import { deleteReview } from "../../services/reviewServices";
import { useQueryClient } from '@tanstack/react-query';
const ReviewCard = ({ review, userData, productId }) => {
    const queryClient = useQueryClient()
    const renderStars = () =>
        [1, 2, 3, 4, 5].map((star) => (
            <svg
                key={star}
                className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-300' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
        ));

    const reviewUserId = review.user?._id || review.user;
    const currentUserId = userData?._id || userData?.id;
    const isMyReview = String(reviewUserId) === String(currentUserId);

    const handleDelete = async () => {
        try {
            await deleteReview(productId, review._id);
            await queryClient.invalidateQueries(['reviews', productId])
            toast.success('Review deleted for this product')
        } catch (err) {
            toast.error(`Error occoured: ${err.error}`)
            console.error("Review deletion failed:", err);
        }

    }

    return (
        <article className="p-5 bg-white rounded-lg shadow mb-6 max-w-2xl border border-gray-200">
            {/* Header */}
            <div className="flex items-center mb-4">
                <img
                    className="w-10 h-10 me-4 rounded-full object-cover"
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.user?.name || 'User')}&background=0D8ABC&color=fff&length=2`}
                    alt={review.user?.name || 'User'}
                />
                <div className="font-medium text-gray-900">
                    <p>
                        {review.user?.name || 'Anonymous'}
                        <time className="block text-sm text-gray-500">
                            Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                        </time>
                    </p>
                </div>
            </div>

            {/* Rating + Title */}
            <div className="flex items-center mb-1 space-x-1">
                {renderStars()}
                <h3 className="ms-2 text-sm font-semibold text-gray-900">
                    {review.title}
                </h3>
            </div>

            {/* Body */}
            <p className="mb-3 mt-2 text-gray-500 whitespace-pre-line">
                {review.review}
            </p>

            {/* Footer */}
            <aside>
                {isMyReview && (
                    <button onClick={handleDelete} className="px-2 py-1.5 text-xs rounded-lg border border-gray-200 bg-white hover:bg-red-100 ">
                        <i className="fas fa-trash text-red-500"></i>
                    </button>
                )}
            </aside>
        </article>
    );
};

export default ReviewCard;
