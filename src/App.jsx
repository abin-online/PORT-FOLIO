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
import Navbar from './components/NavBar';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false; // Parse savedMode to boolean
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

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
   
        <Navbar
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      isMenuOpen={isMenuOpen}
      toggleMenu={toggleMenu}
      closeMenu={closeMenu}
      navItems={navItems}
    />
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