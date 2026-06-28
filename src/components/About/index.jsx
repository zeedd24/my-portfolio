import { useContext, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PortfolioContext from "../../context/PortfolioContext"
import {
  FaUser, FaEnvelope, FaGraduationCap, FaMapMarkerAlt,
  FaCode, FaFolderOpen, FaCertificate, FaHeart
} from "react-icons/fa"

/* ---- Terminal tab content ---- */
const TERMINAL_TABS = [
  { id: "profile", label: "profile.json" },
  { id: "stack", label: "stack.md" },
  { id: "facts", label: "facts.txt" },
]

const TerminalContent = ({ tab, profile }) => {
  const name = profile?.name || "Ahmad Zidane"
  const role = profile?.role || "Informatics Engineering Student"
  const email = profile?.email || "azidane@student.umrah.ac.id"
  const location = profile?.location || "Tanjungpinang, Indonesia"

  if (tab === "profile") {
    return (
      <div>
        {[
          [null, <><span className="t-bracket">{"{"}</span></>],
          [1, <><span className="t-key">&quot;name&quot;</span><span className="t-bracket">: </span><span className="t-val">&quot;{name}&quot;</span><span className="t-bracket">,</span></>],
          [2, <><span className="t-key">&quot;role&quot;</span><span className="t-bracket">: </span><span className="t-val">&quot;{role}&quot;</span><span className="t-bracket">,</span></>],
          [3, <><span className="t-key">&quot;email&quot;</span><span className="t-bracket">: </span><span className="t-val">&quot;{email}&quot;</span><span className="t-bracket">,</span></>],
          [4, <><span className="t-key">&quot;location&quot;</span><span className="t-bracket">: </span><span className="t-val">&quot;{location}&quot;</span><span className="t-bracket">,</span></>],
          [5, <><span className="t-key">&quot;available&quot;</span><span className="t-bracket">: </span><span className="t-bool">true</span><span className="t-bracket">,</span></>],
          [6, <><span className="t-key">&quot;open_to_work&quot;</span><span className="t-bracket">: </span><span className="t-bool">true</span><span className="t-bracket">,</span></>],
          [7, <><span className="t-key">&quot;focus&quot;</span><span className="t-bracket">: [</span></>],
          [8, <>&nbsp;&nbsp;<span className="t-val">&quot;Web Development&quot;</span><span className="t-bracket">,</span></>],
          [9, <>&nbsp;&nbsp;<span className="t-val">&quot;Frontend Developer&quot;</span><span className="t-bracket">,</span></>],
          [10, <>&nbsp;&nbsp;<span className="t-val">&quot;AI & Machine Learning&quot;</span></>],
          [11, <><span className="t-bracket">],</span></>],
          [null, <><span className="t-bracket">{"}"}</span><span className="terminal-cursor" /></>],
        ].map(([num, content], i) => (
          <div className="terminal-line" key={i}>
            {num !== null && <span className="terminal-line-num">{num}</span>}
            <span>{content}</span>
          </div>
        ))}
      </div>
    )
  }

  if (tab === "stack") {
    return (
      <div>
        {[
          [null, <><span className="t-comment"># Tech Stack</span></>],
          [null, ""],
          [null, <><span className="t-heading">## Frontend</span></>],
          [null, <><span className="t-bullet">✓</span> <span className="t-text">React.js, JavaScript, HTML/CSS</span></>],
          [null, <><span className="t-bullet">✓</span> <span className="t-text">Tailwind CSS, Bootstrap</span></>],
          [null, ""],
          [null, <><span className="t-heading">## Backend</span></>],
          [null, <><span className="t-bullet">✓</span> <span className="t-text">Node.js, Express.js, PHP</span></>],
          [null, <><span className="t-bullet">✓</span> <span className="t-text">MySQL, PostgreSQL, MongoDB</span></>],
          [null, ""],
          [null, <><span className="t-heading">## DevOps & Tools</span></>],
          [null, <><span className="t-bullet">✓</span> <span className="t-text">Git, GitHub, Docker</span></>],
          [null, <><span className="t-bullet">✓</span> <span className="t-text">Linux, Cisco Networking</span></>],
          [null, ""],
          [null, <><span className="t-muted">&gt; Always learning...</span><span className="terminal-cursor" /></>],
        ].map((item, i) => {
          const content = Array.isArray(item) ? item[1] : item
          return (
            <div className="terminal-line" key={i}>
              <span>{content === "" ? "\u00A0" : content}</span>
            </div>
          )
        })}
      </div>
    )
  }

  if (tab === "facts") {
    return (
      <div>
        {[
          <><span className="t-comment"># Fun facts about me</span></>,
          "",
          <><span className="t-num">01.</span> <span className="t-text">I debug with console.log (no shame)</span></>,
          <><span className="t-num">02.</span> <span className="t-text">Coffee &gt; sleep during deadlines</span></>,
          <><span className="t-num">03.</span> <span className="t-text">I name variables in English & Bahasa</span></>,
          <><span className="t-num">04.</span> <span className="t-text">Dark mode only — always and forever</span></>,
          <><span className="t-num">05.</span> <span className="t-text">Stack Overflow veteran (read-only mode)</span></>,
          <><span className="t-num">06.</span> <span className="t-text">Currently learning: AI & Deep Learning</span></>,
          "",
          <><span className="t-comment"># Hobbies</span></>,
          "",
          <><span className="t-bullet">❤</span> <span className="t-text">Building side projects</span></>,
          <><span className="t-bullet">❤</span> <span className="t-text">Exploring new frameworks</span></>,
          <><span className="t-bullet">❤</span> <span className="t-text">Network configuration & labs</span></>,
          <><span className="t-muted">&gt; $ whoami</span><span className="terminal-cursor" /></>,
        ].map((line, i) => (
          <div className="terminal-line" key={i}>
            <span>{line === "" ? "\u00A0" : line}</span>
          </div>
        ))}
      </div>
    )
  }

  return null
}

const About = () => {
  const { data } = useContext(PortfolioContext)
  const { profile, projects = [], certificates = [] } = data
  const [activeTab, setActiveTab] = useState("profile")

  const metrics = [
    { icon: FaFolderOpen, label: "Projects", value: projects.length > 0 ? `${projects.length}+` : "5+" },
    { icon: FaCertificate, label: "Certificates", value: certificates.length > 0 ? `${certificates.length}+` : "3+" },
    { icon: FaMapMarkerAlt, label: "Location", value: profile?.location || "Medan, ID" },
    { icon: FaHeart, label: "Status", value: "Open to Work" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <section id="about" className="section section-glow">
      {/* Floating blobs */}
      <div className="glow-blob glow-blob-1" />
      <div className="glow-blob glow-blob-2" />
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
            About Me
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A peek into my world — who I am, what I do, and how I think.
          </motion.p>
        </div>

        <div className="about-grid-new">
          {/* LEFT: Developer Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="dev-terminal">
              {/* Title bar */}
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="terminal-dot red" />
                  <span className="terminal-dot yellow" />
                  <span className="terminal-dot green" />
                </div>
                <span className="terminal-title">~/portfolio/{TERMINAL_TABS.find(t => t.id === activeTab)?.label}</span>
              </div>

              {/* Tabs */}
              <div className="terminal-tabs">
                {TERMINAL_TABS.map(tab => (
                  <button
                    key={tab.id}
                    className={`terminal-tab${activeTab === tab.id ? " active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Body */}
              <div className="terminal-body">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    <TerminalContent tab={activeTab} profile={profile} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Bio + Metrics */}
          <div className="about-right">
            <motion.div
              className="glass-card about-bio-card"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="section-badge">
                <FaCode /> Developer Profile
              </div>
              <h3>Who Am I?</h3>
              <p>
                {profile?.bio || "Informatics Engineering student focusing on Web Development, Networking, and AI."}
              </p>

              {/* Info grid */}
              <motion.div
                className="about-info-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {[
                  { icon: FaUser, label: "Full Name", value: profile?.name || "Ahmad Zidane" },
                  { icon: FaGraduationCap, label: "Status", value: profile?.role || "Engineering Student" },
                  { icon: FaEnvelope, label: "Email", value: profile?.email || "ahmad.zidane@gmail.com" },
                  { icon: FaMapMarkerAlt, label: "Location", value: profile?.location || "Medan, Indonesia" },
                ].map(({ icon: Icon, label, value }) => (
                  <motion.div className="about-info-item" key={label} variants={itemVariants}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-accent)", marginBottom: "5px" }}>
                      <Icon /> <h5>{label}</h5>
                    </div>
                    <p>{value}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Metric Cards */}
            <motion.div
              className="about-metrics-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {metrics.map(({ icon: Icon, label, value }) => (
                <motion.div
                  className="about-metric-card"
                  key={label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="about-metric-icon">
                    <Icon />
                  </div>
                  <div>
                    <div className="about-metric-label">{label}</div>
                    <div className="about-metric-value">{value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
