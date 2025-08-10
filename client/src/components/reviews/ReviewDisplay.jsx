import ReviewCard from './ReviewCard'
import { getUser } from '../../services/authServices';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const ReviewDisplay = ({ reviews, productId }) => {
    const { data: userData } = useQuery({
        queryKey: ['me'],
        queryFn: getUser,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    const queryClient = useQueryClient()
    useEffect(() => {
        queryClient.prefetchQuery(['me'], getUser);
    }, []);

    return (
        <div className="lg:grid grid-cols-2 gap-3 mt-8">
            {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} userData={userData} productId={productId} />
            ))}
        </div>
    );
};


export default ReviewDisplay
