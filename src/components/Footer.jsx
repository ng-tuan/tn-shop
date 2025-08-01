import React from 'react';
import shopLogo from '../assets/shop.png';

function Footer() {
  return (
    <footer className='bg-gray-800 text-white'>
      <div className='max-w-7xl mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='space-y-4'>
            <div className='flex items-center space-x-3'>
              <img src={shopLogo} alt='TNShop Logo' className='w-8 h-8 object-contain' />
              <h3 className='text-xl font-bold'>TNShop</h3>
            </div>
            <p className='text-base text-gray-300 leading-relaxed'>Your one-stop shop for everything you need.</p>
          </div>
        </div>

        <div className='border-t border-gray-700 mt-8 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-base text-gray-300'>© 2025 TNShop. All rights reserved.</p>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <a className='hidden md:block text-base text-gray-300 hover:text-white transition-colors'>Privacy Policy</a>
              <a className='hidden md:block text-base text-gray-300 hover:text-white transition-colors'>Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
