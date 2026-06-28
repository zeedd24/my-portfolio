import { useContext, useState } from "react"
import { motion } from "framer-motion"
import PortfolioContext from "../../context/PortfolioContext"
import {
  FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhone,
  FaGithub, FaLinkedin, FaInstagram, FaComments
} from "react-icons/fa"

const Contact = () => {
  const { data } = useContext(PortfolioContext)
  const { profile } = data

  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const toEmail = profile?.email || "ahmad.zidane@gmail.com"
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`
  }

  const contactItems = [
    { icon: FaEnvelope, label: "Email", value: profile?.email || "ahmad.zidane@gmail.com" },
    { icon: FaPhone, label: "Phone / WhatsApp", value: profile?.phone || "+62 812-3456-7890" },
    { icon: FaMapMarkerAlt, label: "Location", value: profile?.location || "Medan, Indonesia" },
  ]

  const socialLinks = [
    { icon: FaGithub, url: profile?.github, label: "GitHub" },
    { icon: FaLinkedin, url: profile?.linkedin, label: "LinkedIn" },
    { icon: FaInstagram, url: profile?.instagram, label: "Instagram" },
  ].filter((link) => link.url)

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 14, stiffness: 90 } },
  }

  return (
    <section id="contact" className="section section-glow">
      <div className="glow-blob glow-blob-3" style={{ bottom: "-80px", top: "auto", left: "10%" }} />
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
            Contact Me
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get in touch! Fill out the form or connect through my social profiles.
          </motion.p>
        </div>

        <div className="contact-grid">
          {/* Left: Info & Socials */}
          <motion.div
            className="glass-card contact-card"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ type: "spring", damping: 15, stiffness: 85 }}
          >
            <div className="contact-card-header">
              <div className="contact-card-icon"><FaComments /></div>
              <div>
                <h3>Let's Connect!</h3>
                <p className="contact-card-subtitle">Open for opportunities &amp; discussions</p>
              </div>
            </div>

            <p style={{ marginBottom: "25px", lineHeight: "1.7" }}>
              Feel free to contact me if you have any questions, project offers, collaborations, or simply want to discuss IT topics.
            </p>

            <motion.div
              className="contact-info-list"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {contactItems.map(({ icon: Icon, label, value }) => (
                <motion.div key={label} className="contact-info-item" variants={itemVariants}>
                  <div className="contact-info-icon"><Icon /></div>
                  <div className="contact-info-text">
                    <h4>{label}</h4>
                    <p>{value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {socialLinks.length > 0 && (
              <div className="contact-social-row">
                {socialLinks.map(({ icon: Icon, url, label }) => (
                  <a
                    key={label}
                    href={url.startsWith("http") ? url : `https://${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-btn"
                    title={label}
                  >
                    <Icon /> {label}
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="glass-card contact-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ type: "spring", damping: 15, stiffness: 85, delay: 0.1 }}
          >
            <div className="contact-card-header">
              <div className="contact-card-icon"><FaPaperPlane /></div>
              <div>
                <h3>Send Message</h3>
                <p className="contact-card-subtitle">Opens your email app automatically</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name..."
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email..."
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="btn-primary contact-submit-btn"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message <FaPaperPlane />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
