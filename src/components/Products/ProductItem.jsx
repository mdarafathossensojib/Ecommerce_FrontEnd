import DefaultItemImage from "../../assets/default_product.jpg";
import { Link } from "react-router";

const ProductItem = ({ product }) => {
    return (
      <Link to={`/shop/${product.id}`}>
        <div className="card bg-base-100 w-96 shadow-sm">
          <figure>
            <img
              src={product.images.length > 0 ? product.images[0].image : DefaultItemImage}
              alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <h2 className="font-bold text-xl text-red-700">${product.price}</h2>
            <p>{product.description}</p>
            <div className="card-actions justify-start md:justify-end mt-1">
              <button className="btn btn-secondary">Buy Now</button>
            </div>
          </div>
        </div>
      </Link>
    );
};

export default ProductItem;