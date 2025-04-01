import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container fade-in">
      <h1 className="about-title bounce-in">About Me</h1>
      <div className="about-content">
        <p className="about-text slide-up">
          Hello! I'm <strong>Kowshik Gajula</strong>, a passionate and driven full-stack developer with expertise in building dynamic, user-friendly web applications. My technical skill set includes <strong>React.js, Java, Spring Boot,</strong> and modern frontend technologies. I thrive in team environments, value effective collaboration, and bring strong leadership and communication skills to every project.
        </p>
        <p className="about-text slide-up">
          Academically, I excelled during my education: I completed my 10th grade at Narayana School, Bavanipuram Branch, scoring an impressive <strong>596/600</strong>. For my intermediate studies, I attended Narayana College, Amaravathi Branch, achieving <strong>85%</strong>. Currently, I am pursuing a <strong>B.Tech in Computer Science & Engineering</strong> at KL University, maintaining an excellent <strong>CGPA of 9.32</strong>.
        </p>
        <p className="about-text slide-up">
          I am deeply passionate about learning and adopting new technologies, with a keen focus on developing innovative websites and applications. I take pride in contributing to teamwork, fostering collaboration, and exploring creative solutions to challenges. With a blend of technical expertise, dedication, and enthusiasm, I aim to make a meaningful impact in the tech industry.
        </p>
      </div>
    </div>
  );
};

export default About;
