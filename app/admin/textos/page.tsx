'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AdminTextos() {
  const [loading, setLoading] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [textos, setTextos] = useState<any>({})
  const router = useRouter()

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/admin/login')
        return
      }

      const { data } = await supabase.from('textos_web').select('*')
      const textosObj = data?.reduce((acc, item) => ({ ...acc, [item.id]: item.contenido }), {})
      setTextos(textosObj || {})
      setLoading(false)
    }
    checkAuthAndFetch()
  }, [router])

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault()
    setGuardando(true)

    for (const [id, contenido] of Object.entries(textos)) {
      await supabase.from('textos_web').update({ contenido: contenido as string }).eq('id', id)
    }

    alert('¡Textos actualizados correctamente!')
    setGuardando(false)
  }

  if (loading) return <div className="p-10 text-center">Cargando...</div>

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-black mb-6">Editar Textos de la Portada</h1>
        
        <form onSubmit={handleGuardar} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Título Principal</label>
            <input 
              type="text" 
              value={textos['hero_titulo'] || ''} 
              onChange={(e) => setTextos({ ...textos, hero_titulo: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
            <input 
              type="text" 
              value={textos['hero_subtitulo'] || ''} 
              onChange={(e) => setTextos({ ...textos, hero_subtitulo: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" 
            />
          </div>

          <div className="flex gap-4">
            <button 
              type="submit" 
              disabled={guardando}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition disabled:opacity-50"
            >
              {guardando ? 'Guardando...' : 'Guardar Cambios'}
            </button>
            <button 
              type="button"
              onClick={() => router.push('/admin')}
              className="px-6 bg-gray-200 hover:bg-gray-300 text-black py-4 rounded-xl font-bold transition"
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}