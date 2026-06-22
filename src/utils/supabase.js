import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Initialize the Supabase client safely
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null

/**
 * Uploads a file to Supabase Storage and returns its public URL.
 * 
 * @param {File} file - The file object to upload
 * @param {string} bucketName - Name of the Supabase storage bucket (default: "portfolio-photos")
 * @returns {Promise<string>} The public URL of the uploaded file
 */
export const uploadPhoto = async (file, bucketName = "portfolio-photos") => {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Please define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file."
    )
  }

  // Generate a unique filename: timestamp + random string + original extension
  const fileExt = file.name.split(".").pop()
  const randomStr = Math.random().toString(36).substring(2, 15)
  const fileName = `${Date.now()}-${randomStr}.${fileExt}`
  const filePath = `${fileName}`

  // Upload the file to the specified bucket
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false
    })

  if (error) {
    throw error
  }

  // Get the public URL of the uploaded file
  const { data: { publicUrl } } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath)

  return publicUrl
}
