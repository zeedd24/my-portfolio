import { useContext, useState, useEffect } from "react"
import { Link as ScrollLink } from "react-scroll"
import { TypeAnimation } from "react-type-animation"
import PortfolioContext from "../../context/PortfolioContext"
import { FaArrowRight } from "react-icons/fa"
import userPhoto from "../../assets/hero.png"
import DownloadCvButton from "../DownloadCvButton"
import Lanyard from "../Lanyard/Lanyard"
import FloatingLines from "../FloatingLines/FloatingLines"

const Hero = () => {
  const { data } = useContext(PortfolioContext)
  const { profile } = data
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])

  const photo = profile.photoUrl || userPhoto

  return (
    <section id="hero" className="hero-section">
      {/* FloatingLines: reduced on mobile */}
      <div className="hero-bg">
        <FloatingLines
          enabledWaves={isMobile ? ["middle"] : ["bottom", "top", "middle"]}
          lineCount={isMobile ? 4 : 8}
          lineDistance={isMobile ? 6 : 8}
          bendRadius={8}
          bendStrength={-2}
          interactive={!isMobile}
          parallax={!isMobile}
          animationSpeed={isMobile ? 0.5 : 1}
          gradientStart="#F43F5E"
          gradientMid="#ff0000"
          gradientEnd="#655252"
        />
      </div>

      <div className="container hero-content">
        <div className="hero-text" style={{ position: "relative", zIndex: 10 }}>
          <h4>Welcome to My Portfolio</h4>
          <h1>Hello, I'm <br />{profile.name || "AHMAD ZIDANE"}</h1>
          <div className="hero-typing">
            <TypeAnimation
              sequence={[
                "Informatics Engineering Student", 2000,
                "Web Developer", 2000,
                "Frontend Developer", 2000,
                "AI & Machine Learning", 2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
          <p className="hero-bio">
            {profile.bio || "Informatics Engineering student focusing on Web Development, Networking, and AI."}
          </p>
          <div className="hero-buttons">
            <ScrollLink to="contact" smooth={true} offset={-70} duration={500} className="btn-primary" style={{ cursor: "pointer" }}>
              Contact Me <FaArrowRight />
            </ScrollLink>
            <DownloadCvButton style={{ cursor: "pointer" }} />
            <ScrollLink to="projects" smooth={true} offset={-70} duration={500} className="btn-secondary" style={{ cursor: "pointer" }}>
              View Projects
            </ScrollLink>
          </div>
        </div>

        <div className="hero-visual">
          {isMobile ? (
            /* Static image on mobile — no physics engine */
            <div className="hero-photo-mobile">
              <img src={photo} alt={profile.name || "Profile"} />
            </div>
          ) : (
            <Lanyard
              position={[0, 0, 15]}
              gravity={[0, -40, 0]}
              frontImage={photo}
              backImage={photo}
              imageFit="cover"
              lanyardWidth={1}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero
