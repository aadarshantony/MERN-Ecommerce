import React, { useMemo } from 'react'

const ReviewBreakdown = ({ reviews }) => {
    const { averageRating, totalRatings, breakdownPercentages } = useMemo(() => {
        if (!reviews || reviews.length === 0) {
            return {
                averageRating: 0,
                totalRatings: 0,
                breakdownPercentages: [0, 0, 0, 0, 0]
            }
        }

        const totalRatings = reviews.length
        const ratingCounts = [0, 0, 0, 0, 0] // index 0 for 5-star, index 4 for 1-star

        reviews.forEach(r => {
            const rating = r.rating
            if (rating >= 1 && rating <= 5) {
                ratingCounts[5 - rating] += 1
            }
        })

        const averageRating =
            reviews.reduce((sum, r) => sum + r.rating, 0) / totalRatings

        const breakdownPercentages = ratingCounts.map(count =>
            Math.round((count / totalRatings) * 100)
        )

        return { averageRating, totalRatings, breakdownPercentages }
    }, [reviews])

    return (
        <div className="w-full md:w-1/2 space-y-2">
            <div className="text-3xl font-bold text-yellow-500">★ {averageRating.toFixed(1)}</div>
            <p className="text-sm text-gray-600">{totalRatings} global ratings</p>

            <div className="space-y-2 mt-2">
                {[5, 4, 3, 2, 1].map((star, i) => (
                    <div className="flex items-center gap-2 text-sm" key={star}>
                        <span className="w-16">{star} star</span>
                        <div className="w-full h-2 bg-gray-200 rounded">
                            <div
                                className="h-2 bg-orange-400 rounded"
                                style={{ width: `${breakdownPercentages[i]}%` }}
                            ></div>
                        </div>
                        <span>{breakdownPercentages[i]}%</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReviewBreakdown
