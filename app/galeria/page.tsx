'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { ImageOff } from 'lucide-react'

export default function Galeria() {
  const [images, setImages] = useState([])
  const [empty, setEmpty] = useState(false)

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    const { data } = await supabase.storage.from('galeria').list()
    if (data && data.length > 0) {
      const urls = data.map((file: any) => {
        const { data: urlData } = supabase.storage.from('galeria').getPublicUrl(file.name)
        return urlData.publicUrl
      })
      setImages(urls)
      setEmpty(false)
    } else {
      setEmpty(true)
    }
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-5xl font-bold text-center mb-4">GALERÍA 📸</h1>
      <p className="text-center text-gray-600 mb-12">HNV en acción</p>
      
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-12">
        <p className="text-gray-700 mb-4">Conoce nuestra comunidad, nuestras actividades y el camino que estamos construyendo juntos.</p>
        <p className="text-gray-600">En esta galería compartiremos imágenes y videos de:</p>
        <ul className="list-disc pl-5 text-gray-600 mt-2">
          <li>📸 Actividades comunitarias</li>
          <li>📸 Masterclass y capacitaciones</li>
          <li>📸 Encuentros HNV</li>
          <li>📸 Voluntariado</li>
          <li>📸 Bienestar</li>
          <li>📸 Talleres</li>
          <li>📸 Actividades culturales y recreativas</li>
          <li>📸 Proyectos sociales</li>
          <li>📸 Eventos especiales</li>
          <li>📸 Avances del Campus Comunitario HNV</li>
          <li>📸 Nuestra comunidad</li>
          <li>🎥 Videos y testimonios</li>
        </ul>
      </div>

      <div className="text-center mb-8">
        <p className="text-gray-500">Cada imagen cuenta una parte de nuestra historia.</p>
      </div>

      {empty ? (
        <div className="text-center py-20">
          <div className="flex justify-center mb-4">
            <ImageOff size={64} className="text-gray-300" />
          </div>
          <p className="text-2xl font-semibold text-gray-500">Aún no hay fotos disponibles</p>
          <p className="text-gray-400 mt-2">Pronto compartiremos nuestros momentos aquí.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.map((url, index) => (
            <div key={index} className="relative aspect-video rounded-2xl shadow-xl overflow-hidden">
              <img src={url} alt={`Foto ${index}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}