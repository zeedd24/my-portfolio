import { useContext, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PortfolioContext from "../../context/PortfolioContext"
import CardSwap, { Card } from "./CardSwap"
import { FaExternalLinkAlt, FaTimes, FaGlobe, FaCode, FaInfoCircle } from "react-icons/fa"

const useCardSwapConfig = () => {
  const [config, setConfig] = useState({
    width: 420,
    height: 320,
    cardDistance: 30,
    verticalDistance: 25,
  })

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      const padding = w <= 480 ? 32 : 48

      if (w <= 480) {
        setConfig({
          width: Math.min(w - padding, 300),
          height: 220,
          cardDistance: 14,
          verticalDistance: 12,
        })
      } else if (w <= 768) {
        setConfig({
          width: Math.min(w - padding, 340),
          height: 260,
          cardDistance: 18,
          verticalDistance: 14,
        })
      } else {
        setConfig({
          width: 420,
          height: 320,
          cardDistance: 30,
          verticalDistance: 25,
        })
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return config
}

const Projects = () => {
  const { data } = useContext(PortfolioContext)
  const { projects = [] } = data
  const cardConfig = useCardSwapConfig()

  // Modal detail state
  const [selectedProject, setSelectedProject] = useState(null)

  const handleCardClick = (index) => {
    setSelectedProject(projects[index])
  }

  // Animation variants
  const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const modalContentVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", damping: 20, stiffness: 150 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20,
      transition: { duration: 0.2 }
    }
  }

  return (
    <section id="projects" className="section section-glow projects-section">
      <div className="glow-blob glow-blob-1" style={{ top: "auto", bottom: "-60px", right: "-60px" }} />
      <div className="glow-blob glow-blob-2" style={{ bottom: "auto", top: "-60px", left: "-60px" }} />
      <div className="dot-grid-bg" />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            My Projects
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A curated stack of my creations — click cards to cycle, click any to view details.
          </motion.p>
        </div>

        {projects.length === 0 ? (
          <div className="glass-card" style={{ padding: "40px", textAlign: "center" }}>
            <p>No projects added yet.</p>
          </div>
        ) : (
          <div className="projects-swap-layout">
            {/* Left Column: Stack info & highlights */}
            <motion.div 
              className="projects-swap-intro"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="glass-card proj-intro-card">
                <span className="section-badge"><FaCode /> Showcase</span>
                <h3>Innovative Web App &amp; Tech Stack</h3>
                <p>
                  Explore my latest development work. This interactive stack showcases websites, APIs, automation tools, and networking solutions.
                </p>
                <div className="swap-hint-item">
                  <FaInfoCircle className="hint-icon" />
                  <span>The deck cycles automatically. Hover to pause, click to swap or enter details.</span>
                </div>
                <div className="project-highlight-stats">
                  <div className="stat-box">
                    <span className="stat-val">{projects.length}+</span>
                    <span className="stat-lbl">Built Apps</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-val">React</span>
                    <span className="stat-lbl">Core Tech</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: CardSwap Stack */}
            <motion.div 
              className="projects-swap-wrapper"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <CardSwap
                width={cardConfig.width}
                height={cardConfig.height}
                cardDistance={cardConfig.cardDistance}
                verticalDistance={cardConfig.verticalDistance}
                delay={2000}
                pauseOnHover={true}
                showNav={true}
                onCardClick={handleCardClick}
              >
                {projects.map((project) => (
                  <Card key={project.id}>
                    {project.imageUrl && (
                      <div className="card-banner">
                        <img src={project.imageUrl} alt={project.title} />
                        <div className="card-banner-overlay" />
                      </div>
                    )}
                    <div className="card-body">
                      <div>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                      </div>
                      <div className="card-footer">
                        {project.tech && (
                          <div className="card-tech-badges">
                            {project.tech.split(",").slice(0, 2).map((techItem, i) => (
                              <span key={i} className="card-tech-tag">
                                {techItem.trim()}
                              </span>
                            ))}
                            {project.tech.split(",").length > 2 && (
                              <span className="card-tech-tag">+{project.tech.split(",").length - 2}</span>
                            )}
                          </div>
                        )}
                        <span className="card-action-hint">
                          Details <FaExternalLinkAlt style={{ fontSize: "0.7rem" }} />
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </motion.div>
          </div>
        )}
      </div>

      {/* Portal/Modal Overlay for Details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="proj-modal-overlay"
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              className="glass-card proj-modal-content"
              variants={modalContentVariants}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button className="proj-modal-close" onClick={() => setSelectedProject(null)}>
                <FaTimes />
              </button>

              {/* Banner / Image */}
              {selectedProject.imageUrl && (
                <div className="proj-modal-banner">
                  <img src={selectedProject.imageUrl} alt={selectedProject.title} />
                  <div className="proj-modal-banner-overlay" />
                </div>
              )}

              {/* Body */}
              <div className="proj-modal-body">
                <h2>{selectedProject.title}</h2>
                
                <p className="proj-modal-desc">
                  {selectedProject.description}
                </p>

                {selectedProject.tech && (
                  <div className="proj-modal-tech">
                    <h4>Tech Stack</h4>
                    <div className="proj-modal-tags">
                      {selectedProject.tech.split(",").map((techItem, i) => (
                        <span key={i} className="proj-modal-tag">
                          {techItem.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Links */}
                {selectedProject.link && (
                  <div className="proj-modal-actions">
                    <a 
                      href={selectedProject.link.startsWith("http") ? selectedProject.link : `https://${selectedProject.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary modal-action-btn"
                    >
                      <FaGlobe /> Visit Website
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
