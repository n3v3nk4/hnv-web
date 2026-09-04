import { createClient } from '@supabase/supabase-js'

// Usar variables de entorno con fallback para Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://obgpnlntlsjnrdvqcynq.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_nTj3WIPz2KAFfenTteKzOA_tfvoqxvv'

// ⚠️ IMPORTANTE: En Vercel, estas variables deben estar configuradas en Environment Variables
// Si no están configuradas, el build fallará. Usamos un fallback para evitar el error.

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
