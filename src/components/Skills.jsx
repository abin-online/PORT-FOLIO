import { useState, useEffect, useRef } from 'react';
import { technicalSkills, tools } from '../constants/skills';
import { createPentagonPath } from '../helpers/polygon';
import { getAnimationDirection, getAnimationDelay } from '../helpers/animation';
const Skills = ({ darkMode }) => {
    const [activeTab, setActiveTab] = useState('technical');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const skillsContainerRef = useRef(null);
    

    // Use effect for 3D perspective hover
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Use effect for intersection observer to trigger animations when scrolled into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (skillsContainerRef.current) {
            observer.observe(skillsContainerRef.current);
        }

        return () => {
            if (skillsContainerRef.current) {
                observer.unobserve(skillsContainerRef.current);
            }
        };
    }, [activeTab]);



    return (
        <div className={`py-20 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-white via-blue-50 to-white'} backdrop-blur-md`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 
                        className={`text-3xl md:text-4xl font-bold mb-4 ${
                            darkMode ? 'text-white' : 'text-gray-900'
                        } transform transition-all duration-700 ${
                            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
                        }`}
                    >
                        My <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Skills</span>
                    </h2>
                    <div 
                        className={`w-24 h-1 mx-auto rounded transition-all duration-700 delay-300 transform ${
                            isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                        } ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}
                    ></div>
                    <p 
                        className={`mt-6 max-w-2xl mx-auto text-lg transition-all duration-700 delay-500 transform ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        } ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                        A comprehensive overview of my technical capabilities and tools I work with.
                    </p>
                </div>

                {/* Skills Tabs */}
                <div 
                    className={`flex justify-center mb-12 transition-all duration-700 delay-700 transform ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                >
                    <div className={`inline-flex rounded-lg p-1 ${darkMode ? 'bg-gray-800 bg-opacity-50' : 'bg-gray-200 bg-opacity-70'} shadow-lg`}>
                        <button
                            onClick={() => setActiveTab('technical')}
                            className={`px-4 py-2 rounded-lg transition-all font-medium duration-300 ${activeTab === 'technical'
                                    ? (darkMode ? 'bg-blue-600 text-white shadow-md shadow-blue-500/50' : 'bg-blue-600 text-white shadow-md shadow-blue-300/50')
                                    : (darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-300')
                                }`}
                        >
                            Technical Skills
                        </button>
                        <button
                            onClick={() => setActiveTab('tools')}
                            className={`px-4 py-2 rounded-lg transition-all font-medium duration-300 ${activeTab === 'tools'
                                    ? (darkMode ? 'bg-blue-600 text-white shadow-md shadow-blue-500/50' : 'bg-blue-600 text-white shadow-md shadow-blue-300/50')
                                    : (darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-300')
                                }`}
                        >
                            Tools & Software
                        </button>
                    </div>
                </div>

                {/* Skills Grid */}
                <div 
                    ref={skillsContainerRef}
                    className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
                >
                    {(activeTab === 'technical' ? technicalSkills : tools).map((item, index) => (
                        <div
                            key={`${item.name}-${index}`}
                            className={`
                                flex flex-col items-center justify-center 
                                rounded-xl bg-white/10 backdrop-blur-md p-4 
                                border border-white/20 shadow-xl 
                                transform transition-all duration-700 ease-out
                                hover:rotate-x-6 hover:rotate-y-3 hover:scale-105
                                ${isVisible ? 'translate-x-0 translate-y-0 opacity-100' : getAnimationDirection(index)}
                            `}
                            style={{
                                transformStyle: 'preserve-3d',
                                perspective: '1000px',
                                backfaceVisibility: 'hidden',
                                transitionDelay: getAnimationDelay(index),
                            }}
                        >
                            <div className="relative w-32 h-32">
                                <svg
                                    width="128"
                                    height="128"
                                    viewBox="0 0 128 128"
                                    className="filter drop-shadow-lg transition-all duration-500"
                                    style={{
                                        transform: `translateZ(20px)`,
                                    }}
                                >
                                    <defs>
                                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor={`${item.color || '#3B82F6'}50`} />
                                            <stop offset="100%" stopColor={`${item.color || '#3B82F6'}25`} />
                                        </linearGradient>
                                        <filter id="glow">
                                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                                            <feMerge>
                                                <feMergeNode in="coloredBlur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>
                                    <path
                                        d={createPentagonPath(128)}
                                        fill={`url(#gradient-${index})`}
                                        stroke={item.color || '#3B82F6'}
                                        strokeWidth="2"
                                        filter="url(#glow)"
                                        className="transition-all duration-700"
                                        style={{
                                            transformOrigin: 'center',
                                            animation: isVisible ? 'spin 20s linear infinite' : 'none',
                                        }}
                                    />
                                </svg>
                                <div
                                    className="absolute inset-0 flex items-center justify-center"
                                    style={{
                                        transform: `translateZ(30px)`,
                                    }}
                                >
                                    <img
                                        src={item.icon}
                                        alt={item.name}
                                        className="w-16 h-16 hover:animate-pulse duration-300 transform hover:scale-110 hover:rotate-12 transition-all"
                                        style={{
                                            filter: darkMode ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))' : 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.3))'
                                        }}
                                    />
                                </div>
                            </div>
                            <h3
                                className={`text-center mt-4 font-medium ${darkMode ? 'text-white' : 'text-gray-900'} text-shadow`}
                                style={{
                                    textShadow: darkMode ? '0 0 10px rgba(255,255,255,0.3)' : '0 0 10px rgba(0,0,0,0.1)',
                                    transform: `translateZ(10px)`,
                                }}
                            >
                                {item.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Add global keyframes for animations */}
            <style jsx global>{`
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
}

export default Skills;