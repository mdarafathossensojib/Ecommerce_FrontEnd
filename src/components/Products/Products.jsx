import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ErrorAlert from "../ErrorAlert";
import apiClient from "../../services/api_client";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        apiClient.get("/products/").then((res) => setProducts(res.data.results)).catch((err) => setError(err.message)).finally(() => setLoading(false));
    }, []);
    return (
        <section className="bg-gray-50">
          <div className="mx-auto py-12 px-4 max-w-7xl">
            <div className="flex justify-between items-center px-4 md:px-8 mb-4">
                <h2 className="text-3xl md:text-4xl font-bold">Trending Products</h2>
                <a
                href="#"
                className="btn btn-secondary px-6 py-5 rounded-full text-lg"
                >
                View All
                </a>
            </div>

            {/* Spinnerer Loading */}
            {isLoading && (
              <div className="flex justify-center items-center py-lg">
                <span className="loading loading-spinner loading-xl text-secondary"></span>
              </div>
            )}

            {/* Error Message */}
            {error && <ErrorAlert error={error} /> }

            {/* Product Slider */}
            {!isLoading && !error && products.length > 0 && (
            <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          breakpoints={{
            650: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          className="mt-4 px-4 container"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="flex justify-center">
              <ProductItem key={product.id} product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        )}
        {!isLoading && !error && products.length == 0 && (
          <span className="text-xl font-semibold">No products found</span>
        )}
        </div>
      </section>
    );
};

export default Products;