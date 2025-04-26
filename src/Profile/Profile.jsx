import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaFacebookF } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center">
        <div className="relative h-36 w-36 rounded-full bg-blue-900 p-1 mb-6">
          <img
            src="https://media.licdn.com/dms/image/v2/D4D03AQFUOSUXiP_hbA/profile-displayphoto-shrink_800_800/B4DZUXoKXzG8Ac-/0/1739858160105?e=1750896000&v=beta&t=cCzEoFFz5JRU0dnh8bIX3dLAInP5iCujAmQXtyS72mI"
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
            href="https://github.com/abin-online/"
            className="bg-black text-white p-2 rounded-full hover:scale-110 transition-transform"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.instagram.com/abin__babu/"
            className="bg-pink-500 text-white p-2 rounded-full hover:scale-110 transition-transform"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/abin-babu-08a02b2b1/"
            className="bg-blue-800 text-white p-2 rounded-full hover:scale-110 transition-transform"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://www.facebook.com/abin.abin.7359447"
            className="bg-blue-400 text-white p-2 rounded-full hover:scale-110 transition-transform"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF size={20} />
          </a>
        </div>

        <a
          href="https://wa.me/919061625083"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-900 text-white px-6 py-2 rounded-full text-sm hover:shadow-lg transition-shadow"
        >
          Connect Me
        </a>
      </div>
    </div>
  );
};

export default Profile;
