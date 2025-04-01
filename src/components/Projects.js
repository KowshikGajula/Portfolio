import React, { useState } from "react";
import "./Projects.css";
import { FaPython, FaReact, FaChartLine } from "react-icons/fa";
import { SiTableau } from "react-icons/si";

const Projects = () => {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const projectData = [
    {
      icon: <FaPython size={80} color="#3776AB" />,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce platform using Python with MongoDB backend.",
    },
    {
      icon: <FaReact size={80} color="#61DBFB" />,
      title: "Museum Ticketing Chatbot",
      description: "A chatbot-based museum ticket booking system using React JS.",
    },
    {
      icon: <FaReact size={80} color="#61DBFB" />,
      title: "Indian Culture Awareness",
      description: "A web app to promote Indian culture using React JS and Spring Boot with MySQL.",
    },
    {
      icon: <SiTableau size={80} color="#E97627" />,
      title: "CSK Player Stats Visualization",
      description: "Tableau dashboards visualizing CSK batting, bowling, and player stats.",
    },
    {
      icon: <FaChartLine size={80} color="#4CAF50" />,
      title: "Sales Data Analysis",
      description: "A comprehensive sales data analysis dashboard built using Tableau and Python.",
    },
  ];

  const handleCardClick = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <section className="projects-section">
      <h2 className="section-title">My Highlighted Projects</h2>
      <div className="project-grid">
        {projectData.map((project, index) => (
          <div
            key={index}
            className={`project-card ${flippedIndex === index ? "flipped" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              <div className="card-front">
                <div className="icon-container">{project.icon}</div>
                <h3>{project.title}</h3>
              </div>
              <div className="card-back">
                <p>{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
