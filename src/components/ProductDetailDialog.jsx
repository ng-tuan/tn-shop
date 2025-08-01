import React, { useEffect } from 'react';
import StarRating from './StarRating';

const ProductDetailDialog = ({ open, onClose, product }) => {
  if (!open || !product) return null;

  // Handle back button behavior on mobile devices
  useEffect(() => {
    if (!open) return;

    const handleBackButton = (event) => {
      // Prevent default back behavior
      event.preventDefault();
      onClose();
    };

    // Add event listener for popstate (back button)
    window.addEventListener('popstate', handleBackButton);
    
    // Push a new state to enable back button functionality
    window.history.pushState({ dialog: 'open' }, '');

    return () => {
      window.removeEventListener('popstate', handleBackButton);
      // Clean up the history state when dialog closes
      if (window.history.state?.dialog === 'open') {
        window.history.back();
      }
    };
  }, [open, onClose]);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4' onClick={onClose}>
      <div
        className='bg-white rounded-2xl shadow-xl w-full max-w-md md:max-w-2xl max-h-[90vh] overflow-y-auto relative'
        onClick={e => e.stopPropagation()}
      >
        {/* Close button - Improved for mobile */}
        <button
          onClick={onClose}
          className='absolute top-2 right-2 md:top-3 md:right-3 text-gray-700 hover:text-gray-800 text-3xl md:text-2xl font-light z-10 w-10 h-10 md:w-8 md:h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-300 hover:border-gray-400 opacity-70 hover:opacity-100'
          aria-label='Close dialog'
        >
          <svg className='w-5 h-5 md:w-4 md:h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>

        {/* Mobile Layout */}
        <div className='md:hidden p-4'>
          {/* Product image */}
          <div className='flex justify-center mb-4'>
            <img src={product.image} alt={product.name} className='w-64 h-64 object-cover rounded-xl border' />
          </div>

          {/* Product info */}
          <div className='space-y-3'>
            <h2 className='text-2xl font-bold'>{product.name}</h2>
            <div className='text-2xl font-semibold'>${product.price}</div>
            <div className='flex items-center'>
              <span className='mr-2 text-gray-700 font-medium text-base'>{product.rating}</span>
              <StarRating rating={product.rating} />
            </div>
            <div className='text-gray-600 text-base leading-relaxed'>{product.description}</div>

            {/* Buy Button */}
            <button
              className='w-full bg-blue-600 text-white px-4 py-3 rounded text-base font-medium hover:bg-blue-700 transition-colors mb-3'
              onClick={() => window.open(product.link, '_blank')}
            >
              BUY
            </button>
            {/* Add to Cart Button */}
            <button className='w-full bg-gray-200 text-gray-700 px-4 py-3 rounded text-base font-medium hover:bg-gray-300 transition-colors mt-0'>
              Add to Cart
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className='hidden md:flex p-8 gap-8'>
          {/* Product image */}
          <div className='flex-shrink-0 flex items-center justify-center'>
            <img src={product.image} alt={product.name} className='w-48 h-48 object-cover rounded-xl border' />
          </div>

          {/* Product info */}
          <div className='flex-1 min-w-0'>
            <h2 className='text-3xl font-bold mb-3'>{product.name}</h2>
            <div className='text-3xl font-semibold mb-3'>${product.price}</div>
            <div className='flex items-center mb-3'>
              <span className='mr-3 text-gray-700 font-medium text-lg'>{product.rating}</span>
              <StarRating rating={product.rating} />
            </div>
            <div className='text-gray-600 mb-6 text-lg leading-relaxed'>{product.description}</div>
            <button
              className='w-full bg-blue-600 text-white px-4 py-3 rounded text-base font-medium hover:bg-blue-700 transition-colors mb-3'
              onClick={() => window.open(product.link, '_blank')}
            >
              BUY
            </button>
            <button className='w-full bg-gray-200 text-gray-700 px-4 py-3 rounded text-base font-medium hover:bg-gray-300 transition-colors mt-0'>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailDialog;
