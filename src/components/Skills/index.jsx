import { useContext } from "react"
import { motion } from "framer-motion"
import PortfolioContext from "../../context/PortfolioContext"
import { 
  FaReact, FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaPython, FaGitAlt, 
  FaDatabase, FaServer, FaCode, FaLaptopCode, FaGlobe 
} from "react-icons/fa"

const getSkillIcon = (name = "") => {
  const lowercase = name.toLowerCase()
  if (lowercase.includes("react")) return <FaReact />
  if (lowercase.includes("html")) return <FaHtml5 />
  if (lowercase.includes("css")) return <FaCss3Alt />
  if (lowercase.includes("javascript") || lowercase.includes("js")) return <FaJs />
  if (lowercase.includes("node")) return <FaNodeJs />
  if (lowercase.includes("python")) return <FaPython />
  if (lowercase.includes("git")) return <FaGitAlt />
  if (lowercase.includes("database") || lowercase.includes("sql") || lowercase.includes("mongo")) return <FaDatabase />
  if (lowercase.includes("server") || lowercase.includes("network") || lowercase.includes("cisco")) return <FaServer />
  if (lowercase.includes("web")) return <FaGlobe />
  if (lowercase.includes("code") || lowercase.includes("c++") || lowercase.includes("java")) return <FaLaptopCode />
  return <FaCode />
}

const Skills = () => {
  const { data } = useContext(PortfolioContext)
  const { skills = [] } = data

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          Skills &amp; Expertise
        </motion.h2>
        {skills.length === 0 ? (
          <div className="glass-card" style={{ padding: "40px", textAlign: "center" }}>
            <p>No skills added yet. Please log in to the Admin Dashboard to add your skills.</p>
          </div>
        ) : (
          <motion.div 
            className="skills-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {skills.map((skill) => (
              <motion.div 
                key={skill.id} 
                className="glass-card skill-card"
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="skill-icon-box">
                  {getSkillIcon(skill.name)}
                </div>
                <h4>{skill.name}</h4>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Skills
