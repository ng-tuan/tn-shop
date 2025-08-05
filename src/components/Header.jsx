import { useState, useEffect, useCallback } from "react";
import shopLogo from "../assets/favicon_io/android-chrome-512x512.png";
import categories from "../data/categories.json";
import { useSearchContext } from "../hooks/useSearchContext";

function Header({ closeMobileMenuRef }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Use the search context
  const { searchTerm, setSearchTerm, resetSearch, selectedCategory } =
    useSearchContext();

  // Overlay for mobile menu/search
  const showOverlay = isMenuOpen || isSearchOpen;

  // Throttled scroll handler to prevent lag on mobile
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setScrolled(scrollTop > 0);
  }, []);

  useEffect(() => {
    // Use passive event listener for better mobile performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu function that can be called from parent
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  };

  // Expose the close function to parent component via ref
  useEffect(() => {
    if (closeMobileMenuRef) {
      closeMobileMenuRef.current = closeMobileMenu;
    }
  }, [closeMobileMenuRef]);

  const handleCategoryClick = (category) => {
    // Clear search term when category is selected
    setSearchTerm("");
    // Reset search when category is selected
    resetSearch();
    // Dispatch custom event for category selection
    window.dispatchEvent(
      new CustomEvent("categorySelect", { detail: category }),
    );
    closeMobileMenu();
  };

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  // Handle search input key press (Enter key)
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Search is already active in real-time, just ensure focus is maintained
      e.target.blur();
      // Close mobile search overlay
      setIsSearchOpen(false);
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <>
      <header
        className={`bg-gray-800 h-14 sm:h-16 flex items-center px-3 sm:px-4 lg:px-6 fixed top-0 left-0 right-0 z-50 transform-gpu will-change-transform transition-shadow duration-300 ${scrolled ? "shadow-lg" : ""}`}
      >
        {/* Overlay for mobile menu/search */}
        {showOverlay && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
            onClick={() => {
              setIsMenuOpen(false);
              setIsSearchOpen(false);
            }}
          />
        )}

        {/* Desktop Layout (lg and above) */}
        <div className="hidden lg:flex w-full max-w-7xl mx-auto items-center justify-between">
          {/* Logo + Navigation Group */}
          <div className="flex items-center space-x-8 xl:space-x-10">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src={shopLogo}
                alt="Logo cửa hàng"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-6 xl:space-x-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className={`text-sm xl:text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "text-[#276c86] font-semibold"
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Search Group */}
          <div className="flex-shrink-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="search-input w-64 xl:w-80 pr-10 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg text-sm xl:text-base px-4 py-2"
              />
              {searchTerm ? (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  aria-label="Clear search"
                >
                  <svg
                    className="w-4 h-4 xl:w-5 xl:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              ) : (
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 xl:w-5 xl:h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Tablet Layout (md to lg) */}
        <div className="hidden md:flex lg:hidden w-full items-center justify-between">
          {/* Logo + Navigation Group */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src={shopLogo}
                alt="Logo cửa hàng"
                className="w-8 h-8 object-contain"
              />
            </div>

            {/* Navigation - Compact */}
            <nav className="flex items-center space-x-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className={`text-xs font-medium transition-colors duration-200 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "text-[#276c86] font-semibold"
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Search Group */}
          <div className="flex-shrink-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="search-input w-48 pr-8 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg text-xs px-3 py-1"
              />
              {searchTerm ? (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  aria-label="Clear search"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              ) : (
                <svg
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Layout (sm and below) */}
        <div className="flex md:hidden items-center justify-between w-full">
          {/* Logo + Menu Group */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src={shopLogo}
                alt="Logo cửa hàng"
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
              />
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-300 p-1.5 sm:p-2 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Search Group */}
          <div className="flex-shrink-0">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-gray-300 p-1.5 sm:p-2 transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-gray-800 p-3 sm:p-4 lg:hidden border-t border-gray-700 z-20 shadow-lg">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="search-input w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg text-sm sm:text-base px-4 py-2.5 sm:py-3"
                autoFocus
              />
              {searchTerm ? (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  aria-label="Clear search"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              ) : (
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gray-800 p-3 sm:p-4 lg:hidden border-t border-gray-700 z-40 shadow-lg max-h-[70vh] overflow-y-auto">
            <nav className="flex flex-col space-y-2 sm:space-y-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className={`w-full text-left text-sm sm:text-base py-2.5 sm:py-3 font-medium transition-colors duration-200 border-b border-gray-700 last:border-b-0 ${
                    selectedCategory === category.id
                      ? "text-[#276c86] font-semibold"
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Click outside to close mobile search - Outside header */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </>
  );
}

export default Header;
