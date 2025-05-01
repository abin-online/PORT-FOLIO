import { useState, useEffect } from 'react';
import { technicalSkills, tools } from '../constants/skills';

const Skills = ({ darkMode }) => {
    const [activeTab, setActiveTab] = useState('technical');
    // State for mouse position to create 3D tilt effect
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Pentagon SVG path generator
    const createPentagonPath = (size) => {
        const radius = size / 2;
        const points = [];
        for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2; // Start from the top
            const x = radius + radius * Math.cos(angle);
            const y = radius + radius * Math.sin(angle);
            points.push(`${x},${y}`);
        }
        return `M${points.join(' L')} Z`;
    };

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

    return (
        <div className={`py-20 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-white via-blue-50 to-white'} backdrop-blur-md`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        My <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Skills</span>
                    </h2>
                    <div className={`w-24 h-1 mx-auto rounded ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
                    <p className={`mt-6 max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        A comprehensive overview of my technical capabilities and tools I work with.
                    </p>
                </div>

                {/* Skills Tabs */}
                <div className="flex justify-center mb-12">
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
                <div className={`grid gap-6  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6  animate-fade-in`}>
                    {(activeTab === 'technical' ? technicalSkills : tools).map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center rounded-xl bg-white/10 backdrop-blur-md p-4 border border-white/20 shadow-xl transform transition-transform duration-500 hover:rotate-x-6 hover:rotate-y-3 hover:scale-105"
                            style={{
                                transformStyle: 'preserve-3d',
                                perspective: '1000px',
                                backfaceVisibility: 'hidden',
                            }}
                        >
                            <div className="relative w-32 h-32">
                                <svg
                                    width="128"
                                    height="128"
                                    viewBox="0 0 128 128"
                                    className="filter drop-shadow-lg transition-all duration-300"
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
        </div>
    );
}

export default Skills