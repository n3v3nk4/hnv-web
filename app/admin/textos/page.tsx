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
    
    const cargar = async () => {
      const { data } = await supabase.from('textos_web').select('*')
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

    // Guardamos en Supabase
    await supabase.from('textos_web').upsert({ id: 'hero_titulo', contenido: titulo })
    await supabase.from('textos_web').upsert({ id: 'hero_subtitulo', contenido: subtitulo })

    setMensaje('Textos actualizados correctamente. Ve a la página de inicio para verlos.')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <button onClick={() => router.push('/admin')} className="text-gray-600 hover:text-black flex items-center gap-2 font-medium">
            ← Volver al Panel
          </button>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h1 className="text-2xl font-bold text-black mb-6">Editar Textos de la Portada</h1>
          
          {mensaje && <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-center">{mensaje}</div>}

          <form onSubmit={handleGuardar} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Título Principal</label>
              <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
              <input type="text" value={subtitulo} onChange={(e) => setSubtitulo(e.target.value)} className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500" required />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition">
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}