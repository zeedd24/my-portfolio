import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PortfolioContext from "../context/PortfolioContext"

const Login = () => {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { isLoggedIn, login } = useContext(PortfolioContext)
  const navigate = useNavigate()

  useEffect(() => {
    // If already logged in, go straight to admin
    if (isLoggedIn) {
      navigate("/admin", { replace: true })
    }
  }, [isLoggedIn, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = login(password)
    if (success) {
      navigate("/admin")
    } else {
      setError("Incorrect password! Please try again.")
      setPassword("")
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Admin Login</h2>
          <p>Enter your password to access the admin dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
        <div className="login-footer">
          <button onClick={() => navigate("/")} className="btn-text">
            &larr; Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
