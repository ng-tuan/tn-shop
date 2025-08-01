import { useState } from 'react';
import products from './products.json';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductDetailDialog from './components/ProductDetailDialog';
import ScrollToTop from './components/ScrollToTop';
import StarRating from './components/StarRating';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProductClick = product => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-6 py-8 pt-20'>
        {/* Product Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {products.map(product => (
            <div
              key={product.id}
              className='product-card cursor-pointer hover:shadow-lg transition-shadow duration-300'
              onClick={() => handleProductClick(product)}
            >
              <div className='aspect-square overflow-hidden'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                />
              </div>
              <div className='p-4'>
                <h3 className='text-lg md:text-xl font-bold text-gray-900 mb-1 line-clamp-1'>{product.name}</h3>
                <p className='text-base md:text-lg text-blue-700 font-semibold mb-2'>{product.price}</p>

                {/* Rating */}
                <div className='flex items-center mb-2'>
                  <span className='text-sm text-gray-600 mr-2'>{product.rating}</span>
                  <StarRating rating={product.rating} />
                </div>

                {/* Description */}
                <p className='text-xs md:text-sm text-gray-600 mb-4 line-clamp-2'>{product.description}</p>

                {/* Buy Button */}
                <button
                  className='w-full bg-blue-600 text-white px-4 py-2 md:py-3 rounded text-sm md:text-base font-medium hover:bg-blue-700 transition-colors mb-2 md:mb-3'
                  onClick={e => {
                    e.stopPropagation();
                    window.open(product.link, '_blank');
                  }}
                >
                  BUY
                </button>
                <button
                  className='w-full bg-gray-200 text-gray-700 px-4 py-2 md:py-3 rounded text-sm md:text-base font-medium hover:bg-gray-300 transition-colors'
                  onClick={e => {
                    e.stopPropagation();
                    // Handle add to cart logic here
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Product Detail Dialog */}
      <ProductDetailDialog open={isDialogOpen} onClose={handleCloseDialog} product={selectedProduct} />

      {/* Footer */}
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
