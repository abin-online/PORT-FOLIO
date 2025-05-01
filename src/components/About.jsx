'use client';
import { Code, Globe, Coffee, Heart, Clapperboard, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

const About = ({ darkMode }) => {
    const bg = darkMode ? 'bg-gray-900' : 'bg-white';
    const text = darkMode ? 'text-white' : 'text-gray-900';
    const subText = darkMode ? 'text-gray-300' : 'text-gray-700';
    const highlight = darkMode ? 'text-blue-400' : 'text-blue-600';
    const cardBg = darkMode ? 'bg-gray-800' : 'bg-gray-100';
    const borderColor = darkMode ? 'border-blue-500' : 'border-blue-600';
    const iconBg = darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600';

    return (
        <div id="about-section" className={`py-20 ${bg}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={`text-4xl font-bold mb-4 ${text}`}>
                        About <span className={highlight}>Me</span>
                    </h2>
                    <div className={`w-24 h-1 mx-auto rounded ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Profile Image */}
                    <motion.div
                        className="lg:w-1/3 mb-8 lg:mb-0"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={`rounded-xl overflow-hidden border-2 ${borderColor} shadow-xl transform hover:scale-105 transition-all`}>
                            <img
                                src="https://media.licdn.com/dms/image/v2/D4D03AQFUOSUXiP_hbA/profile-displayphoto-shrink_800_800/B4DZUXoKXzG8Ac-/0/1739858160105?e=1751500800&v=beta&t=iXRKbGPkP39jh0MtDVKwOlM1pdWZsUDjJ0SYO5CX6mA"
                                alt="Abin Babu"
                                className="object-cover w-full h-full "
                            />
                        </div>http://localhost:5173/contact
                    </motion.div>

                    {/* About Content */}
                    <motion.div
                        className="lg:w-2/3"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className={`text-2xl font-semibold mb-4 ${highlight}`}>Full Stack Developer</h3>
                        <p className={`mb-6 leading-relaxed ${subText}`}>
                            I'm a self-taught Full Stack Developer with a solid foundation in the MERN stack and a deep passion for solving real-world problems through clean, scalable code. I thrive in collaborative environments, value transparent communication, and enjoy turning complex challenges into intuitive, user-friendly solutions. Constantly exploring new technologies, I’m driven by the excitement of building impactful applications that truly make a difference.
                        </p>

                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {[
                                { label: 'Name', value: 'Abin Babu' },
                                { label: 'Email', value: 'abinbabuonline@gmail.com' },
                                { label: 'Location', value: 'Chennai, India' },
                                { label: 'Availability', value: 'Freelance & Full-time' },
                            ].map((info, idx) => (
                                <div key={idx} className={`p-4 rounded-xl ${cardBg} shadow-md`}>
                                    <p className={`font-medium ${text}`}>{info.label}:</p>
                                    <p className={subText}>{info.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Interests */}
                        <div className="flex flex-wrap gap-6">
                            {[
                                { icon: <Code size={20} />, label: 'Coding' },
                                { icon: <Globe size={20} />, label: 'Traveling' },
                                { icon: <Clapperboard size={20} />, label: 'Films' },
                                { icon: <Camera size={20} />, label: 'Photography' },
                                { icon: <Heart size={20} />, label: 'Fitness' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center hover:scale-105 transition-transform">
                                    <div className={`p-3 rounded-full mr-3 ${iconBg}`}>
                                        {item.icon}
                                    </div>
                                    <span className={subText}>{item.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="mt-8">
                            <a
                                href="ABIN_BABU.pdf"
                                className={`inline-flex items-center px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow 
                                    ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                            >
                                Let's Talk
                            </a>
                            <a
                                href="/assets/ABIN_BABU.pdf"
                                download
                                className={`inline-flex ml-4 items-center px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 border-2 shadow 
                                    ${darkMode
                                        ? 'border-blue-500 text-blue-400 hover:bg-blue-900 hover:bg-opacity-30'
                                        : 'border-blue-600 text-blue-600 hover:bg-blue-50'}`}
                            >
                                Download CV
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
