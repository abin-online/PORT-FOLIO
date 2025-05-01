import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';


const Projects = ({ darkMode }) => {
  const [filter, setFilter] = useState('all');
  
  const projects = [
    {
        id: 1,
        title: 'Atomica – Collaborative Coding Application',
        category: 'main',
        image: 'atomica.png',
        description: 'A beginner-friendly full-stack platform for collaborative coding, problem-solving, real-time quizzes, and coding contests. Built for developers to learn, grow, and code together.',
        technologies: ['Microservices','Next.js', 'Node.js', 'Socket.io', 'Kafka', 'MongoDB', 'Docker', 'Kubernetes', 'Redux', 'TypeScript'],
        liveLink: 'https://atomica.live/',
        codeLink: 'https://github.com/abin-online/Atomica-Microservice-Application'
      },      
      {
        id: 2,
        title: 'Cakekart – E-Commerce Application',
        category: 'main',
        image: 'cakekart.png',
        description: 'A full-featured e-commerce platform with dedicated admin and user dashboards, offering seamless product management, secure payments, dynamic discounts, and a smooth shopping experience.',
        technologies: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'Handlebars', 'Razorpay', 'AWS EC2', 'PM2'],
        liveLink: 'https://cakekart.shop/',
        codeLink: 'https://github.com/abin-online/Cake-Shop-E-Commerce'
      },
      {
        id: 3,
        title: 'URL Shortener',
        category: 'mini',
        image: 'url-shortener.png',
        description: 'A full-stack web application that allows users to shorten URLs, track usage, and manage links with secure authentication and user-specific access.',
        technologies: ['React.js', 'TypeScript', 'Nest.js', 'MongoDB', 'TinyURL API', 'Render'],
        liveLink: 'https://url-shortener-client-c9if.onrender.com/',
        codeLink: 'https://github.com/abin-online/URL-SHORTENER'
      },
      {
        id: 4,
        title: 'PDF Extractor',
        category: 'mini',
        image: 'pdf-extractor.png',
        description: 'A web-based tool for uploading, viewing, rearranging, and extracting content from PDF files with a smooth drag-and-drop interface.',
        technologies: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'PDF-lib', 'Render'],
        liveLink: 'https://pdf-extractor-frontend.onrender.com/',
        codeLink: 'https://github.com/abin-online/PDF-Extractor'
      }
      ,
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  // return (
  //   <div className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
  //     <div className="container mx-auto px-4 sm:px-6 lg:px-8">
  //       <div className="text-center mb-16">
  //         <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
  //           My <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Projects</span>
  //         </h2>
  //         <div className={`w-24 h-1 mx-auto rounded ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
  //         <p className={`mt-6 max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
  //           Check out some of my recent work that showcases my skills and expertise.
  //         </p>
  //       </div>
        
  //       {/* Filter Buttons */}
  //       <div className="flex flex-wrap justify-center mb-10 gap-2">
  //         <button
  //           onClick={() => setFilter('all')}
  //           className={`px-6 py-2 rounded-full transition-all 
  //             ${filter === 'all' 
  //               ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white') 
  //               : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
  //             }`}
  //         >
  //           All
  //         </button>
  //         <button
  //           onClick={() => setFilter('main')}
  //           className={`px-6 py-2 rounded-full transition-all 
  //             ${filter === 'main' 
  //               ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white') 
  //               : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
  //             }`}
  //         >
  //           Main
  //         </button>
  //         <button
  //           onClick={() => setFilter('mini')}
  //           className={`px-6 py-2 rounded-full transition-all 
  //             ${filter === 'mini' 
  //               ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white') 
  //               : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
  //             }`}
  //         >
  //           Mini
  //         </button>
  //       </div>
        
  //       {/* Projects Grid */}
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  //         {filteredProjects.map((project) => (
  //           <div 
  //             key={project.id} 
  //             className={`rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl 
  //               ${darkMode ? 'bg-gray-800 shadow-gray-900' : 'bg-white shadow-md'}`}
  //           >
  //             <div className="relative overflow-hidden">
  //               <img 
  //                 src={project.image} 
  //                 alt={project.title} 
  //                 className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
  //               />
  //               <div className={`absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ${darkMode ? 'bg-gray-900 bg-opacity-80' : 'bg-gray-800 bg-opacity-70'}`}>
  //                 <div className="flex space-x-4">
  //                   <a 
  //                     href={project.liveLink} 
  //                     target="_blank" 
  //                     rel="noopener noreferrer"
  //                     className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
  //                   >
  //                     <ExternalLink size={20} />
  //                   </a>
  //                   <a 
  //                     href={project.codeLink} 
  //                     target="_blank" 
  //                     rel="noopener noreferrer"
  //                     className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
  //                   >
  //                     <Github size={20} />
  //                   </a>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="p-6">
  //               <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
  //                 {project.title}
  //               </h3>
  //               <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
  //                 {project.description}
  //               </p>
  //               <div className="flex flex-wrap gap-2">
  //                 {project.technologies.map((tech, index) => (
  //                   <span 
  //                     key={index}
  //                     className={`text-xs px-3 py-1 rounded-full ${
  //                       darkMode 
  //                         ? 'bg-gray-700 text-blue-300' 
  //                         : 'bg-blue-100 text-blue-800'
  //                     }`}
  //                   >
  //                     {tech}
  //                   </span>
  //                 ))}
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
        
  //       {/* Show more button or pagination could be added here */}
  //       <div className="mt-12 text-center">
  //         <a 
  //           href="https://github.com/abin-online" 
  //           target="_blank" 
  //           rel="noopener noreferrer"
  //           className={`inline-flex items-center px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 
  //             ${darkMode 
  //               ? 'bg-blue-600 hover:bg-blue-700 text-white' 
  //               : 'bg-blue-600 hover:bg-blue-700 text-white'
  //             }`}
  //         >
  //           <Github size={18} className="mr-2" />
  //           View More on GitHub
  //         </a>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            My <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Projects</span>
          </h2>
          <div className={`w-24 h-1 mx-auto rounded ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
          <p className={`mt-6 max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Check out some of my recent work that showcases my skills and expertise.
          </p>
        </div>
  
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center mb-10 gap-3">
          {['all', 'main', 'mini'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-full font-medium transition-all 
                ${filter === type
                ? 'bg-blue-600 text-white shadow-md'
                : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
  
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl 
                ${darkMode ? 'bg-gray-800 shadow-gray-900' : 'bg-white shadow-md'}`}
              style={{ animation: `fadeIn 0.6s ease ${index * 0.1}s both` }}  // Fade-in animation
            >
              <div className="relative overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                    ${darkMode ? 'bg-gray-900 bg-opacity-80' : 'bg-gray-800 bg-opacity-70'}`}
                >
                  <div className="flex space-x-4">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Live Demo"
                      className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-tooltip-id="tooltip"
                      data-tooltip-content="Source Code"
                      className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {project.title}
                </h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Show More Button */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/abin-online"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 
              ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            <Github size={18} className="mr-2" />
            View More on GitHub
          </a>
        </div>
  
        {/* Tooltip Component */}
        <Tooltip id="tooltip" />
      </div>
    </div>
  );
  
  
};

export default Projects;