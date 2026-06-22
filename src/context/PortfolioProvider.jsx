import { useEffect, useState } from "react"
import PortfolioContext from "./PortfolioContext"
import portfolioData from "../data/portfolio"
import { getData, saveData } from "../utils/storage"

const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const storedData = getData()
    return storedData || portfolioData
  })

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("admin_is_logged_in") === "true"
  })

  useEffect(() => {
    saveData(data)
  }, [data])

  const login = (password) => {
    // Static password for simple local demo auth
    if (password === "admin123") {
      setIsLoggedIn(true)
      sessionStorage.setItem("admin_is_logged_in", "true")
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    sessionStorage.removeItem("admin_is_logged_in")
  }

  const updateProfile = (profileData) => {
    setData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...profileData,
      },
    }))
  }

  const addSkill = (skillName) => {
    const newSkill = {
      id: Date.now(),
      name: skillName,
    }

    setData((prev) => ({
      ...prev,
      skills: [...(prev.skills || []), newSkill],
    }))
  }

  const deleteSkill = (id) => {
    setData((prev) => ({
      ...prev,
      skills: (prev.skills || []).filter((skill) => skill.id !== id),
    }))
  }

  const addProject = (project) => {
    const newProject = {
      id: Date.now(),
      ...project,
    }

    setData((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), newProject],
    }))
  }

  const deleteProject = (id) => {
    setData((prev) => ({
      ...prev,
      projects: (prev.projects || []).filter((project) => project.id !== id),
    }))
  }

  const addExperience = (experience) => {
    const newExperience = {
      id: Date.now(),
      ...experience,
    }

    setData((prev) => ({
      ...prev,
      experiences: [...(prev.experiences || []), newExperience],
    }))
  }

  const deleteExperience = (id) => {
    setData((prev) => ({
      ...prev,
      experiences: (prev.experiences || []).filter((experience) => experience.id !== id),
    }))
  }

  const addCertificate = (certificate) => {
    const newCertificate = {
      id: Date.now(),
      ...certificate,
    }

    setData((prev) => ({
      ...prev,
      certificates: [...(prev.certificates || []), newCertificate],
    }))
  }

  const deleteCertificate = (id) => {
    setData((prev) => ({
      ...prev,
      certificates: (prev.certificates || []).filter((certificate) => certificate.id !== id),
    }))
  }

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isLoggedIn,
        login,
        logout,
        updateProfile,
        addSkill,
        deleteSkill,
        addProject,
        deleteProject,
        addExperience,
        deleteExperience,
        addCertificate,
        deleteCertificate,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export default PortfolioProvider