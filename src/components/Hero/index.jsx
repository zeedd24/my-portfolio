import { useContext } from "react"
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

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg">
        <FloatingLines
          enabledWaves={["bottom", "top", "middle"]}
          lineCount={8}
          lineDistance={8}
          bendRadius={8}
          bendStrength={-2}
          interactive
          parallax={true}
          animationSpeed={1}
          gradientStart="#F43F5E"
          gradientMid="#ff0000"
          gradientEnd="#655252"
        />
      </div>
      <div className="container hero-content">
        <div className="hero-text" style={{ position: 'relative', zIndex: 10 }}>
          <h4>Welcome to My Portfolio</h4>
          <h1>Hello, I'm <br />{profile.name || "AHMAD ZIDANE"}</h1>
          <div className="hero-typing">
            <TypeAnimation
              sequence={[
                "Informatics Engineering Student",
                2000,
                "Web Developer",
                2000,
                "Frontend Developer",
                2000,
                "AI & Machine Learning",
                2000,
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
          <Lanyard
            position={[0, 0, 15]}
            gravity={[0, -40, 0]}
            frontImage={profile.photoUrl || userPhoto}
            backImage={profile.photoUrl || userPhoto}
            imageFit="cover"
            lanyardWidth={1}
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
