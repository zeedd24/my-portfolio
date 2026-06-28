import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

const TABLE = "portfolio_data"
const ROW_ID = 1

// ─── Portfolio Data ────────────────────────────────────────────────

/**
 * Fetch portfolio data from Supabase.
 * Returns null if Supabase is not configured or fetch fails.
 */
export const fetchPortfolioData = async () => {
  if (!supabase) return null

  const { data, error } = await supabase
    .from(TABLE)
    .select("profile, skills, projects, experiences, certificates")
    .eq("id", ROW_ID)
    .single()

  if (error) {
    console.error("Failed to fetch portfolio data:", error.message)
    return null
  }

  return data
}

/**
 * Save portfolio data to Supabase.
 * Only saves the fields we manage — not admin_password.
 */
export const savePortfolioData = async (data) => {
  if (!supabase) return false

  const { error } = await supabase
    .from(TABLE)
    .update({
      profile: data.profile,
      skills: data.skills,
      projects: data.projects,
      experiences: data.experiences,
      certificates: data.certificates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", ROW_ID)

  if (error) {
    console.error("Failed to save portfolio data:", error.message)
    return false
  }

  return true
}

// ─── Password ──────────────────────────────────────────────────────

/**
 * Fetch stored admin password from Supabase.
 */
export const fetchAdminPassword = async () => {
  if (!supabase) return null

  const { data, error } = await supabase
    .from(TABLE)
    .select("admin_password")
    .eq("id", ROW_ID)
    .single()

  if (error) {
    console.error("Failed to fetch password:", error.message)
    return null
  }

  return data?.admin_password || null
}

/**
 * Update admin password in Supabase.
 */
export const updateAdminPassword = async (newPassword) => {
  if (!supabase) return false

  const { error } = await supabase
    .from(TABLE)
    .update({ admin_password: newPassword })
    .eq("id", ROW_ID)

  if (error) {
    console.error("Failed to update password:", error.message)
    return false
  }

  return true
}

// ─── Photo Upload ──────────────────────────────────────────────────

/**
 * Uploads a file to Supabase Storage and returns its public URL.
 */
export const uploadPhoto = async (file, bucketName = "portfolio-photos") => {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Please define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file."
    )
  }

  const fileExt = file.name.split(".").pop()
  const randomStr = Math.random().toString(36).substring(2, 15)
  const fileName = `${Date.now()}-${randomStr}.${fileExt}`

  const { error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file, { cacheControl: "3600", upsert: false })

  if (error) throw error

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName).getPublicUrl(fileName)

  return publicUrl
}
