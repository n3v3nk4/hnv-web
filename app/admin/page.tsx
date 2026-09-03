'use client'
import { useState } from 'react'
import { supabase, uploadImage } from '@/lib/supabaseClient'

export default function AdminGaleria() {
  const [loading, setLoading] = useState(false)
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [archivo, setArchivo] = useState<File | null>(null)
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error', texto: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!archivo || !titulo) {
      setMensaje({ tipo: 'error', texto: 'Debes seleccionar una imagen y poner un título.' })
      return
    }

    setLoading(true)
    setMensaje(null)

    try {
      // Subir imagen a Storage
      const imagen_url = await uploadImage(archivo, titulo)

      // Guardar en la base de datos
      const { error } = await supabase
        .from('galeria')
        .insert([{ titulo, descripcion, imagen_url }])

      if (error) throw error

      setMensaje({ tipo: 'exito', texto: '¡Imagen subida exitosamente!' })
      setTitulo('')
      setDescripcion('')
      setArchivo(null)
      const input = document.getElementById('archivo') as HTMLInputElement
      if (input) input.value = ''

    } catch (error: any) {
      setMensaje({ tipo: 'error', texto: `Error: ${error.message}` })
    }

    setLoading(false)
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">Administrar Galería</h1>

      {mensaje && (
        <div className={`p-4 rounded-lg mb-6 ${mensaje.tipo === 'exito' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej: Taller de liderazgo"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción (opcional)</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Breve descripción de la imagen..."
            rows={2}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Imagen *</label>
          <input
            id="archivo"
            type="file"
            accept="image/*"
            onChange={(e) => setArchivo(e.target.files?.[0] || null)}
            className="w-full p-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
            required
          />
          {archivo && (
            <p className="text-sm text-gray-500 mt-1">Archivo seleccionado: {archivo.name}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition disabled:opacity-50"
        >
          {loading ? 'Subiendo...' : '📤 Subir imagen'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <a href="/admin" className="text-red-600 hover:underline">← Volver al panel de administración</a>
      </div>
    </div>
  )
}