import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Función para subir imágenes a Storage
export const uploadImage = async (file: File, titulo: string) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${titulo.replace(/\s+/g, '-')}.${fileExt}`
  const filePath = `galeria/${fileName}`

  const { data, error } = await supabase.storage
    .from('galeria')
    .upload(filePath, file)

  if (error) throw error

  const { data: urlData } = supabase.storage
    .from('galeria')
    .getPublicUrl(filePath)

  return urlData.publicUrl
}