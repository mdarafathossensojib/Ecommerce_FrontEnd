import { useForm } from "react-hook-form";
import StarRating from "./StarRating";

const ReviewForm = ({ onSubmit }) => {
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm();
    const ratingValue = watch("rating", 0);

    return (
        <div>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="" className="label font-medium">
                        <span className="label-text">Rating</span>
                    </label>
                    <StarRating onChange={(value) => setValue("rating", value)} rating={ratingValue} />
                    {errors.rating && (
                        <p className="text-error text-sm mt-1">Rating is Required</p>
                    )}
                    <input type="hidden" {...register("rating", { required: true })} />
                </div>
                <div className="form-control">
                    <label htmlFor="" className="label font-medium">
                        <span className="label-text">Your Review</span>
                    </label>
                    <div>
                        <textarea className="textarea textarea-bordered min-h-30 focus:textarea-primary" placeholder="Share your experience with this product..." {...register("comment", {required:true})} />
                    </div>
                    {errors.comment && (
                        <p className="text-error text-sm mt-1">Comment is Required</p>
                    )}
                </div>

                <button type="submit" className="btn btn-primary w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                        <span className="loading loading-spinner loading-xs mr-2"></span>
                        Submitting...
                        </>
                    ): "Submit Review"}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;