import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { createReview } from '../../services/reviewServices';

// Yup schema
const reviewSchema = yup.object().shape({
    title: yup
        .string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must be less than 100 characters'),

    review: yup
        .string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters')
        .max(1000, 'Description must be less than 1000 characters'),
})

const ReviewForm = ({ productId }) => {
    const queryClient = useQueryClient()
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(reviewSchema),
    })


    const onSubmit = async (data) => {
        if (rating === 0) {
            toast.error('Rating cannot be empty')
            return;
        }
        const review = {
            ...data, rating: rating
        }

        try {
            await createReview(productId, review);
            toast.success("Added a review for the current product!");
            console.log('Rating Submitted:', review);
            await queryClient.invalidateQueries(['reviews', productId]);
            reset()
            setRating(0)
        } catch (err) {
            toast.error(`Error occoured: ${err.error}`)
            console.error("Review creation failed:", err);
        }


    }

    return (
        <div className="w-full md:w-1/2 mt-10 md:mt-0">
            <h3 className="text-lg font-semibold mb-2">Submit Your Review</h3>

            {/* Rating Stars */}
            <div className="flex items-center space-x-1 mb-2">
                <span className="text-gray-600">Your Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        type="button"
                        key={star}
                        className="text-2xl text-yellow-400 focus:outline-none"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        {star <= (hoverRating || rating) ? '★' : '☆'}
                    </button>

                ))}
            </div>

            {/* Review Form */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register('title')}
                    className="border rounded p-2 w-full"
                    placeholder="Review Title"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

                <textarea
                    {...register('review')}
                    placeholder="Write your review..."
                    className="w-full p-2 border rounded h-24"
                />
                {errors.review && <p className="text-red-500 text-sm">{errors.review.message}</p>}

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Submit Review
                </button>
            </form>
        </div>
    )
}

export default ReviewForm
