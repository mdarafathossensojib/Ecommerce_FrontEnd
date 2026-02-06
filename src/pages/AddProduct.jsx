import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../services/api_client";
import authApiClient from "../services/auth-api-client";


const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [categories, setCategories] = useState([]);
    const [productId, setProductId] = useState(null);
    const [previewImages, setPreviewImages] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch categories from API or define them statically
        apiClient.get('/category/').then((response) => {
            setCategories(response.data);
        });
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await authApiClient.post('/products/', data);
            setProductId(response.data.id);
            
        } catch (error) {
            console.log(error);
        }finally {
            setLoading(false);
        }
    }

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setImages(files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages(previews);
    }

    const handleImageUpload = async () => {
        if(!images.length) return alert("Please select images to upload.");
        setLoading(true);
        try {
            for(const image of images){
                const formData = new FormData();
                formData.append('image', image);
                await authApiClient.post(`/products/${productId}/images/`, formData);
            }
            alert("Images uploaded successfully!");
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
            {!productId ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" action="">
                <div>
                    <label className="block text-sm font-medium" htmlFor="">Product Name</label>
                    <input {...register("name", {required: true})} className="input input-bordered w-full" type="text" placeholder="Enter Product Name" />
                    {errors.name && <span className="text-red-500 text-xs">This field is required</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium" htmlFor="">Description</label>
                    <textarea {...register("description", {required: true})} className="textarea textarea-bordered w-full" placeholder="Enter Product Description" > </textarea>
                    {errors.description && <span className="text-red-500 text-xs">This field is required</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium" htmlFor="">Product Price</label>
                    <input {...register("price", {required: true, validate: (value) => {
                        return !isNaN(parseFloat(value));
                    }})} className="input input-bordered w-full" type="text" placeholder="Enter Product Price" />
                    {errors.price && errors.price.type === 'required' && <span className="text-red-500 text-xs">This field is required</span>}
                    {errors.price && errors.price.type === 'validate' && <span className="text-red-500 text-xs">This field must be a number</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium" htmlFor="">Stock Quantity</label>
                    <input {...register("stock", {required: true})} className="input input-bordered w-full" type="number" placeholder="Enter Stock Quantity" />
                    {errors.stock && <span className="text-red-500 text-xs">This field is required</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium" htmlFor="">Category</label>
                    <select {...register("category", {required: true})} className="select select-bordered w-full">
                        <option value="">Select a Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    {errors.category && <span className="text-red-500 text-xs">This field is required</span>}
                </div>

                <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? "Adding Product..." : "Add Product"}</button>
            </form>) : (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Upload Product Images</h3>
                    <input onChange={handleImageChange} type="file" multiple accept="image/*" className="file-input file-input-bordered w-full" />
                    {previewImages.length > 0 && (
                    <div className="flex gap-2 mt-2">
                        {previewImages.map((preview, index) => (
                            <img key={index} src={preview} alt="Preview" className="w-20 h-20 object-cover rounded" />
                        ))}
                    </div>
                    )}
                    <button onClick={handleImageUpload} className="btn btn-primary w-full mt-2" disabled={loading}>{loading ? "Uploading...." : "Upload Images"}</button>
                </div>
            )}
        </div>
    );
};

export default AddProduct;