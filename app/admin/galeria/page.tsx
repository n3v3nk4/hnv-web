'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

interface Imagen {
  id: string
  titulo: string
  descripcion: string | null
  imagen_url: string
  created_at: string
}

export default function AdminGaleria() {
  const [imagenes, setImagenes] = useState<Imagen[]>([])
  const [loading, setLoading] = useState(false)
  const [subiendo, setSubiendo] = useState(false)
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [archivo, setArchivo] = useState<File | null>(null)
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error', texto: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Verificación de sesión con sessionStorage
    const isAuth = sessionStorage.getItem('admin_auth')
    if (isAuth !== 'true') {
      router.push('/admin')
      return
    }
    cargarImagenes()
  }, [router])

  const cargarImagenes = async () => {
    setLoading(true)
    const { data } = await supabase.from('galeria').select('*').order('created_at', { ascending: false })
    setImagenes(data || [])
    setLoading(false)
  }

  const handleSubir = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!archivo || !titulo) {
      setMensaje({ tipo: 'error', texto: 'Debes seleccionar un archivo y poner un título.' })
      return
    }

    setSubiendo(true)
    setMensaje(null)

    try {
      const fileExt = archivo.name.split('.').pop()
      const fileName = `${Date.now()}-${titulo.replace(/\s+/g, '-')}.${fileExt}`
      const filePath = `galeria/${fileName}`

      const { error: uploadError } = await supabase.storage.from('galeria').upload(filePath, archivo)
      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage.from('galeria').getPublicUrl(filePath)

      const { error: dbError } = await supabase.from('galeria').insert([{ titulo, descripcion, imagen_url: urlData.publicUrl }])
      if (dbError) throw dbError

      setMensaje({ tipo: 'exito', texto: 'Archivo subido correctamente' })
      setTitulo('')
      setDescripcion('')
      setArchivo(null)
      const input = document.getElementById('archivo') as HTMLInputElement
      if (input) input.value = ''
      cargarImagenes()
    } catch (error: any) {
      setMensaje({ tipo: 'error', texto: `Error: ${error.message}` })
    }
    setSubiendo(false)
  }

  const handleEliminar = async (id: string, url: string) => {
    if (!confirm('¿Eliminar este archivo?')) return
    const path = url.split('/galeria/')[1]
    if (path) await supabase.storage.from('galeria').remove([`galeria/${path}`])
    await supabase.from('galeria').delete().eq('id', id)
    cargarImagenes()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Gestión de Galería</h1>
          <button onClick={() => router.push('/admin')} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition">
            ← Volver al panel
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-xl font-bold text-black mb-6">Subir nueva imagen o video</h2>
          {mensaje && (
            <div className={`p-4 rounded-lg mb-6 text-sm ${mensaje.tipo === 'exito' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubir} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Título *</label>
              <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ej: Taller de liderazgo" className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción (opcional)</label>
              <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Breve descripción..." rows={2} className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Archivo (Imagen o Video) *</label>
              <input id="archivo" type="file" accept="image/*,video/*" onChange={(e) => setArchivo(e.target.files?.[0] || null)} className="w-full p-2 border border-gray-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" required />
              {archivo && <p className="text-sm text-gray-500 mt-2">Archivo: {archivo.name}</p>}
            </div>
            <button type="submit" disabled={subiendo} className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition disabled:opacity-50">
              {subiendo ? 'Subiendo...' : 'Subir archivo'}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-bold text-black mb-6">Archivos actuales ({imagenes.length})</h2>
          {loading ? (
            <p className="text-gray-600">Cargando...</p>
          ) : imagenes.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center"><p className="text-gray-500">No hay archivos subidos aún.</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {imagenes.map((img) => (
                <div key={img.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="relative h-48 bg-black">
                    {img.imagen_url.match(/\.(mp4|webm|ogg)$/i) ? (
                      <video src={img.imagen_url} className="w-full h-full object-cover" controls />
                    ) : (
                      <img src={img.imagen_url} alt={img.titulo} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-black mb-1">{img.titulo}</h3>
                    {img.descripcion && <p className="text-sm text-gray-600 mb-2">{img.descripcion}</p>}
                    <button onClick={() => handleEliminar(img.id, img.imagen_url)} className="text-sm text-red-600 hover:text-red-700 font-medium">Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}