import { useParams } from "react-router";
import ReviewForm from "./ReviewForm";
import authApiClient from "../../services/auth-api-client";
import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import { TfiWrite } from "react-icons/tfi";
import apiClient from "../../services/api_client";
import useAuthContext from "../../hooks/useAuthContext";

const ReviewSection = () => {
    const { productId } = useParams();
    const [userCanReview, setUserCanReview] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editReview, setEditReview] = useState({rating:0, comment:""});
    const [editingId, setEditingId] = useState(null);
    const { user } = useAuthContext();

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const res = await apiClient.get(`/products/${productId}/reviews/`);
            setReviews(res.data);
        } catch (error) {
            console.log(error);
        }finally {
            setLoading(false);
        }
    }

    const onSubmit = async (data) => {
        try {
            await authApiClient.post(`/products/${productId}/reviews/`, data);
            fetchReviews();
        } catch (error) {
            console.log(error);
        }
    };

    const checkPermission = async () => {
        try {
            const res = await authApiClient.get(`/orders/has-ordered/${productId}/`);
            setUserCanReview(res.data.has_ordered);
            
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateReview = async (reviewId) => {
        try {
            await authApiClient.put(`/products/${productId}/reviews/${reviewId}/`, editReview);
            setEditingId(null);
            fetchReviews();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await authApiClient.delete(`/products/${productId}/reviews/${reviewId}/`);  
            fetchReviews();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchReviews();
        checkPermission();
    }, []);

    return (
        <div className="space-y-8 mt-10 max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Customer Reviews</h2>
                <div className="badge badge-lg">{reviews.length} Review{reviews.length > 1 ? 's' : ''}</div>
            </div>

            {userCanReview && (
                <div className="card bg-base-100 shadow-lg border border-base-200 rounded-xl overflow-hidden">
                    <div className="card-body">
                        <h2 className="card-title text-lg">Write a Review</h2>
                        <ReviewForm onSubmit={onSubmit} />
                    </div>
                </div>)}

                <div className="divider"></div>

                

                {loading ? (
                    <div className="text-center py-8 text-secondary">
                        <div className="loading loading-spinner loading-md"></div>
                    </div>
                ) : reviews.length===0 ? (
                    <div className="text-center py-8">
                        <div className="text-5xl mb-4 flex items-center justify-center"><TfiWrite /></div>
                        <h1 className="text-xl font-semibold mb-2">No reviews yet</h1>
                        <p className="text-base-content/70">Be the first to review this product!</p>
                </div>
                ) : (
                    <ReviewList reviews={reviews} user={user} editReview={editReview} setEditReview={setEditReview} editingId={editingId} setEditingId={setEditingId} handleUpdateReview={handleUpdateReview} handleDeleteReview={handleDeleteReview} />
                )}
        </div>
    );
};

export default ReviewSection;