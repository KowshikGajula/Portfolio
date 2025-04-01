import React, { useRef } from "react";
import "./Skills.css";

const skillsData = [
  { skill: "Java Full Stack Developer", percentage: 95 },
  { skill: "Django - Python Full Stack Developer", percentage: 80 },
  { skill: "Software Development", percentage: 95 },
  { skill: "Data Science & Analytics", percentage: 95 },
  { skill: "React / Angular (Frontend)", percentage: 90 },
  { skill: "Spring Boot / Django (Backend)", percentage: 85 },
  { skill: "AWS / Azure (Cloud Platforms)", percentage: 75 },
];

const Skills = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 510; // Width of one skill card
    if (scrollRef.current) {
      if (direction === "left") {
        scrollRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        scrollRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section className="skills" id="skills">
      <h2 className="skills-title">My Skills</h2>
        {/* Additional Content Section */}
        <div className="skills-description">
        <h3>Technologies & Frameworks</h3>
        <p>
          I specialize in backend development using <strong>Java</strong> and <strong>Spring Boot</strong> or <strong>Django (Python)</strong>.  
          For frontend development, I work with modern frameworks like <strong>React</strong> and <strong>Angular</strong>.  
          Additionally, I have hands-on experience with cloud platforms like <strong>AWS</strong> and <strong>Azure</strong> for scalable deployments and services.
        </p>
        <p>
          In <strong>Data Science & Analytics</strong>, I analyze and visualize data to derive insights, build predictive models, and improve decision-making.  
          My experience includes working with libraries such as <strong>Pandas, NumPy, Matplotlib</strong>, and <strong>scikit-learn</strong> for machine learning tasks.
        </p>
      </div>
      <div className="skills-navigation">
        <button id="scrollLeft" className="scroll-btn" onClick={() => scroll("left")}>
          &lt;
        </button>
        <div className="skills-container" ref={scrollRef}>
          {skillsData.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="circle">
                <div
                  className="bar"
                  style={{ "--percentage": skill.percentage + "%" }}
                ></div>
                <div className="percentage">{skill.percentage}%</div>
              </div>
              <h3 className="skill-name">{skill.skill}</h3>
            </div>
          ))}
        </div>
        <button id="scrollRight" className="scroll-btn" onClick={() => scroll("right")}>
          &gt;
        </button>
      </div>
      
    
    </section>
  );
};

export default Skills;
