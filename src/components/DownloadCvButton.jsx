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

  return (
    <a
      href={profile.cvUrl}
      download={fileName}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
    >
      Download CV <FaDownload />
    </a>
  )
}

export default DownloadCvButton
