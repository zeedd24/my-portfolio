import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jsyvbhpemxjyytbqaokq.supabase.co'
const supabaseAnonKey = 'sb_publishable_Nt_Qbe1itRbk83gMNDX08A_AkoHHyAl'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function test() {
  try {
    console.log('Mencoba mengunggah file dummy ke bucket portfolio-photos...')
    const fileBody = 'Hello World!'
    const fileName = `test-${Date.now()}.txt`
    
    const { data, error } = await supabase.storage
      .from('portfolio-photos')
      .upload(fileName, fileBody, {
        contentType: 'text/plain'
      })
    
    if (error) {
      console.error('Gagal mengunggah file:', error.message)
      console.error('Detail Error:', error)
    } else {
      console.log('Sukses! File berhasil diunggah:', data)
      const { data: urlData } = supabase.storage
        .from('portfolio-photos')
        .getPublicUrl(fileName)
      console.log('Public URL file:', urlData.publicUrl)
    }
  } catch (e) {
    console.error('Terjadi kesalahan fatal:', e.message)
  }
}

test()
