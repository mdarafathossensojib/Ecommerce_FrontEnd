import ProductItem from "../Products/ProductItem";

const ProductList = ({ products, loading }) => {
  if (loading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner text-secondary loading-lg"></span>
      </div>
    );

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;