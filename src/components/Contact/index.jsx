import { useContext, useState } from "react"
import { motion } from "framer-motion"
import PortfolioContext from "../../context/PortfolioContext"
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhone } from "react-icons/fa"

const Contact = () => {
  const { data } = useContext(PortfolioContext)
  const { profile } = data

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(true)
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setSuccess(false), 5000)
  }

  const contactItems = [
    { icon: FaEnvelope, label: "Email", value: profile.email || "ahmad.zidane@gmail.com" },
    { icon: FaPhone, label: "Phone / WhatsApp", value: profile.phone || "+62 812-3456-7890" },
    { icon: FaMapMarkerAlt, label: "Location", value: profile.location || "Medan, Indonesia" },
  ]

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", damping: 14, stiffness: 90 },
    },
  }

  return (
    <section id="contact" className="section section-glow">
      <div className="container">
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
        </div>
        <div className="contact-grid">

          <motion.div
            className="glass-card contact-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ type: "spring", damping: 15, stiffness: 85 }}
          >
            <h3>Let's Connect!</h3>
            <p>
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
          </motion.div>

          <motion.div
            className="glass-card contact-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ type: "spring", damping: 15, stiffness: 85, delay: 0.1 }}
          >
            <h3>Send Message</h3>
            {success && (
              <motion.div
                className="error-message"
                style={{ background: "rgba(16, 185, 129, 0.1)", borderColor: "rgba(16, 185, 129, 0.2)", color: "var(--color-success)" }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Your message has been sent successfully! Thank you for reaching out.
              </motion.div>
            )}
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
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="btn-primary"
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
