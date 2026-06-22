import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import About from "../components/About"
import Skills from "../components/Skills"
import Projects from "../components/Projects"
import Experience from "../components/Experience"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import SplashScreen from "../components/SplashScreen/SplashScreen"

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="home-layout">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}

export default Home

