import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaLinkedin, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <h1 className="logo">MyPortfolio</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/skills">Skills</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/certification">Certifications</Link></li> {/* Added Certifications */}
          <li><Link to="/about">About Me</Link></li> {/* Added About Me */}
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/resume" className="resume-btn">Download Resume</Link></li>
        </ul>
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/kowshik-gajula-a25955253/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={30} />
          </a>
          <a href="https://github.com/KowshikGajula" target="_blank" rel="noopener noreferrer">
            <FaGithub size={30} />
          </a>
          <a href="https://www.youtube.com/channel/your_channel_id" target="_blank" rel="noopener noreferrer">
            <FaYoutube size={30} />
          </a>
          <a href="https://www.instagram.com/kowshikgajula?igsh=MTVvYjIxaWhienhpMg==" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
