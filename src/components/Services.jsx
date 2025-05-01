import {
    Code,
    Database,
    ShieldCheck,
    Server,
    CloudUpload,
  } from 'lucide-react';
  
  const Services = ({ darkMode }) => {
    const services = [
      {
        icon: <Code size={40} />,
        title: 'Frontend Development',
        description:
          'Crafting dynamic, responsive UIs using React and Next.js with a focus on performance, accessibility, and modern best practices.',
      },
      {
        icon: <Database size={40} />,
        title: 'Database Design',
        description:
          'Designing scalable and efficient schemas using both SQL and NoSQL databases for robust data management.',
      },
      {
        icon: <ShieldCheck size={40} />,
        title: 'Security Solutions',
        description:
          'Implementing secure authentication, authorization, and data protection practices in web apps.',
      },
      {
        icon: <Server size={40} />,
        title: 'Backend Development',
        description:
          'Building scalable RESTful APIs using Node.js and Express with modular and maintainable architecture.',
      },
      {
        icon: <CloudUpload size={40} />,
        title: 'Deployment & DevOps',
        description:
          'Deploying scalable apps to GCP and AWS using Docker, Kubernetes, and CI/CD pipelines for smooth delivery.',
      },
    ];
  
    return (
      <div
        className={`py-20 transition-colors duration-300 ${
          darkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              My{' '}
              <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>
                Services
              </span>
            </h2>
            <div
              className={`w-24 h-1 mx-auto rounded-full ${
                darkMode ? 'bg-blue-500' : 'bg-blue-600'
              }`}
            ></div>
            <p
              className={`mt-6 max-w-2xl mx-auto text-lg ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              I offer a wide range of services to help your business grow and
              succeed in the digital world.
            </p>
          </div>
  
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group p-6 rounded-2xl transform transition-all duration-500 hover:-translate-y-2 
                  hover:shadow-2xl hover:scale-105 border ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700 hover:bg-gray-750 shadow-black'
                      : 'bg-white border-gray-200 hover:bg-gray-100 shadow-gray-300'
                  }`}
                style={{ animation: `fadeIn 0.6s ease ${index * 0.1}s both` }}
              >
                <div
                  className={`mb-5 inline-block rounded-full p-3 transition duration-300 ${
                    darkMode
                      ? 'bg-blue-600 text-white group-hover:bg-blue-500'
                      : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                  }`}
                >
                  {service.icon}
                </div>
                <h3
                  className={`text-xl font-bold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {service.title}
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
  
          <div className="mt-20 text-center">
            <h3
              className={`text-2xl font-semibold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Need a custom service?
            </h3>
            <a
              href="/contact"
              className={`inline-flex items-center px-6 py-3 rounded-full font-semibold shadow-md transition-all transform hover:scale-105 
                ${
                  darkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default Services;
  