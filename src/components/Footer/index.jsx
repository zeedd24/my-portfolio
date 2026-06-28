import { useContext } from "react"
import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaInstagram, FaChevronUp } from "react-icons/fa"
import { animateScroll as scroll } from "react-scroll"
import PortfolioContext from "../../context/PortfolioContext"

const Footer = () => {
  const { data } = useContext(PortfolioContext)
  const { profile } = data

  const scrollToTop = () => {
    scroll.scrollToTop()
  }

  const socialLinks = [
    { icon: FaGithub, url: profile.github || "https://github.com", label: "GitHub" },
    { icon: FaLinkedin, url: profile.linkedin || "https://linkedin.com", label: "LinkedIn" },
    { icon: FaInstagram, url: profile.instagram || "https://instagram.com", label: "Instagram" },
  ].filter((link) => link.url)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 14, stiffness: 90 },
    },
  }

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="container footer-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.button
          onClick={scrollToTop}
          className="btn-secondary footer-scroll-top"
          title="Back to Top"
          variants={itemVariants}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.95 }}
          animate={{ boxShadow: ["0 0 0 0 rgba(244, 63, 94, 0.3)", "0 0 0 8px rgba(244, 63, 94, 0)", "0 0 0 0 rgba(244, 63, 94, 0.3)"] }}
          transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
        >
          <FaChevronUp />
        </motion.button>

        {socialLinks.length > 0 && (
          <motion.div className="footer-links" variants={itemVariants}>
            {socialLinks.map(({ icon: Icon, url, label }) => (
              <motion.a
                key={label}
                href={url.startsWith("http") ? url : `https://${url}`}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        )}

        <motion.p className="footer-tagline" variants={itemVariants}>
          &copy; {new Date().getFullYear()} {profile.name || "AHMAD ZIDANE"}. 
        </motion.p>
      </motion.div>
    </motion.footer>
  )
}

export default Footer
