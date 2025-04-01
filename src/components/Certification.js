import React from "react";
import "./Certification.css";
import { motion } from "framer-motion";
import { FaAws, FaRedhat, FaSalesforce } from "react-icons/fa";

const certifications = [
  {
    title: "AWS Certified Cloud Practitioner",
    color: "#FF9900",
    icon: <FaAws size={50} />,
  },
  {
    title: "Red Hat EX183 Certified",
    color: "#EE0000",
    icon: <FaRedhat size={50} />,
  },
  {
    title: "Salesforce AI Associate Certified",
    color: "#00A1E0",
    icon: <FaSalesforce size={50} />,
  },
];

const Certification = () => {
  return (
    <div className="certification-section">
      <h1 className="certification-heading">My Certifications</h1>
      <div className="certification-grid">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            className="certification-card"
            style={{ borderColor: cert.color }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.1, rotate: 2 }}
          >
            <div className="cert-icon" style={{ color: cert.color }}>
              {cert.icon}
            </div>
            <h2 className="certification-title">{cert.title}</h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Certification;
