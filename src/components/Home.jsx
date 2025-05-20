import { ArrowDown, Code, Layers, GitBranch, Star, Zap, Database } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Home = ({ darkMode = true }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [cursorVariant, setCursorVariant] = useState("default");
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const customCursorRef = useRef(null);
  const textRef = useRef(null);

  // Cursor states for interactive elements
  const cursorEnter = () => setCursorVariant("hover");
  const cursorLeave = () => setCursorVariant("default");

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/about';
    }
  };

  // Handle mouse movement for parallax and custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setMousePosition({ x, y });
      }
      
      // Update custom cursor position
      if (customCursorRef.current) {
        customCursorRef.current.style.left = `${e.clientX}px`;
        customCursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    // Track scroll position
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Staggered entrance animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Text effect - scramble/unscramble
  useEffect(() => {
    if (!isLoaded || !textRef.current) return;
    
    const originalText = "Full Stack Developer";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval = null;
    let iteration = 0;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
      textRef.current.innerText = originalText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");
      
      if (iteration >= originalText.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
    
    return () => clearInterval(interval);
  }, [isLoaded]);

  // Interactive particle background
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let hue = darkMode ? 210 : 220;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Advanced particle class with more behaviors
    class Particle {
      constructor(x, y, size, color, speed) {
        this.x = x;
        this.y = y;
        this.originalSize = size;
        this.size = size;
        this.color = color;
        this.speed = speed;
        this.angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.connected = [];
        this.opacity = Math.random() * 0.5 + 0.1;
        this.maxDistance = canvas.width / (darkMode ? 6 : 8);
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseAmount = Math.random() * 0.5 + 0.5;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.sides = Math.floor(Math.random() * 2) + 6; // Hexagons and heptagons
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
      }

      update(time) {
        // Pulse effect
        this.size = this.originalSize + Math.sin(time * this.pulseSpeed + this.pulseOffset) * this.pulseAmount;
        this.rotation += this.rotationSpeed;
        
        // Update position with slight turbulence
        this.vx += (Math.random() - 0.5) * 0.01;
        this.vy += (Math.random() - 0.5) * 0.01;
        
        // Limit velocity
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 1) {
          this.vx = (this.vx / speed) * 1;
          this.vy = (this.vy / speed) * 1;
        }
        
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls with slight angle change
        if (this.x < 0 || this.x > canvas.width) {
          this.vx *= -1;
          this.vx += (Math.random() - 0.5) * 0.1;
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy *= -1;
          this.vy += (Math.random() - 0.5) * 0.1;
        }
      }

      draw() {
        // Draw polygon (hexagon or heptagon)
        ctx.beginPath();
        for (let i = 0; i < this.sides; i++) {
          const angle = this.rotation + (Math.PI * 2 / this.sides) * i;
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
        
        // Add subtle glow effect
        ctx.shadowColor = this.color.replace(')', ', 0.5)');
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Initialize particles with varying shapes and behaviors
    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(canvas.width * canvas.height / 15000), 120);
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 20 + 8;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const speed = Math.random() * 0.5 + 0.1;
        
        // Create particles with a slightly different hue for variety
        const particleHue = hue + (Math.random() * 30 - 15);
        const color = darkMode 
          ? `hsla(${particleHue}, 80%, 60%` 
          : `hsla(${particleHue}, 70%, 50%`;
        
        particles.push(new Particle(x, y, size, color, speed));
      }
    };

    // Advanced connection lines with color transitions
    const connectParticles = (time) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = particles[i].maxDistance;
          
          if (distance < maxDistance) {
            // Calculate line opacity and thickness based on distance
            const opacity = 1 - (distance / maxDistance);
            const thickness = opacity * 2;
            
            // Create gradient for connection lines
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y, 
              particles[j].x, particles[j].y
            );
            
            const color1 = particles[i].color.replace(')', `, ${opacity * 0.7})`);
            const color2 = particles[j].color.replace(')', `, ${opacity * 0.7})`);
            
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = thickness;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop with time parameter for animations
    let startTime = Date.now();
    const animate = () => {
      const time = (Date.now() - startTime) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Shift hue slightly over time for subtle color changes
      hue = darkMode ? 210 + Math.sin(time * 0.1) * 15 : 220 + Math.sin(time * 0.1) * 10;
      
      // Add mouse influence with dynamic force
      if (mousePosition.x && mousePosition.y) {
        particles.forEach(particle => {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 300) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (300 - distance) / 300;
            const mouseForceFactor = 0.08;
            
            particle.vx += forceDirectionX * force * mouseForceFactor;
            particle.vy += forceDirectionY * force * mouseForceFactor;
          }
        });
      }
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update(time);
        particle.draw();
      });
      
      // Connect particles with lines
      connectParticles(time);
      
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
      {/* Custom cursor */}
      <div 
        ref={customCursorRef}
        className={`fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-200 ease-out ${
          cursorVariant === "hover" ? "scale-150 bg-white" : "scale-100 bg-white"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      />
      
      {/* Canvas for interactive background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full -z-10"
      />
      
      {/* Background gradient overlay with enhanced depth */}
      <div className={`absolute inset-0 ${
        darkMode 
          ? 'bg-gradient-radial from-gray-900/20 via-gray-900/60 to-gray-900/95' 
          : 'bg-gradient-radial from-white/0 via-white/40 to-white/85'
      } -z-10`}></div>
      
      {/* Floating 3D shapes with enhanced animations */}
      <div className="absolute inset-0 overflow-hidden -z-5">
        {/* 3D rotating shapes - more elements for richer background */}
        <div className={`absolute top-1/4 left-1/5 transform -translate-x-1/2 opacity-5 ${
          isLoaded ? 'animate-float-perspective-slow' : 'opacity-0'
        }`}>
          <Code size={120} className={darkMode ? 'text-blue-300' : 'text-blue-600'} />
        </div>
        
        <div className={`absolute bottom-1/4 right-1/4 transform translate-x-1/2 opacity-5 ${
          isLoaded ? 'animate-float-rotate' : 'opacity-0'
        }`}>
          <Layers size={150} className={darkMode ? 'text-blue-400' : 'text-blue-500'} />
        </div>
        
        <div className={`absolute top-2/3 left-2/3 transform -translate-y-1/2 opacity-5 ${
          isLoaded ? 'animate-float-scale' : 'opacity-0'
        }`}>
          <GitBranch size={100} className={darkMode ? 'text-blue-200' : 'text-blue-700'} />
        </div>
        
        {/* Additional floating elements */}
        <div className={`absolute top-1/3 right-1/6 transform opacity-5 ${
          isLoaded ? 'animate-float-complex' : 'opacity-0'
        }`}>
          <Zap size={90} className={darkMode ? 'text-purple-300' : 'text-purple-600'} />
        </div>
        
        <div className={`absolute bottom-1/5 left-1/3 transform opacity-5 ${
          isLoaded ? 'animate-float-twist' : 'opacity-0'
        }`}>
          <Database size={110} className={darkMode ? 'text-teal-300' : 'text-teal-600'} />
        </div>
        
        <div className={`absolute top-1/6 right-1/3 transform opacity-5 ${
          isLoaded ? 'animate-float-bounce' : 'opacity-0'
        }`}>
          <Star size={80} className={darkMode ? 'text-amber-300' : 'text-amber-600'} />
        </div>
      </div>
      
      {/* Main content with enhanced 3D perspective effect */}
      <div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 perspective-2000"
        style={{
          transform: `rotateX(${mousePosition.y * -0.015}deg) rotateY(${mousePosition.x * 0.015}deg) translateZ(10px)`
        }}
      >
        <div className="text-center transform-gpu relative">
          {/* Enhanced glow effects */}
          <div className={`absolute w-80 h-80 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-3xl ${
            darkMode ? 'bg-gradient-to-tr from-blue-600/25 via-purple-600/20 to-teal-500/15' : 'bg-gradient-to-tr from-blue-300/40 via-purple-300/30 to-teal-200/25'
          } ${isLoaded ? 'animate-morphing-glow' : 'opacity-0'}`}></div>
          
          {/* Subtle radial light rays */}
          <div className={`absolute w-full h-full top-0 left-0 ${
            isLoaded ? 'animate-radiate' : 'opacity-0'
          }`}>
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className={`absolute w-1 h-64 top-1/2 left-1/2 origin-bottom ${
                  darkMode ? 'bg-gradient-to-t from-blue-500/0 via-blue-500/5 to-blue-300/10' : 'bg-gradient-to-t from-blue-600/0 via-blue-500/5 to-blue-400/10'
                }`}
                style={{ 
                  transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                  animationDelay: `${i * 0.5}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Name with creative reveal animation */}
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'} relative`}>
            <span className={`inline-block transition-all duration-1000 transform ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`} style={{ transitionDelay: '200ms' }}>Hello, I'm</span>
            <span className={`inline-block mx-3 transition-all duration-1000 transform ${
              isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'
            } ${darkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500'}`} 
              style={{ transitionDelay: '500ms' }}
            >
              Abin Babu
              {/* Enhanced underline effect with animated gradient */}
              <span className={`block h-1 mt-1 bg-gradient-to-r ${
                darkMode ? 'from-blue-500 via-purple-400 to-blue-500' : 'from-blue-700 via-purple-500 to-blue-700'
              } transition-all duration-1000 delay-1000 ${
                isLoaded ? 'w-full animate-gradient-x' : 'w-0'
              }`}></span>
            </span>
          </h1>
          
          {/* Title with text scramble effect */}
          <h2 className={`text-2xl md:text-3xl font-medium mb-8 transition-all duration-1000 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          } ${darkMode ? 'text-blue-300' : 'text-blue-700'}`} 
            style={{ transitionDelay: '800ms' }}
          >
            <span className="relative inline-block">
              <span ref={textRef}>Full Stack Developer</span>
              {/* Enhanced typing cursor effect */}
              <span className={`absolute right-0 top-0 h-full w-1 ${
                darkMode ? 'bg-blue-300' : 'bg-blue-700'
              } transform translate-x-2 ${isLoaded ? 'animate-cursor-blink' : ''}`}></span>
            </span>
          </h2>
          
          {/* Description with staggered character reveal */}
          <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 transition-all duration-1000 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`} style={{ transitionDelay: '1100ms' }}>
            {isLoaded ? "I build beautiful, responsive and user-friendly web applications with modern technologies."
              .split("")
              .map((char, i) => (
                <span 
                  key={i} 
                  className="inline-block animate-character-reveal"
                  style={{ animationDelay: `${1100 + (i * 15)}ms` }}
                >
                  {char}
                </span>
              )) : ""}
          </p>
          
          {/* Buttons with enhanced hover effects */}
          <div className={`flex justify-center space-x-4 transition-all duration-1000 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`} style={{ transitionDelay: '1400ms' }}>
            <a 
              href="/contact" 
              className={`px-8 py-3 rounded-full font-medium transition-all duration-500 transform hover:scale-105 relative overflow-hidden group
                ${darkMode 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' 
                  : 'bg-gradient-to-r from-blue-700 to-blue-500 text-white'
                }`}
              onMouseEnter={cursorEnter}
              onMouseLeave={cursorLeave}
            >
              <span className="relative z-10">Hire Me</span>
              {/* Shine effect on hover */}
              <span className="absolute top-0 left-0 w-full h-full bg-white transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-20"></span>
              {/* Gradient shift on hover */}
              <span className={`absolute inset-0 w-full h-full ${
                darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-700 to-blue-600'
              } transition-all duration-300 opacity-0 group-hover:opacity-100`}></span>
            </a>
            
            <a 
              href="/projects" 
              className={`px-8 py-3 rounded-full font-medium transition-all duration-500 transform hover:scale-105 relative overflow-hidden group
                ${darkMode 
                  ? 'border-2 border-blue-500 text-blue-400' 
                  : 'border-2 border-blue-600 text-blue-600'
                }`}
              onMouseEnter={cursorEnter}
              onMouseLeave={cursorLeave}
            >
              <span className="relative z-10">My Work</span>
              {/* Background fill effect */}
              <span className={`absolute inset-0 transform origin-left scale-x-0 ${
                darkMode ? 'bg-gradient-to-r from-blue-900/50 to-blue-700/30' : 'bg-gradient-to-r from-blue-100/80 to-blue-300/50'
              } transition-transform duration-500 group-hover:scale-x-100`}></span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll down indicator */}
      <div className={`absolute bottom-10 left-0 right-0 flex justify-center transition-all duration-1000 transform ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`} style={{ transitionDelay: '1700ms' }}>
        <button 
          onClick={scrollToNext} 
          className={`p-3 rounded-full relative ${
            darkMode ? 'text-blue-300 hover:text-blue-400' : 'text-blue-600 hover:text-blue-700'
          } group transition-transform transform hover:translate-y-1`}
          aria-label="Scroll down"
          onMouseEnter={cursorEnter}
          onMouseLeave={cursorLeave}
        >
          {/* Enhanced animated pulse effects */}
          <span className={`absolute inset-0 rounded-full ${
            darkMode ? 'bg-blue-500/10' : 'bg-blue-200/30'
          } scale-0 group-hover:scale-100 transition-transform duration-300`}></span>
          
          <span className="absolute inset-0 rounded-full animate-ripple"></span>
          <span className="absolute inset-0 rounded-full animate-ripple" style={{ animationDelay: '0.5s' }}></span>
          
          <ArrowDown size={28} className="animate-float-bounce" />
        </button>
      </div>
      
      {/* Enhanced CSS for animations */}
      <style jsx>{`
        .perspective-2000 {
          perspective: 2000px;
        }
        
        .transform-gpu {
          transform: translateZ(0);
        }
        
        @keyframes float-perspective-slow {
          0% { transform: translate(0, 0) rotate(0deg) perspective(100px) rotateX(0deg); }
          25% { transform: translate(10px, -10px) rotate(5deg) perspective(100px) rotateX(10deg); }
          50% { transform: translate(20px, -20px) rotate(10deg) perspective(100px) rotateX(0deg); }
          75% { transform: translate(10px, -10px) rotate(5deg) perspective(100px) rotateX(-10deg); }
          100% { transform: translate(0, 0) rotate(0deg) perspective(100px) rotateX(0deg); }
        }
        
        @keyframes float-rotate {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-7px, 7px) rotate(-90deg); }
          50% { transform: translate(-15px, 15px) rotate(-180deg); }
          75% { transform: translate(-7px, 7px) rotate(-270deg); }
          100% { transform: translate(0, 0) rotate(-360deg); }
        }
        
        @keyframes float-scale {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(-12px, -5px) rotate(-7deg) scale(1.1); }
          50% { transform: translate(-25px, -10px) rotate(-15deg) scale(1.2); }
          75% { transform: translate(-12px, -5px) rotate(-7deg) scale(1.1); }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); }
        }
        
        @keyframes float-complex {
          0% { transform: translate(0, 0) rotate(0deg) skew(0deg); }
          33% { transform: translate(15px, -15px) rotate(10deg) skew(5deg); }
          66% { transform: translate(-15px, 15px) rotate(-10deg) skew(-5deg); }
          100% { transform: translate(0, 0) rotate(0deg) skew(0deg); }
        }
        
        @keyframes float-twist {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(10px, 10px) rotate(90deg) scale(0.9); }
          50% { transform: translate(0, 20px) rotate(180deg) scale(1); }
          75% { transform: translate(-10px, 10px) rotate(270deg) scale(0.9); }
          100% { transform: translate(0, 0) rotate(360deg) scale(1); }
        }
        
        @keyframes float-bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes morphing-glow {
          0% { opacity: 0.4; transform: scale(1) translate(-50%, -50%); border-radius: 50%; }
          25% { opacity: 0.6; transform: scale(1.1) translate(-45%, -50%); border-radius: 40% 60% 70% 30%; }
          50% { opacity: 0.4; transform: scale(1.2) translate(-50%, -45%); border-radius: 60% 40% 30% 70%; }
          75% { opacity: 0.6; transform: scale(1.1) translate(-55%, -50%); border-radius: 40% 60% 70% 30%; }
          100% { opacity: 0.4; transform: scale(1) translate(-50%, -50%); border-radius: 50%; }
        }
        
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        
        @keyframes cursor-blink {
          0%, 70% { opacity: 1; }
          71%, 100% { opacity: 0; }
        }
        
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes radiate {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        
        @keyframes character-reveal {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float-perspective-slow {
          animation: float-perspective-slow 18s ease-in-out infinite;
        }
        
        .animate-float-rotate {
          animation: float-rotate 20s ease-in-out infinite;
        }
        
        .animate-float-scale {
          animation: float-scale 15s ease-in-out infinite;
        }
        
        .animate-float-complex {
          animation: float-complex 16s ease-in-out infinite;
        }
        
        .animate-float-twist {
          animation: float-twist 22s ease-in-out infinite;
        }
        
        .animate-float-bounce {
          animation: float-bounce 3s ease-in-out infinite;
        }
        
        .animate-ripple {
          animation: ripple 3s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
        }
        
        .animate-cursor-blink {
          animation: cursor-blink 1.2s step-end infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 100%;
          animation: gradient-x 8s linear infinite;
        }
        
        .animate-radiate {
          animation: radiate 4s ease-in-out infinite;
        }
        
        .animate-character-reveal {
          opacity: 0;
          animation: character-reveal 0.5s cubic-bezier(0.33, 1, 0.68, 1) forwards;
        }
        
        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default Home;