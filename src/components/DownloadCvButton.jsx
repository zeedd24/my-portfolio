import { useContext } from "react"
import { FaDownload } from "react-icons/fa"
import PortfolioContext from "../context/PortfolioContext"

const DownloadCvButton = ({ className = "btn-secondary", style = {} }) => {
  const { data } = useContext(PortfolioContext)
  const { profile } = data

  if (!profile?.cvUrl) return null

  const fileName =
    profile.cvFileName ||
    `CV-${(profile.name || "Resume").replace(/\s+/g, "-")}.pdf`

  const handleDownload = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(profile.cvUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch {
      // Fallback: open in new tab
      window.open(profile.cvUrl, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <a
      href={profile.cvUrl}
      onClick={handleDownload}
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: "8px", ...style }}
      aria-label="Download CV"
    >
      Download CV <FaDownload />
    </a>
  )
}

export default DownloadCvButton
