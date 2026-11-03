'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AdminTextos() {
  const [titulo, setTitulo] = useState('')
  const [subtitulo, setSubtitulo] = useState('')
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const router = useRouter()

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_auth')
    if (isAuth !== 'true') { router.push('/admin'); return }
    
    // Cargar textos actuales desde Supabase (asumiendo que tienes una tabla 'textos')
    // Si no la tienes, crea una tabla simple en Supabase: id (text), contenido (text)
    const cargar = async () => {
      const { data } = await supabase.from('textos').select('*')
      if (data) {
        const t = data.find(d => d.id === 'hero_titulo')
        const s = data.find(d => d.id === 'hero_subtitulo')
        if (t) setTitulo(t.contenido)
        if (s) setSubtitulo(s.contenido)
      }
    }
    cargar()
  }, [router])

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMensaje('')

    // Guardar o actualizar en Supabase
    await supabase.from('textos').upsert({ id: 'hero_titulo', contenido: titulo })
    await supabase.from('textos').upsert({ id: 'hero_subtitulo', contenido: subtitulo })

    setMensaje('Textos actualizados correctamente')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-black mb-6">Editar Textos de la Portada</h1>
        
        {mensaje && <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4">{mensaje}</div>}

        <form onSubmit={handleGuardar} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Título Principal</label>
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
            <input type="text" value={subtitulo} onChange={(e) => setSubtitulo(e.target.value)} className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition">
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="/admin" className="text-sm text-gray-500 hover:text-red-600">← Volver al panel</a>
        </div>
      </div>
    </div>
  )
}