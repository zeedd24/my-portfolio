import { useContext, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PortfolioContext from "../../context/PortfolioContext"
import { resolveSelectedSkills, SKILL_CATEGORIES } from "../../data/skillCatalog"
import SkillIcon from "./SkillIcon"

const ALL_FILTER = "All"

const Skills = () => {
  const { data } = useContext(PortfolioContext)
  const allSkills = resolveSelectedSkills(data.skills)
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER)

  // Build filter list – only show categories that have at least one selected skill
  const activeCategories = SKILL_CATEGORIES.filter(cat =>
    allSkills.some(s => s.category === cat)
  )
  const filters = [ALL_FILTER, ...activeCategories]

  const filteredSkills =
    activeFilter === ALL_FILTER
      ? allSkills
      : allSkills.filter(s => s.category === activeFilter)

  /* Framer Motion variants */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 14, stiffness: 100 },
    },
    exit: {
      opacity: 0,
      scale: 0.85,
      transition: { duration: 0.15 },
    },
  }

  return (
    <section id="skills" className="section section-glow">
      <div className="glow-blob glow-blob-3" />
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
            Skills &amp; Expertise
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Technologies I work with — hover to see each one glow in its brand color.
          </motion.p>
        </div>

        {allSkills.length === 0 ? (
          <div className="glass-card" style={{ padding: "40px", textAlign: "center" }}>
            <p>No skills added yet.</p>
          </div>
        ) : (
          <>
            {/* Filter Tabs */}
            <motion.div
              className="skill-filter-bar"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {filters.map(filter => {
                const count =
                  filter === ALL_FILTER
                    ? allSkills.length
                    : allSkills.filter(s => s.category === filter).length
                return (
                  <button
                    key={filter}
                    className={`skill-filter-btn${activeFilter === filter ? " active" : ""}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                    <span className="skill-count-badge">{count}</span>
                  </button>
                )
              })}
            </motion.div>

            {/* Skill Grid */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeFilter}
                className="skills-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                viewport={{ once: true, amount: 0.1 }}
              >
                {filteredSkills.map(skill => (
                  <motion.div
                    key={skill.id}
                    className="glass-card skill-card"
                    variants={cardVariants}
                    layout
                    style={{ "--skill-color": skill.color }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  >
                    <div className="skill-icon-box">
                      <SkillIcon skillId={skill.id} size="2rem" />
                    </div>
                    <h4>{skill.name}</h4>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </section>
  )
}

export default Skills
