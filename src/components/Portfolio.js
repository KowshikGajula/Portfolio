import React from "react";
import { FaGithub, FaLinkedin, FaYoutube, FaHome, FaProjectDiagram, FaCode, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const Portfolio = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-black text-white min-h-screen flex flex-col items-center justify-center">
      <motion.h1
        className="text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to My Portfolio
      </motion.h1>
      <motion.p
        className="text-lg mb-6 text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        I'm a passionate developer creating modern and animated web experiences.
      </motion.p>

      {/* Navigation */}
      <div className="flex space-x-6 text-2xl mb-6">
        <motion.a href="#home" className="hover:text-gray-400" whileHover={{ scale: 1.1 }}><FaHome /> Home</motion.a>
        <motion.a href="#skills" className="hover:text-gray-400" whileHover={{ scale: 1.1 }}><FaCode /> Skills</motion.a>
        <motion.a href="#projects" className="hover:text-gray-400" whileHover={{ scale: 1.1 }}><FaProjectDiagram /> Projects</motion.a>
        <motion.a href="#contact" className="hover:text-gray-400" whileHover={{ scale: 1.1 }}><FaEnvelope /> Contact</motion.a>
      </div>

      {/* Social Links */}
      <div className="flex space-x-6">
        <motion.a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-4xl hover:text-gray-400"
          whileHover={{ scale: 1.2 }}
        >
          <FaGithub />
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-4xl hover:text-blue-400"
          whileHover={{ scale: 1.2 }}
        >
          <FaLinkedin />
        </motion.a>
        <motion.a
          href="https://youtube.com/yourchannel"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-4xl hover:text-red-400"
          whileHover={{ scale: 1.2 }}
        >
          <FaYoutube />
        </motion.a>
      </div>

      {/* Sections */}
      <div id="home" className="mt-10 text-center">
        <h2 className="text-3xl font-bold">Home</h2>
        <p>Welcome to my world of development and creativity.</p>
      </div>

      <div id="skills" className="mt-10 text-center">
        <h2 className="text-3xl font-bold">Skills</h2>
        <p>React, JavaScript, Tailwind CSS, Framer Motion, and more.</p>
      </div>

      <div id="projects" className="mt-10 text-center">
        <h2 className="text-3xl font-bold">Projects</h2>
        <p>Check out my latest projects in web development.</p>
      </div>

      <div id="contact" className="mt-10 text-center">
        <h2 className="text-3xl font-bold">Contact</h2>
        <p>Email: your.email@example.com</p>
      </div>
    </div>
  );
};

export default Portfolio;
