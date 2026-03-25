import { useState } from "react";
import ProductList from "./ProductList";
import Pagination from "./Pagination";
import useFetchProduct from "../../hooks/useFetchProducts";
import FilterSection from "./FilterSection";
import useFetchCategories from "../../hooks/useFetchCategories";

import { FiFilter } from "react-icons/fi";

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelecetedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { products, loading, totalPages } = useFetchProduct(
    currentPage,
    priceRange,
    selectedCategory,
    searchQuery,
    sortOrder
  );

  const categories = useFetchCategories();

  const handlePriceChange = (index, value) => {
    setPriceRange((prev) => {
      const newRange = [...prev];
      newRange[index] = value;
      return newRange;
    });
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shop</h1>

        {/* Mobile filter button */}
        <button
          className="lg:hidden flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
          onClick={() => setShowFilters(true)}
        >
          <FiFilter />
          Filters
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">

        {/* Sidebar Filter Desktop */}
        <div className="hidden lg:block">
          <FilterSection
            priceRange={priceRange}
            handlePriceChange={handlePriceChange}
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={setSelecetedCategory}
            searchQuery={searchQuery}
            handleSearchQuery={setSearchQuery}
            sortOrder={sortOrder}
            handleSorting={setSortOrder}
          />
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {products.length} Products
              </p>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border rounded-lg p-2"
              >
                <option value="">Default</option>
                <option value="price">Price: Low → High</option>
                <option value="-price">Price: High → Low</option>
              </select>

            </div>
          <ProductList products={products} loading={loading} />

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <div className="bg-white w-80 h-full p-6 overflow-y-auto">

            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Filters</h2>

              <button onClick={() => setShowFilters(false)}>✕</button>
            </div>

            <FilterSection
              priceRange={priceRange}
              handlePriceChange={handlePriceChange}
              categories={categories}
              selectedCategory={selectedCategory}
              handleCategoryChange={setSelecetedCategory}
              searchQuery={searchQuery}
              handleSearchQuery={setSearchQuery}
              sortOrder={sortOrder}
              handleSorting={setSortOrder}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;