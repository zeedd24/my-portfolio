import { useEffect, useState } from "react"
import PortfolioContext from "./PortfolioContext"
import portfolioData from "../data/portfolio"
import { migrateSkills } from "../data/skillCatalog"
import { getData, saveData } from "../utils/storage"

const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const storedData = getData()
    const initialData = storedData || portfolioData

    return {
      ...initialData,
      skills: migrateSkills(initialData.skills),
    }
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

  const toggleSkill = (skillId) => {
    setData((prev) => {
      const currentSkills = migrateSkills(prev.skills)
      const isSelected = currentSkills.includes(skillId)

      return {
        ...prev,
        skills: isSelected
          ? currentSkills.filter((id) => id !== skillId)
          : [...currentSkills, skillId],
      }
    })
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

  const updateProject = (id, project) => {
    setData((prev) => ({
      ...prev,
      projects: (prev.projects || []).map((item) =>
        item.id === id ? { ...item, ...project } : item
      ),
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

  const updateExperience = (id, experience) => {
    setData((prev) => ({
      ...prev,
      experiences: (prev.experiences || []).map((item) =>
        item.id === id ? { ...item, ...experience } : item
      ),
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

  const updateCertificate = (id, certificate) => {
    setData((prev) => ({
      ...prev,
      certificates: (prev.certificates || []).map((item) =>
        item.id === id ? { ...item, ...certificate } : item
      ),
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
        toggleSkill,
        addProject,
        deleteProject,
        updateProject,
        addExperience,
        deleteExperience,
        updateExperience,
        addCertificate,
        deleteCertificate,
        updateCertificate,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export default PortfolioProvider
