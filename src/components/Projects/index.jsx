import { useContext } from "react"
import { motion } from "framer-motion"
import PortfolioContext from "../../context/PortfolioContext"
import { FaExternalLinkAlt, FaFolder } from "react-icons/fa"

const Projects = () => {
  const { data } = useContext(PortfolioContext)
  const { projects = [] } = data

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

  const projectVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 90,
      },
    },
  }

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          My Projects
        </motion.h2>
        {projects.length === 0 ? (
          <div className="glass-card" style={{ padding: "40px", textAlign: "center" }}>
            <p>No projects added yet. Please log in to the Admin Dashboard to add your projects.</p>
          </div>
        ) : (
          <motion.div 
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {projects.map((project) => (
              <motion.div 
                key={project.id} 
                className="glass-card project-card"
                variants={projectVariants}
                whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
              >
                {project.imageUrl && (
                  <div className="project-card-image">
                    <img src={project.imageUrl} alt={project.title} loading="lazy" />
                  </div>
                )}
                <div className="project-details">
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--color-primary)", marginBottom: "15px" }}>
                    <FaFolder style={{ fontSize: "1.5rem" }} />
                    <span style={{ fontSize: "0.8rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 600 }}>Project</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  
                  {project.tech && (
                    <div className="project-tags">
                      {project.tech.split(",").map((techItem, index) => (
                        <span key={index} className="project-tag">
                          {techItem.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {project.link && (
                    <div className="project-links">
                      <a
                        href={project.link.startsWith("http") ? project.link : `https://${project.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-text"
                      >
                        View Live Demo <FaExternalLinkAlt />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Projects
