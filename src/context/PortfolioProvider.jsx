import { useEffect, useState, useCallback, useRef } from "react"
import PortfolioContext from "./PortfolioContext"
import portfolioData from "../data/portfolio"
import { migrateSkills } from "../data/skillCatalog"
import {
  fetchPortfolioData,
  savePortfolioData,
  fetchAdminPassword,
  updateAdminPassword,
} from "../utils/supabase"

// ─── LocalStorage cache (fallback when Supabase is unreachable) ────
const LS_KEY = "portfolio_data"
const LS_PWD_KEY = "admin_password"
const DEFAULT_PASSWORD = "admin123"

const readCache = () => {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const writeCache = (data) => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data))
  } catch {}
}

const mergeWithDefaults = (stored) => {
  // stored.profile bisa {} (kosong dari Supabase) — pastikan field default tetap terisi
  const profileFromDb = stored?.profile || {}
  const hasRealProfile = profileFromDb.name || profileFromDb.email

  return {
    ...portfolioData,
    ...stored,
    profile: hasRealProfile
      ? { ...portfolioData.profile, ...profileFromDb }
      : portfolioData.profile,
    skills: stored?.skills?.length ? stored.skills : portfolioData.skills,
    projects: stored?.projects || portfolioData.projects,
    experiences: stored?.experiences || portfolioData.experiences,
    certificates: stored?.certificates || portfolioData.certificates,
  }
}

// ─── Provider ─────────────────────────────────────────────────────
const PortfolioProvider = ({ children }) => {
  // Initialise from cache so the UI renders immediately
  const [data, setData] = useState(() => {
    const cached = readCache()
    const initial = cached ? mergeWithDefaults(cached) : portfolioData
    return { ...initial, skills: migrateSkills(initial.skills) }
  })

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem("admin_is_logged_in") === "true"
  )

  // Supabase status
  const [dbLoading, setDbLoading] = useState(true)
  const [dbError, setDbError] = useState(false)

  // Password kept in memory (loaded from Supabase on mount)
  const passwordRef = useRef(
    localStorage.getItem(LS_PWD_KEY) || DEFAULT_PASSWORD
  )

  // ── Load from Supabase on mount ──────────────────────────────────
  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setDbLoading(true)

      // Load portfolio data
      const remote = await fetchPortfolioData()
      if (!cancelled && remote) {
        const merged = mergeWithDefaults(remote)
        const finalData = { ...merged, skills: migrateSkills(merged.skills) }
        setData(finalData)
        writeCache(finalData)
        setDbError(false)
      } else if (!cancelled) {
        setDbError(true)
      }

      // Load password
      const pwd = await fetchAdminPassword()
      if (!cancelled && pwd) {
        passwordRef.current = pwd
        localStorage.setItem(LS_PWD_KEY, pwd)
      }

      if (!cancelled) setDbLoading(false)
    }

    load()
    return () => { cancelled = true }
  }, [])

  // ── Save to Supabase whenever data changes ───────────────────────
  const saveTimer = useRef(null)

  useEffect(() => {
    // Debounce saves by 800ms to batch rapid changes
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      writeCache(data)           // always update local cache
      await savePortfolioData(data)
    }, 800)

    return () => clearTimeout(saveTimer.current)
  }, [data])

  // ── Helpers ──────────────────────────────────────────────────────
  const setDataField = useCallback((field, updater) => {
    setData((prev) => ({ ...prev, [field]: updater(prev[field]) }))
  }, [])

  // ── Auth ─────────────────────────────────────────────────────────
  const login = (password) => {
    if (password === passwordRef.current) {
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

  const changePassword = async (currentPassword, newPassword) => {
    if (currentPassword !== passwordRef.current) {
      return { success: false, message: "Current password is incorrect." }
    }
    if (newPassword.length < 6) {
      return { success: false, message: "New password must be at least 6 characters." }
    }

    const ok = await updateAdminPassword(newPassword)
    if (!ok) {
      return { success: false, message: "Failed to update password. Check Supabase connection." }
    }

    passwordRef.current = newPassword
    localStorage.setItem(LS_PWD_KEY, newPassword)
    return { success: true, message: "Password changed successfully!" }
  }

  // ── Portfolio CRUD ────────────────────────────────────────────────
  const updateProfile = (profileData) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...profileData },
    }))
  }

  const toggleSkill = (skillId) => {
    setData((prev) => {
      const current = migrateSkills(prev.skills)
      const isSelected = current.includes(skillId)
      return {
        ...prev,
        skills: isSelected
          ? current.filter((id) => id !== skillId)
          : [...current, skillId],
      }
    })
  }

  const addProject = (project) => {
    setDataField("projects", (prev) => [
      ...(prev || []),
      { id: Date.now(), ...project },
    ])
  }

  const deleteProject = (id) => {
    setDataField("projects", (prev) =>
      (prev || []).filter((p) => p.id !== id)
    )
  }

  const updateProject = (id, project) => {
    setDataField("projects", (prev) =>
      (prev || []).map((p) => (p.id === id ? { ...p, ...project } : p))
    )
  }

  const addExperience = (experience) => {
    setDataField("experiences", (prev) => [
      ...(prev || []),
      { id: Date.now(), ...experience },
    ])
  }

  const deleteExperience = (id) => {
    setDataField("experiences", (prev) =>
      (prev || []).filter((e) => e.id !== id)
    )
  }

  const updateExperience = (id, experience) => {
    setDataField("experiences", (prev) =>
      (prev || []).map((e) => (e.id === id ? { ...e, ...experience } : e))
    )
  }

  const addCertificate = (certificate) => {
    setDataField("certificates", (prev) => [
      ...(prev || []),
      { id: Date.now(), ...certificate },
    ])
  }

  const deleteCertificate = (id) => {
    setDataField("certificates", (prev) =>
      (prev || []).filter((c) => c.id !== id)
    )
  }

  const updateCertificate = (id, certificate) => {
    setDataField("certificates", (prev) =>
      (prev || []).map((c) => (c.id === id ? { ...c, ...certificate } : c))
    )
  }

  return (
    <PortfolioContext.Provider
      value={{
        data,
        dbLoading,
        dbError,
        isLoggedIn,
        login,
        logout,
        changePassword,
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
