import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode, navItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Handle scroll events for navbar appearance changes
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      setIsScrolled(position > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.getElementById('mobile-menu-container');
      const toggleButton = document.getElementById('mobile-menu-toggle');
      
      if (isMenuOpen && navbar && !navbar.contains(event.target) && !toggleButton.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  // Handle scroll to top when navigating
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const handleNavClick = (e, path) => {
    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? `h-16 ${darkMode ? 'bg-gray-800/95 backdrop-blur-md' : 'bg-white/95 backdrop-blur-md'} shadow-lg`
          : `h-24 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className={`text-2xl md:text-3xl font-bold transition-all duration-300 transform hover:scale-105 ${
                darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
              }`}
              onClick={(e) => handleNavClick(e, "/")}
            >
              <span className="flex items-center">
                Abin Babu
                <span className={`ml-1 transition-all duration-500 ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  <ChevronDown size={16} className={`transform transition-transform duration-500 ease-in-out ${
                    isScrolled ? 'rotate-180' : 'rotate-0'
                  }`} />
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav - with improved transitions */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-medium transition-all duration-300 ${
                  location.pathname === item.path ? 
                    (darkMode ? 'text-blue-400' : 'text-blue-600') : 
                    (darkMode ? 'text-gray-200' : 'text-gray-700')
                } hover:text-blue-500 group`}
                onClick={(e) => handleNavClick(e, item.path)}
              >
                {item.label}
                <span className={`absolute -bottom-2 left-0 h-0.5 transition-all duration-300 ${
                  location.pathname === item.path ? 'w-full' : 'w-0'
                } ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} group-hover:w-full`}></span>
              </Link>
            ))}
            
            {/* Dark Mode Toggle - with smoother transitions */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-500 transform hover:scale-110 ${
                darkMode 
                  ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600 rotate-0' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 rotate-180'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} className="transition-all duration-500" /> : <Moon size={20} className="transition-all duration-500" />}
            </button>
          </div>

          {/* Mobile Menu Button - with improved transitions */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleDarkMode}
              className={`p-2 mr-3 rounded-full transition-all duration-500 transform active:scale-95 ${
                darkMode 
                  ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600 rotate-0' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 rotate-180'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} className="transition-all duration-500" /> : <Moon size={20} className="transition-all duration-500" />}
            </button>
            
            <button
              id="mobile-menu-toggle"
              onClick={toggleMenu}
              className={`p-2 rounded-md transition-all duration-300 transform active:scale-95 ${
                darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'
              }`}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <X 
                  size={24} 
                  className={`absolute inset-0 transition-all duration-300 transform ${
                    isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'
                  }`} 
                />
                <Menu 
                  size={24} 
                  className={`absolute inset-0 transition-all duration-300 transform ${
                    isMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Improved overlay with better animations */}
      <div 
        id="mobile-menu-container"
        className={`fixed inset-0 bg-black transition-all duration-500 ease-in-out md:hidden ${
          isMenuOpen 
            ? 'bg-opacity-50 pointer-events-auto' 
            : 'bg-opacity-0 pointer-events-none'
        }`}
        style={{ top: isScrolled ? '64px' : '96px' }}
      >
        <div 
          className={`w-full sm:w-80 h-screen ${
            darkMode ? 'bg-gray-900' : 'bg-white'
          } shadow-2xl transform transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="px-4 py-6 space-y-6">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-3 px-4 text-lg font-medium rounded-lg transition-all duration-500 ${
                  location.pathname === item.path ?
                    (darkMode ? 'bg-gray-800 text-blue-400' : 'bg-gray-100 text-blue-600') :
                    (darkMode ? 'text-gray-200 hover:bg-gray-800 hover:text-blue-400' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600')
                }`}
                style={{ 
                  transitionDelay: isMenuOpen ? `${index * 75}ms` : '0ms',
                  transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: isMenuOpen ? 1 : 0
                }}
                onClick={(e) => handleNavClick(e, item.path)}
              >
                {item.label} 
              </Link>
            ))}
          </div>
          
          <div 
            className={`absolute bottom-0 left-0 right-0 p-6 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            } text-center text-sm transition-all duration-700 ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p>&copy; {new Date().getFullYear()} Abin Babu</p>
            <p className="mt-1">Web Developer & Designer</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;