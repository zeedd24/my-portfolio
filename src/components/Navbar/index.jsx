import { useContext, useState } from "react"
import { Link as ScrollLink } from "react-scroll"
import { Link as RouterLink, useLocation } from "react-router-dom"
import PortfolioContext from "../../context/PortfolioContext"
import { FaUserShield, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa"

const navLinks = [
  { to: "hero", label: "Home" },
  { to: "about", label: "About" },
  { to: "skills", label: "Skills" },
  { to: "projects", label: "Projects" },
  { to: "experience", label: "Experience" },
  { to: "contact", label: "Contact" },
]

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(PortfolioContext)
  const location = useLocation()
  const isHomePage = location.pathname === "/"
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  const renderNavLinks = (mobile = false) =>
    navLinks.map(({ to, label }) => (
      <li key={to}>
        <ScrollLink
          to={to}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="navbar-link"
          activeClass="active"
          onClick={mobile ? closeMenu : undefined}
        >
          {label}
        </ScrollLink>
      </li>
    ))

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <RouterLink to="/" className="navbar-logo" onClick={closeMenu}>
          Ahmad Zidane
        </RouterLink>

        {isHomePage ? (
          <>
            <ul className={`navbar-menu ${menuOpen ? "navbar-menu-open" : ""}`}>
              {renderNavLinks(menuOpen)}
            </ul>
            <button
              className="navbar-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </>
        ) : (
          <ul className="navbar-menu">
            <li>
              <RouterLink to="/" className="navbar-link">
                &larr; View Portfolio
              </RouterLink>
            </li>
            {isLoggedIn && (
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
        )}
      </div>
    </nav>
  )
}

export default Navbar
