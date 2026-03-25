const FilterSection = ({
  priceRange,
  handlePriceChange,
  categories,
  selectedCategory,
  handleCategoryChange,
  searchQuery,
  handleSearchQuery,
}) => {
  return (
    <div className="bg-white border-gray-300 hover:shadow-lg rounded-xl p-6 space-y-6">

      <h3 className="font-bold flex items-center gap-2">
        Filters
      </h3>

      {/* Search */}
      <div>
        <h4 className="font-semibold mb-3">Search</h4>

        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => handleSearchQuery(e.target.value)}
          className="w-full focus:outline-none focus:ring-2 focus:ring-secondary/90 p-2 rounded-lg"
        />
      </div>

      {/* Category */}
      <div>
        <h4 className="font-semibold mb-3">Category</h4>

        <div className="space-y-2">

          <button
            onClick={() => handleCategoryChange("")}
            className={`w-full text-left px-3 py-2 rounded-lg ${
              selectedCategory === ""
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                selectedCategory === cat.id
                  ? "bg-secondary text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="font-semibold mb-3">Price Range</h4>

        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={(e) => handlePriceChange(1, Number(e.target.value))}
          className="w-full"
        />

        <div className="flex justify-between text-sm mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

    </div>
  );
};

export default FilterSection;