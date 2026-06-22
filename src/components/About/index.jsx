import { useContext } from "react"
import { motion } from "framer-motion"
import PortfolioContext from "../../context/PortfolioContext"
import { FaUser, FaEnvelope, FaGraduationCap, FaMapMarkerAlt } from "react-icons/fa"

const About = () => {
  const { data } = useContext(PortfolioContext)
  const { profile } = data

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="about" className="section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        <motion.div 
          className="about-grid"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="glass-card about-card">
            <h3>Who Am I?</h3>
            <p style={{ fontSize: "1.1rem", marginBottom: "20px", marginTop: "15px" }}>
              {profile.bio || "Informatics Engineering student focusing on Web Development, Networking, and AI."}
            </p>
            <p>
              I am an Informatics Engineering student with a high interest in information technology. I am always excited to learn new technologies, solve complex problems through programming, and build systems that benefit society.
            </p>
            
            <motion.div 
              className="about-info-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="about-info-item" variants={itemVariants}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-accent)", marginBottom: "5px" }}>
                  <FaUser /> <h5>Full Name</h5>
                </div>
                <p>{profile.name || "AHMAD ZIDANE"}</p>
              </motion.div>
              <motion.div className="about-info-item" variants={itemVariants}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-accent)", marginBottom: "5px" }}>
                  <FaGraduationCap /> <h5>Role / Status</h5>
                </div>
                <p>{profile.role || "Informatics Engineering Student"}</p>
              </motion.div>
              <motion.div className="about-info-item" variants={itemVariants}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-accent)", marginBottom: "5px" }}>
                  <FaEnvelope /> <h5>Email</h5>
                </div>
                <p>{profile.email || "ahmad.zidane@gmail.com"}</p>
              </motion.div>
              <motion.div className="about-info-item" variants={itemVariants}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-accent)", marginBottom: "5px" }}>
                  <FaMapMarkerAlt /> <h5>Location</h5>
                </div>
                <p>Indonesia</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
