import { useContext } from "react"
import { motion } from "framer-motion"
import PortfolioContext from "../../context/PortfolioContext"
import { resolveSelectedSkills } from "../../data/skillCatalog"
import SkillIcon from "./SkillIcon"

const Skills = () => {
  const { data } = useContext(PortfolioContext)
  const selectedSkills = resolveSelectedSkills(data.skills)

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
    <section id="skills" className="section section-glow">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            Skills &amp; Expertise
          </motion.h2>
        </div>
        {selectedSkills.length === 0 ? (
          <div className="glass-card" style={{ padding: "40px", textAlign: "center" }}>
            <p>No skills added yet. Please log in to the Admin Dashboard to select your skills.</p>
          </div>
        ) : (
          <motion.div 
            className="skills-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {selectedSkills.map((skill) => (
              <motion.div 
                key={skill.id} 
                className="glass-card skill-card"
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="skill-icon-box">
                  <SkillIcon skillId={skill.id} size="2rem" />
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
