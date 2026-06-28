import { useContext } from "react"
import { motion } from "framer-motion"
import PortfolioContext from "../../context/PortfolioContext"
import { FaBriefcase, FaAward, FaExternalLinkAlt } from "react-icons/fa"

const Experience = () => {
  const { data } = useContext(PortfolioContext)
  const { experiences = [], certificates = [] } = data

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      },
    },
  }

  const itemLeftVariants = {
    hidden: { opacity: 0, x: -25 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 90,
      },
    },
  }

  const itemRightVariants = {
    hidden: { opacity: 0, x: 25 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 90,
      },
    },
  }

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 120,
        delay: 0.2
      }
    }
  }

  return (
    <section id="experience" className="section section-glow">
      <div className="container">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Experience &amp; Certificates
          </motion.h2>
        </div>

        <div className="timeline-section-grid">

          <div>
            <motion.h3
              className="subsection-title"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <FaBriefcase style={{ color: "var(--color-primary)", WebkitTextFillColor: "initial" }} /> Experience
            </motion.h3>

            {experiences.length === 0 ? (
              <motion.div
                className="glass-card"
                style={{ padding: "30px" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p>No experiences added yet.</p>
              </motion.div>
            ) : (
              <motion.div
                className="timeline"
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                {experiences.map((exp) => (
                  <motion.div key={exp.id} className="timeline-item" variants={itemLeftVariants}>
                    <motion.div className="timeline-dot" variants={dotVariants}></motion.div>
                    <motion.div
                      className="timeline-content glass-card"
                      style={{ padding: "20px" }}
                      whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    >
                      <div className="timeline-header">
                        <h3>{exp.title}</h3>
                        <span className="timeline-year">{exp.year}</span>
                      </div>
                      <div className="timeline-place">{exp.place}</div>
                      <p style={{ fontSize: "0.9rem" }}>{exp.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          <div>
            <motion.h3
              className="subsection-title"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <FaAward style={{ color: "var(--color-accent)", WebkitTextFillColor: "initial" }} /> Certificates
            </motion.h3>

            {certificates.length === 0 ? (
              <motion.div
                className="glass-card"
                style={{ padding: "30px" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p>No certificates added yet.</p>
              </motion.div>
            ) : (
              <motion.div
                className="cert-list"
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                {certificates.map((cert) => (
                  <motion.div
                    key={cert.id}
                    className="glass-card cert-card"
                    variants={itemRightVariants}
                    whileHover={{ x: 5, scale: 1.01, transition: { duration: 0.2 } }}
                  >
                    <div className="cert-info">
                      <h4>{cert.title}</h4>
                      <div className="cert-issuer">{cert.issuer}</div>
                      <div className="cert-meta">
                        <span className="cert-year">{cert.year}</span>
                      </div>
                    </div>
                    {cert.link && (
                      <a
                        href={cert.link.startsWith("http") ? cert.link : `https://${cert.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-link"
                        title="View Certificate"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Experience
