import DefaultItemImage from "../../assets/default_product.jpg";
import { Link } from "react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";

const ProductItem = ({ product }) => {

  const RatingStars = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="rounded-xl overflow-hidden bg-white hover:shadow-lg transition">

    <Link to={`/shop/${product.id}`} className="block">
      {/* Image */}
      <div className="relative bg-gray-100 h-52 flex items-center justify-center text-6xl">

        <img src={product.images.length > 0 ? product.images[0].image : DefaultItemImage}
              alt="Shoes" />

        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>

      </div>
    </Link>

      {/* Content */}
      <div className="p-4 mt-7">

        <h3 className="font-semibold text-gray-900 text-lg mb-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <RatingStars rating={5} />
          <span className="text-xs text-gray-500">
            (10 reviews)
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="font-bold text-lg">
            ${product.price}
          </span>

          <span className="line-through text-sm text-gray-400">
            ${599.99}
          </span>
        </div>

        <button
          className="w-full bg-secondary cursor-pointer text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-secondary/90 transition"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>

      </div>
    </div>
  );
};

export default ProductItem;