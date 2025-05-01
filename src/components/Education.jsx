import { BookOpen, Calendar, Medal } from 'lucide-react';
import { educationHistory, certifications } from '../constants/education';

const Education = ({ darkMode }) => {
    return (
        <div className={`py-24 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-20">
                    <h2 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        My <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Education</span>
                    </h2>
                    <div className={`w-24 h-1 mx-auto mt-4 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
                    <p className={`mt-6 text-lg sm:text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        The journey that shaped me — from academic roots to certified pro 💼📘
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    <div className={`absolute left-0 md:left-1/2 w-1 h-full -translate-x-1/2 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}></div>

                    <div className="space-y-16">
                        {educationHistory.map((item, index) => (
                            <div key={index} className="relative">
                                <div className={`absolute left-0 md:left-1/2 w-5 h-5 rounded-full border-4 -translate-x-1/2 ${darkMode ? 'bg-gray-900 border-blue-500' : 'bg-white border-blue-600'}`}></div>

                                <div className={`mt-2 md:mt-0 ${index % 2 === 0 ? 'md:pr-[52%] md:text-right' : 'md:pl-[52%] md:text-left'}`}>
                                    <div className={`p-6 rounded-2xl shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <BookOpen size={22} className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                            <h3 className="text-xl font-bold">{item.degree}</h3>
                                        </div>
                                        <h4 className={`text-lg font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-700'} mb-1`}>
                                            {item.institution}
                                        </h4>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Calendar size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                                            <span className="text-sm">{item.period}</span>
                                        </div>
                                        <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
                                        <div className="space-y-2">
                                            {item.achievements.map((ach, i) => (
                                                <div key={i} className="flex items-start gap-2">
                                                    <Medal size={16} className={darkMode ? 'text-yellow-400' : 'text-yellow-600'} />
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

                {/* Certifications */}
                <div className="mt-24">
                    <h3 className={`text-3xl font-bold text-center mb-10 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Professional <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Certifications</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {certifications.map((cert, index) => (
                            <div
                                key={index}
                                className={`relative group p-6 rounded-2xl shadow-xl transition-transform hover:-translate-y-1.5 hover:shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                            >
                                <div className={`p-4 rounded-full inline-block mb-4 transition-colors duration-300 ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'} group-hover:scale-110`}>
                                {cert.icon && <cert.icon size={24} />}
                                </div>
                                <h4 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        {cert.title}
                                    </a>
                                </h4>
                                <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {cert.issuer}
                                </p>
                                <div className="flex items-center text-sm">
                                    <Calendar size={16} className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{cert.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Education;