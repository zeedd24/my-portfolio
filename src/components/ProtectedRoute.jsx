import { useContext } from "react"
import { Navigate } from "react-router-dom"
import PortfolioContext from "../context/PortfolioContext"

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(PortfolioContext)

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
