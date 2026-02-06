import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://ecommerce-web-drab-eight.vercel.app/api/v1",
});

export default apiClient;