import { useParams } from "react-router";
import ReviewForm from "./ReviewForm";
import authApiClient from "../../services/auth-api-client";

const ReviewSection = () => {
    const { productId } = useParams();

    const onSubmit = async (data) => {
        try {
            const res = await authApiClient.post(`/products/${productId}/reviews/`, data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <ReviewForm onSubmit={onSubmit} />
        </div>
    );
};

export default ReviewSection;