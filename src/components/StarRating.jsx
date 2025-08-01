import React from 'react';

const StarRating = ({ rating }) => {
  // Renders stars based on rating (e.g. 4.5)
  const fullStars = Math.floor(rating);
  const decimalPart = rating % 1;

  // Determine star type based on decimal part
  let starType = 'empty';
  if (decimalPart >= 0.875) {
    starType = 'full';
  } else if (decimalPart >= 0.625) {
    starType = 'three-quarter';
  } else if (decimalPart >= 0.375) {
    starType = 'half';
  } else if (decimalPart >= 0.125) {
    starType = 'quarter';
  }

  const emptyStars = 5 - fullStars - (starType !== 'empty' ? 1 : 0);

  return (
    <span className='flex items-center'>
      {[...Array(fullStars)].map((_, i) => (
        <svg key={i} className='w-5 h-5 md:w-6 md:h-6 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z' />
        </svg>
      ))}

      {starType === 'full' && (
        <svg className='w-5 h-5 md:w-6 md:h-6 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z' />
        </svg>
      )}

      {starType === 'three-quarter' && (
        <svg className='w-5 h-5 md:w-6 md:h-6 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
          <defs>
            <linearGradient id='three-quarter'>
              <stop offset='75%' stopColor='currentColor' />
              <stop offset='75%' stopColor='white' />
            </linearGradient>
          </defs>
          <path
            fill='url(#three-quarter)'
            d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z'
          />
        </svg>
      )}

      {starType === 'half' && (
        <svg className='w-5 h-5 md:w-6 md:h-6 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
          <defs>
            <linearGradient id='half'>
              <stop offset='50%' stopColor='currentColor' />
              <stop offset='50%' stopColor='white' />
            </linearGradient>
          </defs>
          <path
            fill='url(#half)'
            d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z'
          />
        </svg>
      )}

      {starType === 'quarter' && (
        <svg className='w-5 h-5 md:w-6 md:h-6 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
          <defs>
            <linearGradient id='quarter'>
              <stop offset='25%' stopColor='currentColor' />
              <stop offset='25%' stopColor='white' />
            </linearGradient>
          </defs>
          <path
            fill='url(#quarter)'
            d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z'
          />
        </svg>
      )}

      {[...Array(emptyStars)].map((_, i) => (
        <svg key={i} className='w-5 h-5 md:w-6 md:h-6 text-gray-300' fill='currentColor' viewBox='0 0 20 20'>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z' />
        </svg>
      ))}
    </span>
  );
};

export default StarRating;
