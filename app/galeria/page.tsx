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
      <h1 className="text-5xl font-bold text-center mb-4">Galería</h1>
      <p className="text-center text-gray-600 mb-12">Momentos que transforman vidas</p>
      
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