import { useState, useEffect } from 'react';
import { socialLinks, contactInfo } from '../constants/contact';
import emailjs from 'emailjs-com';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFocus, setActiveFocus] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  
  // Intersection observer for section entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('contact-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error when typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      setSubmitStatus({
        success: false,
        message: 'Please check all fields before submitting.',
      });
      return;
    }
    
    setIsSubmitting(true);
  
    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };
  
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
  
      if (response.status === 200) {
        setSubmitStatus({
          success: true,
          message: 'Your message has been sent! I will get back to you soon.',
        });
  
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
  
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        throw new Error('Something went wrong with the email submission.');
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Something went wrong. Please try again later.',
      });
      console.error('Email submission error:', error);  // For debugging
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFocus = (field) => {
    setActiveFocus(field);
  };

  const handleBlur = () => {
    setActiveFocus(null);
  };
  
  return (
    <div 
      id="contact-section"
      className={`py-24 px-4 transition-colors duration-500 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="container mx-auto sm:px-6 lg:px-8">
        {/* Heading with animation */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Get In <span className={`transition-colors duration-500 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Touch</span>
          </h2>
          <div className={`w-24 h-1 mx-auto rounded transition-all duration-500 ${
            isVisible ? 'w-24' : 'w-0'
          } ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
          <p className={`mt-6 max-w-2xl mx-auto text-lg transition-colors duration-500 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Have a project in mind or want to collaborate? Feel free to reach out to me through any of these channels.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div 
            className={`lg:col-span-2 space-y-8 transition-all duration-700 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className={`p-6 rounded-lg transition-all duration-500 shadow-md hover:shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <h3 className={`text-xl font-bold mb-6 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start group"
                    style={{ 
                      transitionDelay: `${index * 100}ms`,
                      animation: isVisible ? `fadeSlideUp 600ms ${index * 150}ms forwards` : 'none',
                      opacity: 0,
                      transform: 'translateY(20px)'
                    }}
                  >
                    <div className={`p-3 rounded-lg transition-all duration-300 group-hover:scale-110 ${darkMode ? 'bg-gray-700 group-hover:bg-blue-900' : 'bg-gray-200 group-hover:bg-blue-100'} mr-4`}>
                      <svg 
                        className={`w-5 h-5 transition-colors duration-300 ${darkMode ? 'text-blue-400 group-hover:text-blue-300' : 'text-blue-600 group-hover:text-blue-700'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <div className="transition-transform duration-300 group-hover:translate-x-1">
                      <h4 className={`text-sm font-medium transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.title}
                      </h4>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          className={`text-base font-medium transition-all duration-300 ${darkMode ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'}`}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className={`text-base font-medium transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div 
                className="mt-10 transition-all duration-700"
                style={{ 
                  transitionDelay: '400ms',
                  animation: isVisible ? 'fadeIn 800ms 400ms forwards' : 'none',
                  opacity: 0
                }}
              >
                <h3 className={`text-lg font-bold mb-4 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Connect With Me
                </h3>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index}
                      href={social.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                        darkMode ? 'bg-gray-700 hover:bg-blue-600' : 'bg-gray-200 hover:bg-blue-600'
                      }`}
                      style={{
                        transitionDelay: `${index * 100}ms`,
                        animation: isVisible ? `fadeSlideUp 600ms ${index * 100 + 500}ms forwards` : 'none',
                        opacity: 0,
                        transform: 'translateY(20px)'
                      }}
                    >
                      <svg 
                        className={`w-5 h-5 transition-colors duration-300 ${
                          darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-white'
                        }`}
                        fill="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div 
            className={`lg:col-span-3 transition-all duration-700 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className={`p-8 rounded-lg shadow-lg transition-all duration-500 hover:shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-xl font-bold mb-6 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Send Me a Message
              </h3>
              
              {submitStatus && (
                <div 
                  className={`p-4 mb-6 rounded-lg flex items-center transition-all duration-500 ${
                    submitStatus.success 
                      ? (darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800') 
                      : (darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800')
                  }`}
                  style={{ animation: 'fadeSlideDown 500ms forwards' }}
                >
                  {submitStatus.success ? 
                    <CheckCircle size={20} className="mr-2 flex-shrink-0" /> : 
                    <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                  }
                  <span>{submitStatus.message}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="relative">
                    <label 
                      htmlFor="name" 
                      className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      } ${activeFocus === 'name' ? (darkMode ? 'text-blue-400' : 'text-blue-600') : ''}`}
                    >
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } ${activeFocus === 'name' ? 'ring-2 ring-blue-500/50 border-blue-500' : ''}
                        ${fieldErrors.name ? (darkMode ? 'border-red-500 ring-2 ring-red-500/30' : 'border-red-500 ring-2 ring-red-500/30') : ''}`}
                        placeholder="John Doe"
                      />
                      {fieldErrors.name && (
                        <p className="absolute -bottom-5 left-0 text-xs text-red-500 transition-all duration-300">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label 
                      htmlFor="email" 
                      className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      } ${activeFocus === 'email' ? (darkMode ? 'text-blue-400' : 'text-blue-600') : ''}`}
                    >
                      Your Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } ${activeFocus === 'email' ? 'ring-2 ring-blue-500/50 border-blue-500' : ''}
                        ${fieldErrors.email ? (darkMode ? 'border-red-500 ring-2 ring-red-500/30' : 'border-red-500 ring-2 ring-red-500/30') : ''}`}
                        placeholder="john@example.com"
                      />
                      {fieldErrors.email && (
                        <p className="absolute -bottom-5 left-0 text-xs text-red-500 transition-all duration-300">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Subject Field */}
                <div className="relative">
                  <label 
                    htmlFor="subject" 
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    } ${activeFocus === 'subject' ? (darkMode ? 'text-blue-400' : 'text-blue-600') : ''}`}
                  >
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => handleFocus('subject')}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } ${activeFocus === 'subject' ? 'ring-2 ring-blue-500/50 border-blue-500' : ''}
                      ${fieldErrors.subject ? (darkMode ? 'border-red-500 ring-2 ring-red-500/30' : 'border-red-500 ring-2 ring-red-500/30') : ''}`}
                      placeholder="Project Inquiry"
                    />
                    {fieldErrors.subject && (
                      <p className="absolute -bottom-5 left-0 text-xs text-red-500 transition-all duration-300">
                        {fieldErrors.subject}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Message Field */}
                <div className="relative">
                  <label 
                    htmlFor="message" 
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    } ${activeFocus === 'message' ? (darkMode ? 'text-blue-400' : 'text-blue-600') : ''}`}
                  >
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      required
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } ${activeFocus === 'message' ? 'ring-2 ring-blue-500/50 border-blue-500' : ''}
                      ${fieldErrors.message ? (darkMode ? 'border-red-500 ring-2 ring-red-500/30' : 'border-red-500 ring-2 ring-red-500/30') : ''}`}
                      placeholder="Hi, I'd like to talk about..."
                    ></textarea>
                    {fieldErrors.message && (
                      <p className="absolute -bottom-5 left-0 text-xs text-red-500 transition-all duration-300">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1 ${
                    darkMode 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-900/20' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20'
                  } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg active:scale-98'}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
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
        
        @keyframes fadeSlideDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        .active\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
};

export default Contact;