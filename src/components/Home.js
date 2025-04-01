import React from "react";
import "./Home.css";
import myImage from "../assets/Resume photo.jpg";
import Skills from "./Skills";
import Projects from "./Projects";
import Certification from "./Certification";
import About from "./About";
import Contact from "./Contact"; // Import the Contact component

const Home = () => {
  return (
    <>
      <section className="home">
        <div className="content">
          <h1 className="fade-in">
            Welcome to <span>My Portfolio</span>
          </h1>
          <h2 className="typewriter">Hello, this is Kowshik...</h2>
          <p className="slide-up">
            An experienced full-stack developer proficient in <strong>Java, Spring Boot, React.js,</strong> and <strong>Django</strong> frameworks. Passionate about building robust web applications, with a keen interest in <strong>Data Science</strong> and <strong>Data Analytics</strong>.
          </p>
          <a href="/contact" className="btn pulse">Let’s Connect</a>
        </div>
        <div className="image-container">
          <img src={myImage} alt="Kowshik" className="profile-image bounce" />
        </div>
      </section>
      
      <section className="skills-container">
        <Skills />
      </section>

      <section className="projects-container">
        <Projects />
      </section>

      <section className="certification-container">
        <Certification />
      </section>

      <section className="about-section">
        <About />
      </section>

      {/* Contact Section */}
      <section className="contact-container">
        <Contact />
      </section>
    </>
  );
};

export default Home;
