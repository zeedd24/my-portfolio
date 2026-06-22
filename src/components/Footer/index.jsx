import { FaGithub, FaLinkedin, FaInstagram, FaChevronUp } from "react-icons/fa"
import { animateScroll as scroll } from "react-scroll"

const Footer = () => {
  const scrollToTop = () => {
    scroll.scrollToTop()
  }

  return (
    <footer className="footer">
      <div className="container footer-content">
        <button
          onClick={scrollToTop}
          className="btn-secondary"
          style={{
            borderRadius: "50%",
            width: "44px",
            height: "44px",
            padding: 0,
            justifyContent: "center",
            marginBottom: "20px"
          }}
          title="Back to Top"
        >
          <FaChevronUp />
        </button>
        
        <div className="footer-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub">
            <FaGithub />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
            <FaInstagram />
          </a>
        </div>
        
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "10px" }}>
          &copy; {new Date().getFullYear()} AHMAD ZIDANE. Created with React &amp; Vite.
        </p>
      </div>
    </footer>
  )
}

export default Footer
