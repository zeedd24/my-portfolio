import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PortfolioContext from "../context/PortfolioContext"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { 
  FaUser, FaTools, FaFolderOpen, FaBriefcase, FaAward, 
  FaPlus, FaTrash, FaSave, FaSignOutAlt, FaUpload, FaSpinner, FaImage, FaEdit, FaTimes,
  FaLock, FaEye, FaEyeSlash
} from "react-icons/fa"
import { uploadPhoto } from "../utils/supabase"
import { SKILL_CATEGORIES, getSkillsByCategory, resolveSelectedSkills, migrateSkills } from "../data/skillCatalog"
import SkillIcon from "../components/Skills/SkillIcon"

const Admin = () => {
  const { 
    data, 
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
    changePassword,
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
    phone: data.profile?.phone || "",
    location: data.profile?.location || "",
    bio: data.profile?.bio || "",
    photoUrl: data.profile?.photoUrl || "",
    github: data.profile?.github || "",
    linkedin: data.profile?.linkedin || "",
    instagram: data.profile?.instagram || ""
  })
  const [profileSavedMsg, setProfileSavedMsg] = useState(false)
  const [profileUploading, setProfileUploading] = useState(false)
  const [profileError, setProfileError] = useState("")

  // Project
  const emptyProject = { title: "", description: "", tech: "", link: "", imageUrl: "" }
  const [projectForm, setProjectForm] = useState(emptyProject)
  const [editingProjectId, setEditingProjectId] = useState(null)
  const [projectUploading, setProjectUploading] = useState(false)
  const [projectError, setProjectError] = useState("")

  // Experience
  const emptyExperience = { title: "", place: "", year: "", description: "" }
  const [experienceForm, setExperienceForm] = useState(emptyExperience)
  const [editingExperienceId, setEditingExperienceId] = useState(null)

  // Certificate
  const emptyCertificate = { title: "", issuer: "", year: "", link: "" }
  const [certificateForm, setCertificateForm] = useState(emptyCertificate)
  const [editingCertificateId, setEditingCertificateId] = useState(null)

  // Security / Change Password
  const [passwordForm, setPasswordForm] = useState({ current: "", newPass: "", confirm: "" })
  const [passwordMsg, setPasswordMsg] = useState({ text: "", success: false })
  const [showPasswords, setShowPasswords] = useState({ current: false, newPass: false, confirm: false })

  // --- Submit handlers ---
  const handleProfileSave = (e) => {
    e.preventDefault()
    updateProfile(profileForm)
    setProfileSavedMsg(true)
    setTimeout(() => setProfileSavedMsg(false), 3000)
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
      setProjectForm(prev => ({ ...prev, imageUrl: publicUrl }))
    } catch (err) {
      console.error(err)
      setProjectError(err.message || "Failed to upload image")
    } finally {
      setProjectUploading(false)
    }
  }

  const resetProjectForm = () => {
    setProjectForm(emptyProject)
    setEditingProjectId(null)
    setProjectError("")
  }

  const startEditProject = (project) => {
    setProjectForm({
      title: project.title || "",
      description: project.description || "",
      tech: project.tech || "",
      link: project.link || "",
      imageUrl: project.imageUrl || ""
    })
    setEditingProjectId(project.id)
    setProjectError("")
  }

  const handleProjectSubmit = (e) => {
    e.preventDefault()
    if (!projectForm.title.trim()) return
    if (editingProjectId) {
      updateProject(editingProjectId, projectForm)
    } else {
      addProject(projectForm)
    }
    resetProjectForm()
  }

  const resetExperienceForm = () => {
    setExperienceForm(emptyExperience)
    setEditingExperienceId(null)
  }

  const startEditExperience = (experience) => {
    setExperienceForm({
      title: experience.title || "",
      place: experience.place || "",
      year: experience.year || "",
      description: experience.description || ""
    })
    setEditingExperienceId(experience.id)
  }

  const handleExperienceSubmit = (e) => {
    e.preventDefault()
    if (!experienceForm.title.trim()) return
    if (editingExperienceId) {
      updateExperience(editingExperienceId, experienceForm)
    } else {
      addExperience(experienceForm)
    }
    resetExperienceForm()
  }

  const resetCertificateForm = () => {
    setCertificateForm(emptyCertificate)
    setEditingCertificateId(null)
  }

  const startEditCertificate = (certificate) => {
    setCertificateForm({
      title: certificate.title || "",
      issuer: certificate.issuer || "",
      year: certificate.year || "",
      link: certificate.link || ""
    })
    setEditingCertificateId(certificate.id)
  }

  const handleCertificateSubmit = (e) => {
    e.preventDefault()
    if (!certificateForm.title.trim()) return
    if (editingCertificateId) {
      updateCertificate(editingCertificateId, certificateForm)
    } else {
      addCertificate(certificateForm)
    }
    resetCertificateForm()
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (passwordForm.newPass !== passwordForm.confirm) {
      setPasswordMsg({ text: "New passwords do not match.", success: false })
      return
    }
    const result = await changePassword(passwordForm.current, passwordForm.newPass)
    setPasswordMsg({ text: result.message, success: result.success })
    if (result.success) {
      setPasswordForm({ current: "", newPass: "", confirm: "" })
      setTimeout(() => setPasswordMsg({ text: "", success: false }), 4000)
    }
  }

  useEffect(() => {
    setProjectForm(emptyProject)
    setEditingProjectId(null)
    setProjectError("")
    setExperienceForm(emptyExperience)
    setEditingExperienceId(null)
    setCertificateForm(emptyCertificate)
    setEditingCertificateId(null)
  }, [activeTab])

  const selectedSkills = resolveSelectedSkills(data.skills)
  const selectedSkillIds = migrateSkills(data.skills)

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
            <button 
              onClick={() => setActiveTab("security")}
              className={`admin-tab-btn ${activeTab === "security" ? "active" : ""}`}
            >
              <FaLock /> Security
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
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="admin-phone">Phone / WhatsApp</label>
                      <input 
                        type="text" 
                        id="admin-phone"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        placeholder="+62 812-xxxx-xxxx"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="admin-location">Location</label>
                      <input 
                        type="text" 
                        id="admin-location"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        placeholder="City, Country"
                      />
                    </div>
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
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="admin-github">GitHub URL</label>
                      <input 
                        type="url" 
                        id="admin-github"
                        value={profileForm.github}
                        onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                        placeholder="https://github.com/username"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="admin-linkedin">LinkedIn URL</label>
                      <input 
                        type="url" 
                        id="admin-linkedin"
                        value={profileForm.linkedin}
                        onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="admin-instagram">Instagram URL</label>
                    <input 
                      type="url" 
                      id="admin-instagram"
                      value={profileForm.instagram}
                      onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })}
                      placeholder="https://instagram.com/username"
                    />
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
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "8px" }}>
                    Pilih skill dari daftar di bawah. Icon akan tampil dengan warna brand asli di website.
                  </p>
                </div>

                <div className="skill-picker">
                  {SKILL_CATEGORIES.map((category) => {
                    const categorySkills = getSkillsByCategory(category)
                    if (categorySkills.length === 0) return null

                    return (
                      <div key={category} className="skill-picker-category">
                        <h3>{category}</h3>
                        <div className="skill-picker-grid">
                          {categorySkills.map((skill) => {
                            const isSelected = selectedSkillIds.includes(skill.id)

                            return (
                              <label
                                key={skill.id}
                                className={`skill-picker-item glass-card ${isSelected ? "selected" : ""}`}
                              >
                                <input
                                  type="checkbox"
                                  checked={Boolean(isSelected)}
                                  onChange={() => toggleSkill(skill.id)}
                                />
                                <SkillIcon skillId={skill.id} size="1.5rem" />
                                <span>{skill.name}</span>
                              </label>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="admin-list-section">
                  <h3>Selected Skills ({selectedSkills.length})</h3>
                  {selectedSkills.length === 0 ? (
                    <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>Belum ada skill yang dipilih.</p>
                  ) : (
                    <div className="skill-selected-list">
                      {selectedSkills.map((skill) => (
                        <div key={skill.id} className="skill-selected-chip">
                          <SkillIcon skillId={skill.id} size="1.2rem" />
                          <span>{skill.name}</span>
                          <button
                            type="button"
                            onClick={() => toggleSkill(skill.id)}
                            className="skill-selected-remove"
                            title={`Remove ${skill.name}`}
                          >
                            <FaTimes />
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
                <form onSubmit={handleProjectSubmit} className="admin-form">
                  {editingProjectId && (
                    <div className="error-message" style={{ background: "rgba(244, 63, 94, 0.1)", borderColor: "rgba(244, 63, 94, 0.2)", color: "var(--color-accent)" }}>
                      Editing project — make changes and click Save Changes, or Cancel to discard.
                    </div>
                  )}
                  <div className="form-group">
                    <label htmlFor="project-title">Project Title</label>
                    <input 
                      type="text" 
                      id="project-title"
                      placeholder="Your project name..."
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="project-desc">Description</label>
                    <textarea 
                      id="project-desc"
                      placeholder="Short project explanation..."
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
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
                        value={projectForm.tech}
                        onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="project-link">Demo Link / Repo URL</label>
                      <input 
                        type="text" 
                        id="project-link"
                        placeholder="github.com/username/project"
                        value={projectForm.link}
                        onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
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
                        {projectForm.imageUrl ? (
                          <img src={projectForm.imageUrl} alt="Project Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
                  <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button type="submit" className="btn-primary">
                      {editingProjectId ? <><FaSave /> Save Changes</> : <><FaPlus /> Add Project</>}
                    </button>
                    {editingProjectId && (
                      <button type="button" onClick={resetProjectForm} className="btn-secondary">
                        <FaTimes /> Cancel
                      </button>
                    )}
                  </div>
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
                          <div className="admin-table-actions">
                            <button onClick={() => startEditProject(proj)} className="btn-secondary" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
                              <FaEdit /> Edit
                            </button>
                            <button onClick={() => deleteProject(proj.id)} className="btn-danger">
                              <FaTrash /> Delete
                            </button>
                          </div>
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
                <form onSubmit={handleExperienceSubmit} className="admin-form">
                  {editingExperienceId && (
                    <div className="error-message" style={{ background: "rgba(244, 63, 94, 0.1)", borderColor: "rgba(244, 63, 94, 0.2)", color: "var(--color-accent)" }}>
                      Editing experience — make changes and click Save Changes, or Cancel to discard.
                    </div>
                  )}
                  <div className="form-group">
                    <label htmlFor="exp-title">Role / Title</label>
                    <input 
                      type="text" 
                      id="exp-title"
                      placeholder="e.g. Student Association President, Teaching Assistant, Web Developer Intern..."
                      value={experienceForm.title}
                      onChange={(e) => setExperienceForm({ ...experienceForm, title: e.target.value })}
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
                        value={experienceForm.place}
                        onChange={(e) => setExperienceForm({ ...experienceForm, place: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exp-year">Year</label>
                      <input 
                        type="text" 
                        id="exp-year"
                        placeholder="e.g. 2024 - Present, 2023..."
                        value={experienceForm.year}
                        onChange={(e) => setExperienceForm({ ...experienceForm, year: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exp-desc">Description of Responsibilities / Achievements</label>
                    <textarea 
                      id="exp-desc"
                      placeholder="Describe your responsibilities or contributions here..."
                      value={experienceForm.description}
                      onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button type="submit" className="btn-primary">
                      {editingExperienceId ? <><FaSave /> Save Changes</> : <><FaPlus /> Add Experience</>}
                    </button>
                    {editingExperienceId && (
                      <button type="button" onClick={resetExperienceForm} className="btn-secondary">
                        <FaTimes /> Cancel
                      </button>
                    )}
                  </div>
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
                          <div className="admin-table-actions">
                            <button onClick={() => startEditExperience(exp)} className="btn-secondary" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
                              <FaEdit /> Edit
                            </button>
                            <button onClick={() => deleteExperience(exp.id)} className="btn-danger">
                              <FaTrash /> Delete
                            </button>
                          </div>
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
                <form onSubmit={handleCertificateSubmit} className="admin-form">
                  {editingCertificateId && (
                    <div className="error-message" style={{ background: "rgba(244, 63, 94, 0.1)", borderColor: "rgba(244, 63, 94, 0.2)", color: "var(--color-accent)" }}>
                      Editing certificate — make changes and click Save Changes, or Cancel to discard.
                    </div>
                  )}
                  <div className="form-group">
                    <label htmlFor="cert-title">Certificate Name</label>
                    <input 
                      type="text" 
                      id="cert-title"
                      placeholder="Certificate title or achievement..."
                      value={certificateForm.title}
                      onChange={(e) => setCertificateForm({ ...certificateForm, title: e.target.value })}
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
                        value={certificateForm.issuer}
                        onChange={(e) => setCertificateForm({ ...certificateForm, issuer: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cert-year">Year Obtained</label>
                      <input 
                        type="text" 
                        id="cert-year"
                        placeholder="e.g. 2024"
                        value={certificateForm.year}
                        onChange={(e) => setCertificateForm({ ...certificateForm, year: e.target.value })}
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
                      value={certificateForm.link}
                      onChange={(e) => setCertificateForm({ ...certificateForm, link: e.target.value })}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button type="submit" className="btn-primary">
                      {editingCertificateId ? <><FaSave /> Save Changes</> : <><FaPlus /> Add Certificate</>}
                    </button>
                    {editingCertificateId && (
                      <button type="button" onClick={resetCertificateForm} className="btn-secondary">
                        <FaTimes /> Cancel
                      </button>
                    )}
                  </div>
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
                          <div className="admin-table-actions">
                            <button onClick={() => startEditCertificate(cert)} className="btn-secondary" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
                              <FaEdit /> Edit
                            </button>
                            <button onClick={() => deleteCertificate(cert.id)} className="btn-danger">
                              <FaTrash /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: SECURITY */}
            {activeTab === "security" && (
              <div>
                <div className="admin-content-header">
                  <h2>Security Settings</h2>
                </div>

                <div className="glass-card" style={{ padding: "28px", maxWidth: "480px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "var(--radius-md)", background: "var(--primary-gradient)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1.1rem", flexShrink: 0 }}>
                      <FaLock />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.1rem", marginBottom: "2px" }}>Change Password</h3>
                      <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0 }}>Password tersimpan di browser ini</p>
                    </div>
                  </div>

                  {passwordMsg.text && (
                    <div className="error-message" style={{
                      background: passwordMsg.success ? "rgba(16, 185, 129, 0.1)" : "rgba(244, 63, 94, 0.1)",
                      borderColor: passwordMsg.success ? "rgba(16, 185, 129, 0.2)" : "rgba(244, 63, 94, 0.2)",
                      color: passwordMsg.success ? "var(--color-success)" : "var(--color-danger)"
                    }}>
                      {passwordMsg.text}
                    </div>
                  )}

                  <form onSubmit={handleChangePassword} className="admin-form">
                    {[
                      { id: "current", label: "Current Password", field: "current" },
                      { id: "newPass", label: "New Password", field: "newPass" },
                      { id: "confirm", label: "Confirm New Password", field: "confirm" },
                    ].map(({ id, label, field }) => (
                      <div className="form-group" key={id}>
                        <label htmlFor={`pwd-${id}`}>{label}</label>
                        <div style={{ position: "relative" }}>
                          <input
                            type={showPasswords[field] ? "text" : "password"}
                            id={`pwd-${id}`}
                            value={passwordForm[field]}
                            onChange={(e) => setPasswordForm({ ...passwordForm, [field]: e.target.value })}
                            placeholder={`Enter ${label.toLowerCase()}...`}
                            required
                            style={{ paddingRight: "44px" }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))}
                            style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}
                          >
                            {showPasswords[field] ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>
                    ))}
                    <button type="submit" className="btn-primary" style={{ marginTop: "10px" }}>
                      <FaSave /> Update Password
                    </button>
                  </form>

                  <div style={{ marginTop: "24px", padding: "16px", borderRadius: "var(--radius-md)", background: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.15)" }}>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                      ✅ Password tersimpan di Supabase — berlaku di semua perangkat dan tidak hilang meski browser di-clear.
                    </p>
                  </div>
                </div>

                <div className="glass-card" style={{ padding: "28px", maxWidth: "480px", marginTop: "24px" }}>
                  <h3 style={{ fontSize: "1rem", marginBottom: "12px" }}>Login URL</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", background: "rgba(0,0,0,0.2)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                    <code style={{ fontSize: "0.88rem", color: "var(--color-accent)", flex: 1, wordBreak: "break-all" }}>
                      {window.location.origin}/manage-2024
                    </code>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "10px" }}>
                    Bagikan URL ini hanya kepada diri sendiri. Jangan simpan di tempat yang bisa diakses orang lain.
                  </p>
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
