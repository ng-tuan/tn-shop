import React from 'react';
import StarRating from './StarRating';

const ProductDetailDialog = ({ open, onClose, product }) => {
  if (!open || !product) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4' onClick={onClose}>
      <div
        className='bg-white rounded-2xl shadow-xl w-full max-w-md md:max-w-2xl max-h-[90vh] overflow-y-auto relative'
        onClick={e => e.stopPropagation()}
      >
        {/* Close button - Improved for mobile */}
        <button
          onClick={onClose}
          className='absolute top-3 right-3 md:top-4 md:right-4 text-gray-500 hover:text-gray-700 text-3xl md:text-2xl font-light z-10 w-12 h-12 md:w-10 md:h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-gray-300'
          aria-label='Close dialog'
        >
          <svg className='w-6 h-6 md:w-5 md:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
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
