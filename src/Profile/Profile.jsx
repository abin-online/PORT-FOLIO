import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaFacebookF, FaTools, FaHardHat } from "react-icons/fa";
import { PROFILE_URL, GITHUB, INSTAGRAM, FACEBOOK, LINKEDIN } from "../constants/constant";
const PortfolioUnderConstruction = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-200 relative overflow-hidden">
      {/* Construction Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-yellow-500 opacity-20">
          <FaTools size={80} />
        </div>
        <div className="absolute bottom-20 right-10 text-yellow-500 opacity-20">
          <FaHardHat size={100} />
        </div>
        <div className="absolute top-1/4 right-1/4 text-yellow-500 opacity-10">
          <FaTools size={120} />
        </div>
        <div className="absolute bottom-1/3 left-1/3 text-yellow-500 opacity-10">
          <FaHardHat size={150} />
        </div>
        
        {/* Diagonal Stripes */}
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `linear-gradient(45deg, rgba(250, 204, 21, 0.05) 25%, transparent 25%, transparent 50%, rgba(250, 204, 21, 0.05) 50%, rgba(250, 204, 21, 0.05) 75%, transparent 75%, transparent)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-4xl px-4 py-8 flex flex-col items-center">
        {/* Construction Banner */}
        <div className="mb-8 py-3 px-6 bg-yellow-400 rounded-lg shadow-lg transform -rotate-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wider">PORTFOLIO UNDER CONSTRUCTION</h2>
        </div>
        
        {/* Profile Card */}
        <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center backdrop-blur-sm bg-opacity-90">
          <div className="relative h-36 w-36 rounded-full bg-blue-900 p-1 mb-6">
            <img
              src={PROFILE_URL}
              alt="Abin Babu"
              className="h-full w-full object-cover rounded-full border-4 border-white"
            />
          </div>
          <div className="text-center mb-4">
            <h1 className="text-xl font-semibold text-gray-800">ABIN BABU</h1>
            <p className="text-sm text-gray-600">Software Developer</p>
          </div>

          <div className="flex gap-4 mb-5">
            <a
              href={GITHUB}
              className="bg-black text-white p-2 rounded-full hover:scale-110 transition-transform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={20} />
            </a>
            <a
              href={INSTAGRAM}
              className="bg-pink-500 text-white p-2 rounded-full hover:scale-110 transition-transform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href={LINKEDIN}
              className="bg-blue-800 text-white p-2 rounded-full hover:scale-110 transition-transform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href={FACEBOOK}
              className="bg-blue-400 text-white p-2 rounded-full hover:scale-110 transition-transform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF size={20} />
            </a>
          </div>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-900 text-white px-6 py-2 rounded-full text-sm hover:shadow-lg transition-shadow"
          >
            Connect Me
          </a>
        </div>
        
        {/* Coming Soon Message */}
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-700 mb-2">My portfolio website is currently under development.</p>
          <p className="text-gray-600">Check back soon to see my latest projects and skills!</p>
          <div className="mt-4 flex justify-center items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-150"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioUnderConstruction;