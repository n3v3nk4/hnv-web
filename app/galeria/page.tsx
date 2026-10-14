'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface Imagen {
  id: string
  titulo: string
  descripcion: string | null
  imagen_url: string
  created_at: string
}

export default function Galeria() {
  const [imagenes, setImagenes] = useState<Imagen[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargar = async () => {
      const { data } = await supabase
        .from('galeria')
        .select('*')
        .order('created_at', { ascending: false })
      setImagenes(data || [])
      setLoading(false)
    }
    cargar()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ====== ENCABEZADO ELEGANTE ====== */}
      <section className="relative bg-black text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <p className="text-red-500 uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            Nuestra comunidad en acción
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Galería</h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6" />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Momentos que reflejan el trabajo y el compromiso de Humanidad Nueva Visión.
          </p>
        </div>
      </section>

      {/* ====== GALERÍA ====== */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        {loading ? (
          <p className="text-center text-gray-600">Cargando imágenes...</p>
        ) : imagenes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-black mb-2">Próximamente</h2>
            <p className="text-gray-600">Estamos preparando contenido para nuestra galería.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {imagenes.map((img) => (
              <div 
                key={img.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img 
                    src={img.imagen_url} 
                    alt={img.titulo}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-black mb-1">{img.titulo}</h3>
                  {img.descripcion && (
                    <p className="text-sm text-gray-600 leading-relaxed">{img.descripcion}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}