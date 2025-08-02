import { useState, useEffect } from "react";
import products from "../data/products.json";
import categories from "../data/categories.json";
import ProductDetailDialog from "./ProductDetailDialog";
import StarRating from "./StarRating";
import { useSearchContext } from "../hooks/useSearchContext";

function Main({ closeMobileMenuRef }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Use the search context
  const {
    searchTerm,
    filteredProducts,
    hasSearchResults,
    totalResults,
    isSearching,
    selectedCategory: searchSelectedCategory,
    setSelectedCategory: setSearchCategory,
    clearSearchTerm,
  } = useSearchContext();

  // Create category mapping from categories data
  const categoryMapping = categories.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});

  // Listen for category selection events from Header
  useEffect(() => {
    const handleCategorySelect = (event) => {
      setSearchCategory(event.detail.id);
    };

    window.addEventListener("categorySelect", handleCategorySelect);
    return () =>
      window.removeEventListener("categorySelect", handleCategorySelect);
  }, [setSearchCategory]);

  // Use search results when searching, otherwise use category filtered products
  const displayProducts = isSearching
    ? filteredProducts
    : searchSelectedCategory === "550e8400-e29b-41d4-a716-446655440000"
      ? products
      : products.filter(
          (product) => product.category === searchSelectedCategory,
        );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
    // Close mobile menu when dialog opens
    if (window.innerWidth < 768) {
      // Only on mobile devices
      if (closeMobileMenuRef.current) {
        closeMobileMenuRef.current();
      }
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 pt-20">
        {/* Search Results Info */}
        {isSearching && (
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {hasSearchResults ? (
                  <p>
                    Tìm thấy {totalResults} sản phẩm cho "{searchTerm}"
                  </p>
                ) : (
                  <p>Không tìm thấy sản phẩm nào cho "{searchTerm}"</p>
                )}
              </div>
              <button
                onClick={() => {
                  clearSearchTerm();
                }}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Xóa tìm kiếm
              </button>
            </div>
          </div>
        )}

        {/* Category Filter Display */}
        {searchSelectedCategory !== "550e8400-e29b-41d4-a716-446655440000" &&
          !isSearching && (
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {categoryMapping[searchSelectedCategory]}
                </h2>
                <button
                  onClick={() =>
                    setSearchCategory("550e8400-e29b-41d4-a716-446655440000")
                  }
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Xem tất cả sản phẩm
                </button>
              </div>
            </div>
          )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="product-card cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleProductClick(product)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-base md:text-lg text-blue-700 font-semibold mb-2">
                  {product.price}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-600 mr-2">
                    {product.rating}
                  </span>
                  <StarRating rating={product.rating} />
                </div>

                {/* Description */}
                <p className="text-xs md:text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Buy Button */}
                <button
                  className="w-full bg-blue-600 text-white px-4 py-2 md:py-3 rounded text-sm md:text-base font-medium hover:bg-blue-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(product.link, "_blank");
                  }}
                >
                  MUA NGAY
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Message */}
        {displayProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Không tìm thấy sản phẩm
            </h3>
            <p className="text-gray-600 mb-4">
              {isSearching
                ? `Không có sản phẩm nào phù hợp với tìm kiếm "${searchTerm}".`
                : "Không có sản phẩm nào trong danh mục này."}
            </p>
            <button
              onClick={() => {
                if (isSearching) {
                  clearSearchTerm();
                } else {
                  setSearchCategory("550e8400-e29b-41d4-a716-446655440000");
                }
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition-colors"
            >
              {isSearching ? "Xem tất cả sản phẩm" : "Xem tất cả sản phẩm"}
            </button>
          </div>
        )}
      </main>

      {/* Product Detail Dialog */}
      <ProductDetailDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        product={selectedProduct}
      />
    </>
  );
}

export default Main;
