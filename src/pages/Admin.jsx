import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import PortfolioContext from "../context/PortfolioContext"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { 
  FaUser, FaTools, FaFolderOpen, FaBriefcase, FaAward, 
  FaPlus, FaTrash, FaSave, FaSignOutAlt, FaUpload, FaSpinner, FaImage 
} from "react-icons/fa"
import { uploadPhoto } from "../utils/supabase"

const Admin = () => {
  const { 
    data, 
    updateProfile, 
    addSkill, 
    deleteSkill, 
    addProject, 
    deleteProject, 
    addExperience, 
    deleteExperience, 
    addCertificate, 
    deleteCertificate,
    logout 
  } = useContext(PortfolioContext)

  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("profile")

  // --- Local states for form inputs ---
  // Profile
  const [profileForm, setProfileForm] = useState({
    name: data.profile?.name || "",
    role: data.profile?.role || "",
    email: data.profile?.email || "",
    bio: data.profile?.bio || "",
    photoUrl: data.profile?.photoUrl || ""
  })
  const [profileSavedMsg, setProfileSavedMsg] = useState(false)
  const [profileUploading, setProfileUploading] = useState(false)
  const [profileError, setProfileError] = useState("")

  // Skill
  const [newSkill, setNewSkill] = useState("")

  // Project
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    tech: "",
    link: "",
    imageUrl: ""
  })
  const [projectUploading, setProjectUploading] = useState(false)
  const [projectError, setProjectError] = useState("")

  // Experience
  const [newExperience, setNewExperience] = useState({
    title: "",
    place: "",
    year: "",
    description: ""
  })

  // Certificate
  const [newCertificate, setNewCertificate] = useState({
    title: "",
    issuer: "",
    year: "",
    link: ""
  })

  // --- Submit handlers ---
  const handleProfileSave = (e) => {
    e.preventDefault()
    updateProfile(profileForm)
    setProfileSavedMsg(true)
    setTimeout(() => setProfileSavedMsg(false), 3000)
  }

  const handleAddSkill = (e) => {
    e.preventDefault()
    if (!newSkill.trim()) return
    addSkill(newSkill)
    setNewSkill("")
  }

  const handleProfilePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    try {
      setProfileUploading(true)
      setProfileError("")
      const publicUrl = await uploadPhoto(file)
      setProfileForm(prev => ({ ...prev, photoUrl: publicUrl }))
    } catch (err) {
      console.error(err)
      setProfileError(err.message || "Failed to upload image")
    } finally {
      setProfileUploading(false)
    }
  }

  const handleProjectPhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    try {
      setProjectUploading(true)
      setProjectError("")
      const publicUrl = await uploadPhoto(file)
      setNewProject(prev => ({ ...prev, imageUrl: publicUrl }))
    } catch (err) {
      console.error(err)
      setProjectError(err.message || "Failed to upload image")
    } finally {
      setProjectUploading(false)
    }
  }

  const handleAddProject = (e) => {
    e.preventDefault()
    if (!newProject.title.trim()) return
    addProject(newProject)
    setNewProject({ title: "", description: "", tech: "", link: "", imageUrl: "" })
  }

  const handleAddExperience = (e) => {
    e.preventDefault()
    if (!newExperience.title.trim()) return
    addExperience(newExperience)
    setNewExperience({ title: "", place: "", year: "", description: "" })
  }

  const handleAddCertificate = (e) => {
    e.preventDefault()
    if (!newCertificate.title.trim()) return
    addCertificate(newCertificate)
    setNewCertificate({ title: "", issuer: "", year: "", link: "" })
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="admin-container">
      <Navbar />
      
      <div className="container" style={{ minHeight: "80vh", paddingBottom: "50px" }}>
        
        {/* Admin Header */}
        <div className="admin-header-bar">
          <div className="admin-title-area">
            <h1>Admin Dashboard</h1>
            <p>Manage your entire dynamic portfolio data</p>
          </div>
          <button onClick={handleLogout} className="btn-danger">
            <FaSignOutAlt /> Log Out
          </button>
        </div>

        {/* Dashboard Layout */}
        <div className="admin-layout">
          
          {/* Sidebar Tabs */}
          <div className="admin-sidebar glass-card" style={{ padding: "20px" }}>
            <button 
              onClick={() => setActiveTab("profile")}
              className={`admin-tab-btn ${activeTab === "profile" ? "active" : ""}`}
            >
              <FaUser /> Profile
            </button>
            <button 
              onClick={() => setActiveTab("skills")}
              className={`admin-tab-btn ${activeTab === "skills" ? "active" : ""}`}
            >
              <FaTools /> Skills
            </button>
            <button 
              onClick={() => setActiveTab("projects")}
              className={`admin-tab-btn ${activeTab === "projects" ? "active" : ""}`}
            >
              <FaFolderOpen /> Projects
            </button>
            <button 
              onClick={() => setActiveTab("experiences")}
              className={`admin-tab-btn ${activeTab === "experiences" ? "active" : ""}`}
            >
              <FaBriefcase /> Experience
            </button>
            <button 
              onClick={() => setActiveTab("certificates")}
              className={`admin-tab-btn ${activeTab === "certificates" ? "active" : ""}`}
            >
              <FaAward /> Certificates
            </button>
          </div>

          {/* Main Workspace Content Area */}
          <div className="admin-content-area glass-card">
            
            {/* TAB: PROFILE */}
            {activeTab === "profile" && (
              <div>
                <div className="admin-content-header">
                  <h2>Manage Profile Data</h2>
                </div>
                {profileSavedMsg && (
                  <div className="error-message" style={{ background: "rgba(16, 185, 129, 0.1)", borderColor: "rgba(16, 185, 129, 0.2)", color: "var(--color-success)" }}>
                    Profile data updated successfully!
                  </div>
                )}
                <form onSubmit={handleProfileSave} className="admin-form">
                  <div className="form-group" style={{ marginBottom: "25px" }}>
                    <label>Profile Picture</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                      <div className="admin-avatar-preview" style={{ 
                        width: "80px", 
                        height: "80px", 
                        borderRadius: "50%", 
                        border: "2px solid rgba(244, 63, 94, 0.3)", 
                        overflow: "hidden",
                        background: "rgba(0, 0, 0, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        {profileForm.photoUrl ? (
                          <img src={profileForm.photoUrl} alt="Avatar Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ color: "var(--text-muted)", fontSize: "2rem" }}><FaUser /></div>
                        )}
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <input 
                          type="file" 
                          accept="image/*" 
                          id="profile-pic-file"
                          onChange={handleProfilePhotoUpload}
                          style={{ display: "none" }}
                        />
                        <label htmlFor="profile-pic-file" className="btn-secondary" style={{ cursor: "pointer", display: "inline-flex", width: "auto", margin: 0, padding: "8px 16px", fontSize: "0.85rem" }}>
                          {profileUploading ? <><FaSpinner className="spin" /> Uploading...</> : <><FaUpload /> Choose Photo</>}
                        </label>
                        {profileError && (
                          <p style={{ color: "var(--color-danger)", fontSize: "0.8rem", marginTop: "5px" }}>{profileError}</p>
                        )}
                        <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "5px" }}>
                          Recommended square image. Max size 2MB.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="admin-name">Full Name</label>
                    <input 
                      type="text" 
                      id="admin-name"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="admin-role">Academic Status / Role</label>
                    <input 
                      type="text" 
                      id="admin-role"
                      value={profileForm.role}
                      onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="admin-email">Email Address</label>
                    <input 
                      type="email" 
                      id="admin-email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="admin-bio">Short Biography / Description</label>
                    <textarea 
                      id="admin-bio"
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-primary" style={{ marginTop: "10px" }}>
                    <FaSave /> Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* TAB: SKILLS */}
            {activeTab === "skills" && (
              <div>
                <div className="admin-content-header">
                  <h2>Manage Skills &amp; Expertise</h2>
                </div>
                <form onSubmit={handleAddSkill} className="admin-form" style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "flex-end" }}>
                  <div className="form-group" style={{ flexGrow: 1, marginBottom: 0 }}>
                    <label htmlFor="admin-skill-name">Add New Skill</label>
                    <input 
                      type="text" 
                      id="admin-skill-name"
                      placeholder="e.g. React.js, Python, Git..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ height: "45px" }}>
                    <FaPlus /> Add
                  </button>
                </form>

                <div className="admin-list-section">
                  <h3>Current Skill List</h3>
                  {(!data.skills || data.skills.length === 0) ? (
                    <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>No skills added yet.</p>
                  ) : (
                    <div className="admin-table-list">
                      {data.skills.map((skill) => (
                        <div key={skill.id} className="admin-table-item">
                          <div className="admin-table-item-info">
                            <h4>{skill.name}</h4>
                          </div>
                          <button onClick={() => deleteSkill(skill.id)} className="btn-danger">
                            <FaTrash /> Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: PROJECTS */}
            {activeTab === "projects" && (
              <div>
                <div className="admin-content-header">
                  <h2>Manage Projects</h2>
                </div>
                <form onSubmit={handleAddProject} className="admin-form">
                  <div className="form-group">
                    <label htmlFor="project-title">Project Title</label>
                    <input 
                      type="text" 
                      id="project-title"
                      placeholder="Your project name..."
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="project-desc">Description</label>
                    <textarea 
                      id="project-desc"
                      placeholder="Short project explanation..."
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="project-tech">Technologies (comma separated)</label>
                      <input 
                        type="text" 
                        id="project-tech"
                        placeholder="e.g. React, CSS, Node.js"
                        value={newProject.tech}
                        onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="project-link">Demo Link / Repo URL</label>
                      <input 
                        type="text" 
                        id="project-link"
                        placeholder="github.com/username/project"
                        value={newProject.link}
                        onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Project Screenshot / Image (Optional)</label>
                    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                      <div className="admin-project-preview" style={{
                        width: "120px",
                        height: "70px",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid rgba(244, 63, 94, 0.2)",
                        overflow: "hidden",
                        background: "rgba(0, 0, 0, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        {newProject.imageUrl ? (
                          <img src={newProject.imageUrl} alt="Project Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ color: "var(--text-muted)", fontSize: "1.5rem" }}><FaImage /></div>
                        )}
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <input 
                          type="file" 
                          accept="image/*" 
                          id="project-img-file"
                          onChange={handleProjectPhotoUpload}
                          style={{ display: "none" }}
                        />
                        <label htmlFor="project-img-file" className="btn-secondary" style={{ cursor: "pointer", display: "inline-flex", width: "auto", margin: 0, padding: "8px 16px", fontSize: "0.85rem" }}>
                          {projectUploading ? <><FaSpinner className="spin" /> Uploading...</> : <><FaUpload /> Upload Image</>}
                        </label>
                        {projectError && (
                          <p style={{ color: "var(--color-danger)", fontSize: "0.8rem", marginTop: "5px" }}>{projectError}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn-primary" style={{ marginTop: "10px" }}>
                    <FaPlus /> Add Project
                  </button>
                </form>

                <div className="admin-list-section">
                  <h3>Current Projects List</h3>
                  {(!data.projects || data.projects.length === 0) ? (
                    <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>No projects added yet.</p>
                  ) : (
                    <div className="admin-table-list">
                      {data.projects.map((proj) => (
                        <div key={proj.id} className="admin-table-item" style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                          {proj.imageUrl && (
                            <img src={proj.imageUrl} alt={proj.title} style={{ width: "50px", height: "35px", objectFit: "cover", borderRadius: "4px" }} />
                          )}
                          <div className="admin-table-item-info" style={{ flexGrow: 1 }}>
                            <h4>{proj.title}</h4>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{proj.tech || "No technologies listed"}</p>
                          </div>
                          <button onClick={() => deleteProject(proj.id)} className="btn-danger">
                            <FaTrash /> Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: EXPERIENCES */}
            {activeTab === "experiences" && (
              <div>
                <div className="admin-content-header">
                  <h2>Manage Experience</h2>
                </div>
                <form onSubmit={handleAddExperience} className="admin-form">
                  <div className="form-group">
                    <label htmlFor="exp-title">Role / Title</label>
                    <input 
                      type="text" 
                      id="exp-title"
                      placeholder="e.g. Student Association President, Teaching Assistant, Web Developer Intern..."
                      value={newExperience.title}
                      onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="exp-place">Organization / Institution / Company</label>
                      <input 
                        type="text" 
                        id="exp-place"
                        placeholder="e.g. Universitas Gadjah Mada, PT Tokopedia..."
                        value={newExperience.place}
                        onChange={(e) => setNewExperience({ ...newExperience, place: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exp-year">Year</label>
                      <input 
                        type="text" 
                        id="exp-year"
                        placeholder="e.g. 2024 - Present, 2023..."
                        value={newExperience.year}
                        onChange={(e) => setNewExperience({ ...newExperience, year: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exp-desc">Description of Responsibilities / Achievements</label>
                    <textarea 
                      id="exp-desc"
                      placeholder="Describe your responsibilities or contributions here..."
                      value={newExperience.description}
                      onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-primary" style={{ marginTop: "10px" }}>
                    <FaPlus /> Add Experience
                  </button>
                </form>

                <div className="admin-list-section">
                  <h3>Current Experience History</h3>
                  {(!data.experiences || data.experiences.length === 0) ? (
                    <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>No experience history added yet.</p>
                  ) : (
                    <div className="admin-table-list">
                      {data.experiences.map((exp) => (
                        <div key={exp.id} className="admin-table-item">
                          <div className="admin-table-item-info">
                            <h4>{exp.title}</h4>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{exp.place} ({exp.year})</p>
                          </div>
                          <button onClick={() => deleteExperience(exp.id)} className="btn-danger">
                            <FaTrash /> Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: CERTIFICATES */}
            {activeTab === "certificates" && (
              <div>
                <div className="admin-content-header">
                  <h2>Manage Certificates</h2>
                </div>
                <form onSubmit={handleAddCertificate} className="admin-form">
                  <div className="form-group">
                    <label htmlFor="cert-title">Certificate Name</label>
                    <input 
                      type="text" 
                      id="cert-title"
                      placeholder="Certificate title or achievement..."
                      value={newCertificate.title}
                      onChange={(e) => setNewCertificate({ ...newCertificate, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="cert-issuer">Issuer</label>
                      <input 
                        type="text" 
                        id="cert-issuer"
                        placeholder="e.g. Coursera, Google, Dicoding..."
                        value={newCertificate.issuer}
                        onChange={(e) => setNewCertificate({ ...newCertificate, issuer: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cert-year">Year Obtained</label>
                      <input 
                        type="text" 
                        id="cert-year"
                        placeholder="e.g. 2024"
                        value={newCertificate.year}
                        onChange={(e) => setNewCertificate({ ...newCertificate, year: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cert-link">Credential URL / Certificate Link</label>
                    <input 
                      type="text" 
                      id="cert-link"
                      placeholder="https://coursera.org/verify/..."
                      value={newCertificate.link}
                      onChange={(e) => setNewCertificate({ ...newCertificate, link: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ marginTop: "10px" }}>
                    <FaPlus /> Add Certificate
                  </button>
                </form>

                <div className="admin-list-section">
                  <h3>Current Certificates List</h3>
                  {(!data.certificates || data.certificates.length === 0) ? (
                    <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>No certificates added yet.</p>
                  ) : (
                    <div className="admin-table-list">
                      {data.certificates.map((cert) => (
                        <div key={cert.id} className="admin-table-item">
                          <div className="admin-table-item-info">
                            <h4>{cert.title}</h4>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Issuer: {cert.issuer} ({cert.year})</p>
                          </div>
                          <button onClick={() => deleteCertificate(cert.id)} className="btn-danger">
                            <FaTrash /> Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      <Footer />
    </div>
  )
}

export default Admin
