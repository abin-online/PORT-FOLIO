import { ArrowDown, Code, Layers, GitBranch } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Home = ({ darkMode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

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

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Set loaded state after a short delay for entrance animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  // Interactive hexagonal grid background effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Create particle class
    class Particle {
      constructor(x, y, size, color, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speed = speed;
        this.angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.connected = [];
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) {
          this.vx *= -1;
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy *= -1;
        }
      }

      draw() {
        // Draw hexagon instead of circle
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const x = this.x + this.size * Math.cos(angle);
          const y = this.y + this.size * Math.sin(angle);
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fillStyle = this.color.replace(')', `, ${this.opacity})`);
        ctx.fill();
      }
    }

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(canvas.width * canvas.height / 20000), 100);
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 20 + 10;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const speed = Math.random() * 0.5 + 0.1;
        const color = darkMode 
          ? `rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1})` 
          : `rgba(59, 130, 246, ${Math.random() * 0.2 + 0.05})`;
        
        particles.push(new Particle(x, y, size, color, speed));
      }
    };

    // Draw connection lines between nearby particles
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = canvas.width / 8;
          
          if (distance < maxDistance) {
            // Calculate line opacity based on distance
            const opacity = 1 - (distance / maxDistance);
            
            ctx.beginPath();
            ctx.strokeStyle = darkMode 
              ? `rgba(59, 130, 246, ${opacity * 0.2})` 
              : `rgba(59, 130, 246, ${opacity * 0.1})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add mouse influence - particles will slightly move towards mouse
      if (mousePosition.x && mousePosition.y) {
        particles.forEach(particle => {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (200 - distance) / 200;
            
            particle.vx += forceDirectionX * force * 0.05;
            particle.vy += forceDirectionY * force * 0.05;
          }
          
          // Limit velocity
          const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
          if (speed > 1.5) {
            particle.vx = (particle.vx / speed) * 1.5;
            particle.vy = (particle.vy / speed) * 1.5;
          }
        });
      }
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Connect particles with lines
      connectParticles();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode, mousePosition]);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
    >
      {/* Canvas for interactive background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full -z-10"
      />
      
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 ${
        darkMode 
          ? 'bg-gradient-radial from-gray-900/40 via-gray-900/70 to-gray-900/95' 
          : 'bg-gradient-radial from-white/0 via-white/60 to-white/90'
      } -z-10`}></div>
      
      {/* Animated tech symbols floating in background */}
      <div className="absolute inset-0 overflow-hidden -z-5">
        {/* Code symbols */}
        <div className={`absolute top-1/4 left-1/5 transform -translate-x-1/2 opacity-5 ${
          isLoaded ? 'animate-float-slow' : 'opacity-0'
        }`}>
          <Code size={120} className={darkMode ? 'text-blue-300' : 'text-blue-600'} />
        </div>
        
        <div className={`absolute bottom-1/4 right-1/4 transform translate-x-1/2 opacity-5 ${
          isLoaded ? 'animate-float-reverse' : 'opacity-0'
        }`}>
          <Layers size={150} className={darkMode ? 'text-blue-400' : 'text-blue-500'} />
        </div>
        
        <div className={`absolute top-2/3 left-2/3 transform -translate-y-1/2 opacity-5 ${
          isLoaded ? 'animate-float-medium' : 'opacity-0'
        }`}>
          <GitBranch size={100} className={darkMode ? 'text-blue-200' : 'text-blue-700'} />
        </div>
      </div>
      
      {/* Main content with 3D perspective effect */}
      <div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 perspective-1000"
        style={{
          transform: `rotateX(${mousePosition.y * -0.01}deg) rotateY(${mousePosition.x * 0.01}deg)`
        }}
      >
        <div className="text-center transform-gpu">
          {/* Glowing circle behind name */}
          <div className={`absolute w-64 h-64 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-3xl ${
            darkMode ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20' : 'bg-gradient-to-r from-blue-200/30 to-purple-200/30'
          } ${isLoaded ? 'animate-pulse-slow' : 'opacity-0'}`}></div>
          
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'} relative`}>
            <span className={`inline-block transition-all duration-1000 transform ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`} style={{ transitionDelay: '200ms' }}>Hello, I'm  </span>
            <span className={`inline-block transition-all duration-1000 transform ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            } ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} 
              style={{ transitionDelay: '500ms' }}
            >
               Abin Babu
              {/* Underline effect */}
              <span className={`block h-1 mt-1 ${
                darkMode ? 'bg-blue-500' : 'bg-blue-600'
              } transition-all duration-1000 delay-1000 ${
                isLoaded ? 'w-full' : 'w-0'
              }`}></span>
            </span>
          </h1>
          
          <h2 className={`text-2xl md:text-3xl font-medium mb-8 transition-all duration-1000 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          } ${darkMode ? 'text-blue-300' : 'text-blue-700'}`} 
            style={{ transitionDelay: '800ms' }}
          >
            <span className="relative inline-block">
              Full Stack Developer
              {/* Typing cursor effect */}
              <span className={`absolute right-0 top-0 h-full w-1 ${
                darkMode ? 'bg-blue-300' : 'bg-blue-700'
              } transform translate-x-2 ${isLoaded ? 'animate-blink' : ''}`}></span>
            </span>
          </h2>
          
          <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 transition-all duration-1000 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          } ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} 
            style={{ transitionDelay: '1100ms' }}
          >
            I build beautiful, responsive and user-friendly web applications with modern technologies.
          </p>
          
          <div className={`flex justify-center space-x-4 transition-all duration-1000 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`} style={{ transitionDelay: '1400ms' }}>
            <a 
              href="/contact" 
              className={`px-6 py-3 rounded-full font-medium transition-all duration-500 transform hover:scale-105 relative overflow-hidden group
                ${darkMode 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-600 text-white'
                }`}
            >
              <span className="relative z-10">Hire Me</span>
              <span className={`absolute inset-0 w-0 ${
                darkMode ? 'bg-blue-500' : 'bg-blue-700'
              } transition-all duration-300 group-hover:w-full`}></span>
            </a>
            
            <a 
              href="/projects" 
              className={`px-6 py-3 rounded-full font-medium transition-all duration-500 transform hover:scale-105 relative border-2 overflow-hidden group
                ${darkMode 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-blue-600 text-blue-600'
                }`}
            >
              <span className="relative z-10">My Work</span>
              <span className={`absolute inset-0 w-0 ${
                darkMode ? 'bg-blue-900/30' : 'bg-blue-100/70'
              } transition-all duration-300 group-hover:w-full`}></span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator with enhanced effect */}
      <div className={`absolute bottom-10 left-0 right-0 flex justify-center transition-all duration-1000 transform ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`} style={{ transitionDelay: '1700ms' }}>
        <button 
          onClick={scrollToNext} 
          className={`p-2 rounded-full relative ${
            darkMode ? 'text-blue-300 hover:text-blue-400' : 'text-blue-600 hover:text-blue-700'
          } group transition-transform transform hover:translate-y-1`}
          aria-label="Scroll down"
        >
          {/* Animated pulse circle behind arrow */}
          <span className={`absolute inset-0 rounded-full ${
            darkMode ? 'bg-blue-500/10' : 'bg-blue-200/30'
          } scale-0 group-hover:scale-100 transition-transform duration-300`}></span>
          
          <ArrowDown size={28} className="animate-bounce-gentle" />
        </button>
      </div>
      
      {/* Add CSS for animations */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-gpu {
          transform: translateZ(0);
        }
        
        @keyframes float-slow {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, -20px) rotate(10deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes float-medium {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-15px, 15px) rotate(-5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes float-reverse {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-25px, -10px) rotate(-15deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 12s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 18s ease-in-out infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default Home;