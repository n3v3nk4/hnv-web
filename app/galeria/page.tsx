'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface Imagen {
  id: string
  titulo: string
  descripcion: string | null
  imagen_url: string
}

export default function GaleriaPublica() {
  const [imagenes, setImagenes] = useState<Imagen[]>([])
  const [loading, setLoading] = useState(true)
  const [fotoSeleccionada, setFotoSeleccionada] = useState<Imagen | null>(null)

  useEffect(() => {
    const cargar = async () => {
      const { data } = await supabase.from('galeria').select('*').order('created_at', { ascending: false })
      setImagenes(data || [])
      setLoading(false)
    }
    cargar()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-black text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <p className="text-red-500 uppercase tracking-[0.3em] text-xs font-semibold mb-4">Nuestra comunidad en acción</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Galería</h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6" />
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-20">
        {loading ? (
          <p className="text-center text-gray-600">Cargando imágenes...</p>
        ) : imagenes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
             <p className="text-gray-500">Próximamente subiremos fotos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {imagenes.map((img) => (
              <div 
                key={img.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setFotoSeleccionada(img)}
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  {img.imagen_url.match(/\.(mp4|webm|ogg)$/i) ? (
                    <video src={img.imagen_url} className="w-full h-full object-cover" />
                  ) : (
                    <img src={img.imagen_url} alt={img.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition font-semibold bg-black/50 px-4 py-2 rounded-full text-sm">Ver más grande</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-black mb-1">{img.titulo}</h3>
                  {img.descripcion && <p className="text-sm text-gray-600 line-clamp-2">{img.descripcion}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* LIGHTBOX (VER FOTO EN GRANDE) */}
      {fotoSeleccionada && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setFotoSeleccionada(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setFotoSeleccionada(null)}
              className="absolute -top-12 right-0 bg-white hover:bg-gray-200 text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl transition"
            >
              ×
            </button>
            {fotoSeleccionada.imagen_url.match(/\.(mp4|webm|ogg)$/i) ? (
              <video src={fotoSeleccionada.imagen_url} className="w-full h-auto max-h-[80vh] rounded-2xl shadow-2xl" controls autoPlay />
            ) : (
              <img src={fotoSeleccionada.imagen_url} alt={fotoSeleccionada.titulo} className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl" />
            )}
            <div className="bg-white p-4 rounded-b-2xl text-center mt-2">
               <h3 className="font-bold text-black text-lg">{fotoSeleccionada.titulo}</h3>
               {fotoSeleccionada.descripcion && <p className="text-gray-600 text-sm">{fotoSeleccionada.descripcion}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}