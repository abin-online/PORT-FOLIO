import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

// Import components
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Education from './components/Education';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false; // Parse savedMode to boolean
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check for user's preferred color scheme on initial load
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    // Store the user's preference in localStorage whenever darkMode changes
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projects' },
    { path: '/education', label: 'Education' },
    { path: '/skills', label: 'Skills' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
        {/* Navigation */}
        <nav className={`fixed w-full h-28 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-28">
              <div className="flex items-center">
                <span className={`text-3xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Abin Babu</span>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <a 
                    key={item.path} 
                    href={item.path} 
                    className={`hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                    onClick={(e) => {
                      if (window.location.pathname === item.path) {
                        e.preventDefault();
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth'
                        });
                      }
                    }}
                  >
                    {item.label}
                  </a>
                ))}
                
                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 mr-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                  onClick={toggleMenu}
                  className={`p-2 rounded-md ${darkMode ? 'text-white' : 'text-gray-700'}`}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  onClick={(e) => {
                    closeMenu();
                    if (window.location.pathname === item.path) {
                      e.preventDefault();
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} />} />
            <Route path="/about" element={<About darkMode={darkMode} />} />
            <Route path="/services" element={<Services darkMode={darkMode} />} />
            <Route path="/projects" element={<Projects darkMode={darkMode} />} />
            <Route path="/education" element={<Education darkMode={darkMode} />} />
            <Route path="/skills" element={<Skills darkMode={darkMode} />} />
            <Route path="/contact" element={<Contact darkMode={darkMode} />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className={`py-6 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;