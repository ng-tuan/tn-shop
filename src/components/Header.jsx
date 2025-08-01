import { useState, useEffect, useCallback } from 'react';
import shopLogo from '../assets/favicon_io/android-chrome-512x512.png';

function Header({ closeMobileMenuRef }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Overlay for mobile menu/search
  const showOverlay = isMenuOpen || isSearchOpen;

  // Throttled scroll handler to prevent lag on mobile
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setScrolled(scrollTop > 0);
  }, []);

  useEffect(() => {
    // Use passive event listener for better mobile performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  return (
    <header
      className={`bg-gray-800 h-16 flex items-center px-4 fixed top-0 left-0 right-0 z-50 transform-gpu will-change-transform ${scrolled ? 'shadow-lg' : ''}`}
    >
      {/* Overlay for mobile menu/search */}
      {showOverlay && (
        <div
          className='fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden'
          onClick={() => {
            setIsMenuOpen(false);
            setIsSearchOpen(false);
          }}
        />
      )}
      {/* Desktop & Tablet Layout */}
      <div className='hidden md:flex w-full justify-center'>
        <div className='flex flex-1 justify-center'>
          {/* Logo + Navbar group */}
          <div className='flex items-center space-x-8'>
            <div className='header-icon'>
              <img src={shopLogo} alt='Shop Logo' className='w-10 h-10 object-contain' />
            </div>
            <nav className='flex items-center space-x-8'>
              <a href='#' className='text-white hover:text-gray-300 text-base font-medium'>
                Home
              </a>
              <a href='#' className='text-white hover:text-gray-300 text-base font-medium'>
                Shop
              </a>
              <a href='#' className='text-white hover:text-gray-300 text-base font-medium'>
                About
              </a>
              <a href='#' className='text-white hover:text-gray-300 text-base font-medium'>
                Contact
              </a>
            </nav>
          </div>
        </div>
        {/* Search group */}
        <div className='flex flex-1 justify-center'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search products...'
              className='search-input w-72 pr-10 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg text-base'
            />
            <svg
              className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
          </div>
        </div>
      </div>
      {/* Mobile Layout */}
      <div className='flex md:hidden items-center justify-between w-full'>
        <div className='flex items-center space-x-4'>
          <div className='header-icon'>
            <img src={shopLogo} alt='Shop Logo' className='w-10 h-10 object-contain' />
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          {/* Search Icon for Mobile */}
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className='text-white hover:text-gray-300 p-1'>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
          </button>
          {/* Hamburger Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-white hover:text-gray-300 p-1'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar - Slides down when active */}
      {isSearchOpen && (
        <div className='absolute top-full left-0 right-0 bg-gray-800 p-4 md:hidden border-t border-gray-700 z-40 shadow-lg'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search products...'
              className='search-input w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg text-base'
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu - Slides down when active */}
      {isMenuOpen && (
        <div className='absolute top-full left-0 right-0 bg-gray-800 p-4 md:hidden border-t border-gray-700 z-40 shadow-lg'>
          <nav className='flex flex-col space-y-4'>
            <a href='#' className='text-white hover:text-gray-300 text-base py-2 font-medium transition-colors duration-200'>
              Home
            </a>
            <a href='#' className='text-white hover:text-gray-300 text-base py-2 font-medium transition-colors duration-200'>
              Shop
            </a>
            <a href='#' className='text-white hover:text-gray-300 text-base py-2 font-medium transition-colors duration-200'>
              About
            </a>
            <a href='#' className='text-white hover:text-gray-300 text-base py-2 font-medium transition-colors duration-200'>
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
