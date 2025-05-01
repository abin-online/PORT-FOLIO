import { ArrowDown } from 'lucide-react';

const Home = ({ darkMode }) => {
  const scrollToNext = () => {
    // Scroll to the About section
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on the homepage with sections, navigate to About page
      window.location.href = '/about';
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center relative">
      {/* Background gradient effect */}
      <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'} -z-10`}></div>
      
      {/* Animated particles/shapes for background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {darkMode ? (
          // Dark mode particles
          Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-blue-500 opacity-10"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 30 + 20}s linear infinite`
              }}
            ></div>
          ))
        ) : (
          // Light mode particles
          Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-blue-200 opacity-30"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 30 + 20}s linear infinite`
              }}
            ></div>
          ))
        )}
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Hello, I'm  </span>
            <span className={`inline-block animate-fade-in-up ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} style={{ animationDelay: '0.5s' }}> Abin Babu</span>
          </h1>
          
          <h2 className={`text-2xl md:text-3xl font-medium mb-8 animate-fade-in-up ${darkMode ? 'text-blue-300' : 'text-blue-700'}`} style={{ animationDelay: '0.8s' }}>
            Full Stack Developer
          </h2>
          
          <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 animate-fade-in-up ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} style={{ animationDelay: '1.1s' }}>
            I build beautiful, responsive and user-friendly web applications with modern technologies.
          </p>
          
          <div className="flex justify-center space-x-4 animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
            <a 
              href="/contact" 
              className={`px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 
                ${darkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              Hire Me
            </a>
            
            <a 
              href="/projects" 
              className={`px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 border-2 
                ${darkMode 
                  ? 'border-blue-500 text-blue-400 hover:bg-blue-900 hover:bg-opacity-30' 
                  : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
            >
              My Work
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <button 
          onClick={scrollToNext} 
          className={`p-2 rounded-full ${darkMode ? 'text-blue-300 hover:text-blue-400' : 'text-blue-600 hover:text-blue-700'}`}
          aria-label="Scroll down"
        >
          <ArrowDown size={28} />
        </button>
      </div>
      
      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, 30px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;