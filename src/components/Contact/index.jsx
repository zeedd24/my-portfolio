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
    // Mock submit behavior
    setSuccess(true)
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setSuccess(false), 5000)
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          Contact Me
        </motion.h2>
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
            
            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-info-icon"><FaEnvelope /></div>
                <div className="contact-info-text">
                  <h4>Email</h4>
                  <p>{profile.email || "ahmad.zidane@gmail.com"}</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><FaPhone /></div>
                <div className="contact-info-text">
                  <h4>Phone / WhatsApp</h4>
                  <p>+62 812-3456-7890</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><FaMapMarkerAlt /></div>
                <div className="contact-info-text">
                  <h4>Location</h4>
                  <p>Medan, Indonesia</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="glass-card contact-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ type: "spring", damping: 15, stiffness: 85 }}
          >
            <h3>Send Message</h3>
            {success && (
              <div className="error-message" style={{ background: "rgba(16, 185, 129, 0.1)", borderColor: "rgba(16, 185, 129, 0.2)", color: "var(--color-success)" }}>
                Your message has been sent successfully! Thank you for reaching out.
              </div>
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
              <button type="submit" className="btn-primary">
                Send Message <FaPaperPlane />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Contact
