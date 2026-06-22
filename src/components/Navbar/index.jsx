import { useContext } from "react"
import { Link as ScrollLink } from "react-scroll"
import { Link as RouterLink, useLocation } from "react-router-dom"
import PortfolioContext from "../../context/PortfolioContext"
import { FaUserShield, FaSignOutAlt } from "react-icons/fa"

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(PortfolioContext)
  const location = useLocation()
  const isHomePage = location.pathname === "/"

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <RouterLink to="/" className="navbar-logo">Ahmad Zidane</RouterLink>
        <ul className="navbar-menu">
          {isHomePage ? (
            <>
              <li>
                <ScrollLink to="hero" spy={true} smooth={true} offset={-70} duration={500} className="navbar-link" activeClass="active">
                  Home
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="about" spy={true} smooth={true} offset={-70} duration={500} className="navbar-link" activeClass="active">
                  About
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="skills" spy={true} smooth={true} offset={-70} duration={500} className="navbar-link" activeClass="active">
                  Skills
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="projects" spy={true} smooth={true} offset={-70} duration={500} className="navbar-link" activeClass="active">
                  Projects
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="experience" spy={true} smooth={true} offset={-70} duration={500} className="navbar-link" activeClass="active">
                  Experience
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to="contact" spy={true} smooth={true} offset={-70} duration={500} className="navbar-link" activeClass="active">
                  Contact
                </ScrollLink>
              </li>
            </>
          ) : (
            <li>
              <RouterLink to="/" className="navbar-link">
                &larr; View Portfolio
              </RouterLink>
            </li>
          )}

          {isLoggedIn && !isHomePage && (
            <>
              <li>
                <RouterLink to="/admin" className="btn-secondary" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
                  <FaUserShield /> Dashboard
                </RouterLink>
              </li>
              <li>
                <button onClick={logout} className="btn-danger" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
