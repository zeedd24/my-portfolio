import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import PortfolioContext from "../../context/PortfolioContext";
import "./SplashScreen.css";

const SplashScreen = ({ finishLoading }) => {
  const { data } = useContext(PortfolioContext);
  const name = data?.profile?.name || "AHMAD ZIDANE";

  useEffect(() => {
    const timer = setTimeout(() => {
      finishLoading();
    }, 2500); // Loading duration
    return () => clearTimeout(timer);
  }, [finishLoading]);

  // Framer Motion container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1], // Premium cubic bezier curve
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.85 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 120,
      },
    },
  };

  const lineVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        duration: 1.8,
        ease: "easeInOut",
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="splash-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="splash-glow"></div>
      
      <div className="splash-content">
        <motion.div className="splash-branding">
          {name.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className={char === " " ? "splash-space" : "splash-char"}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
        
        <p className="splash-subtitle">PORTFOLIO</p>
        
        <div className="splash-loader-bar">
          <motion.div 
            className="splash-loader-progress"
            variants={lineVariants}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
