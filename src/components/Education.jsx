import { BookOpen, Calendar, Medal } from 'lucide-react';
import { educationHistory, certifications } from '../constants/education';
import { useState, useEffect } from 'react';

const Education = ({ darkMode }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [visibleItems, setVisibleItems] = useState([]);

    // Animation for section entrance
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const section = document.getElementById('education-section');
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    // Staggered animation for timeline items
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                const newVisibleItems = [];
                
                educationHistory.forEach((_, index) => {
                    setTimeout(() => {
                        setVisibleItems(prev => [...prev, index]);
                    }, index * 300); // Stagger each item by 300ms
                    
                    newVisibleItems.push(index);
                });
            }, 300);
            
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    return (
        <div 
            id="education-section"
            className={`py-24 px-4 transition-colors duration-500 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
        >
            <div className="max-w-7xl mx-auto">
                {/* Heading with animation */}
                <div 
                    className={`text-center mb-20 transition-all duration-1000 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <h2 className={`text-4xl sm:text-5xl font-extrabold tracking-tight transition-colors duration-500 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        My <span className={`transition-colors duration-500 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Education</span>
                    </h2>
                    <div className={`w-24 h-1 mx-auto mt-4 rounded-full transition-all duration-500 ${
                        isVisible ? 'w-24' : 'w-0'
                    } ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
                  
                </div>

                {/* Timeline with staggered animations */}
                <div className="relative">
                    <div className={`absolute left-0 md:left-1/2 w-1 transition-all duration-1500 ease-out ${
                        isVisible ? 'h-full' : 'h-0'
                    } -translate-x-1/2 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}></div>

                    <div className="space-y-16">
                        {educationHistory.map((item, index) => (
                            <div 
                                key={index} 
                                className={`relative transition-all duration-700 transform ${
                                    visibleItems.includes(index) 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-20'
                                }`}
                            >
                                <div className={`absolute left-0 md:left-1/2 w-5 h-5 rounded-full border-4 -translate-x-1/2 transition-all duration-500 ${
                                    visibleItems.includes(index) ? 'scale-100' : 'scale-0'
                                } ${darkMode ? 'bg-gray-900 border-blue-500' : 'bg-white border-blue-600'}`}></div>

                                <div className={`mt-2 md:mt-0 ${index % 2 === 0 ? 'md:pr-[52%] md:text-right' : 'md:pl-[52%] md:text-left'}`}>
                                    <div 
                                        className={`p-6 rounded-2xl shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl ${
                                            darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <BookOpen size={22} className={`transition-colors duration-500 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                            <h3 className="text-xl font-bold">{item.degree}</h3>
                                        </div>
                                        <h4 className={`text-lg font-semibold transition-colors duration-500 ${darkMode ? 'text-blue-300' : 'text-blue-700'} mb-1`}>
                                            {item.institution}
                                        </h4>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Calendar size={16} className={`transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                            <span className="text-sm">{item.period}</span>
                                        </div>
                                        <p className={`text-sm mb-3 transition-colors duration-500 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
                                        <div className="space-y-2">
                                            {item.achievements.map((ach, i) => (
                                                <div 
                                                    key={i} 
                                                    className="flex items-start gap-2 transition-all duration-300"
                                                    style={{ transitionDelay: `${i * 100}ms` }}
                                                >
                                                    <Medal size={16} className={`transition-colors duration-500 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                                                    <span className="text-sm">{ach}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Certifications with animations */}
                <div 
                    className={`mt-24 transition-all duration-1000 transform ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                    }`}
                    style={{ transitionDelay: '500ms' }}
                >
                    <h3 className={`text-3xl font-bold text-center mb-10 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Professional <span className={`transition-colors duration-500 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Certifications</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {certifications.map((cert, index) => (
                            <div
                                key={index}
                                className={`relative group p-6 rounded-2xl shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                                    darkMode ? 'bg-gray-800' : 'bg-white'
                                }`}
                                style={{ 
                                    transitionDelay: `${index * 100}ms`,
                                    animation: isVisible ? `fadeSlideUp 600ms ${index * 150}ms forwards` : 'none',
                                    opacity: 0,
                                    transform: 'translateY(20px)'
                                }}
                            >
                                <div 
                                    className={`p-4 rounded-full inline-block mb-4 transition-all duration-500 ${
                                        darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'
                                    } group-hover:scale-110 group-hover:rotate-3`}
                                >
                                    {cert.icon && <cert.icon size={24} />}
                                </div>
                                <h4 className={`text-lg font-bold mb-1 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    <a 
                                        href={cert.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="hover:underline transition-all duration-300 ease-out"
                                    >
                                        {cert.title}
                                    </a>
                                </h4>
                                <p className={`text-sm mb-2 transition-colors duration-500 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {cert.issuer}
                                </p>
                                <div className="flex items-center text-sm">
                                    <Calendar size={16} className={`mr-2 transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <span className={`transition-colors duration-500 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{cert.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* CSS Animation Keyframes */}
            <style jsx>{`
                @keyframes fadeSlideUp {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default Education;