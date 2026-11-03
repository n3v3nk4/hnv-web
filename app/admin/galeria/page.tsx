'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { registrarLog } from '@/lib/logger'

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
  const [imagenSeleccionada, setImagenSeleccionada] = useState<Imagen | null>(null)
  const router = useRouter()

  useEffect(() => {
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

      // Registramos la acción en los logs
      await registrarLog('Subida de archivo', `Se subió: ${titulo}`)

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

  const handleEliminar = async (id: string, url: string, titulo: string) => {
    if (!confirm('¿Eliminar este archivo?')) return
    const path = url.split('/galeria/')[1]
    if (path) await supabase.storage.from('galeria').remove([`galeria/${path}`])
    await supabase.from('galeria').delete().eq('id', id)
    
    // Registramos la eliminación
    await registrarLog('Eliminación de archivo', `Se eliminó: ${titulo}`)
    
    cargarImagenes()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER con botón de volver */}
      <header className="bg-black text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Gestión de Galería</h1>
          <button onClick={() => router.push('/admin')} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition flex items-center gap-2">
            ← Volver al Panel
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* FORMULARIO DE SUBIDA */}
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

        {/* GALERÍA DE ARCHIVOS */}
        <div>
          <h2 className="text-xl font-bold text-black mb-6">Archivos actuales ({imagenes.length})</h2>
          {loading ? (
            <p className="text-gray-600">Cargando...</p>
          ) : imagenes.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center"><p className="text-gray-500">No hay archivos subidos aún.</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {imagenes.map((img) => (
                <div key={img.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition group">
                  <div className="relative h-48 bg-black overflow-hidden cursor-pointer" onClick={() => setImagenSeleccionada(img)}>
                    {img.imagen_url.match(/\.(mp4|webm|ogg)$/i) ? (
                      <video src={img.imagen_url} className="w-full h-full object-cover" />
                    ) : (
                      <img src={img.imagen_url} alt={img.titulo} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition flex items-center justify-center">
                       <span className="text-white opacity-0 group-hover:opacity-100 transition font-semibold bg-black/50 px-3 py-1 rounded-full text-xs">Ver más grande</span>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-black mb-1">{img.titulo}</h3>
                      {img.descripcion && <p className="text-sm text-gray-600 line-clamp-1">{img.descripcion}</p>}
                    </div>
                    <button onClick={() => handleEliminar(img.id, img.imagen_url, img.titulo)} className="text-gray-400 hover:text-red-600 transition p-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* LIGHTBOX / MODAL PARA VER LA IMAGEN GRANDE */}
      {imagenSeleccionada && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setImagenSeleccionada(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setImagenSeleccionada(null)}
              className="absolute -top-12 right-0 bg-white hover:bg-gray-200 text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl transition"
            >
              ×
            </button>
            {imagenSeleccionada.imagen_url.match(/\.(mp4|webm|ogg)$/i) ? (
              <video src={imagenSeleccionada.imagen_url} className="w-full h-auto max-h-[80vh] rounded-2xl shadow-2xl" controls autoPlay />
            ) : (
              <img src={imagenSeleccionada.imagen_url} alt={imagenSeleccionada.titulo} className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl" />
            )}
            <div className="bg-white p-4 rounded-b-2xl text-center mt-2">
               <h3 className="font-bold text-black text-lg">{imagenSeleccionada.titulo}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}