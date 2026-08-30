'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'

export default function Galeria() {
  const [images, setImages] = useState([])

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    const { data } = await supabase.storage.from('galeria').list()
    if (data) {
      const urls = data.map((file: any) => {
        const { data: urlData } = supabase.storage.from('galeria').getPublicUrl(file.name)
        return urlData.publicUrl
      })
      setImages(urls)
    }
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-5xl font-bold text-center mb-4">Galería</h1>
      <p className="text-center text-gray-600 mb-12">Momentos que transforman vidas</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {images.map((url, index) => (
          <div key={index} className="relative aspect-video rounded-2xl shadow-xl overflow-hidden">
            <Image src={url} alt={`Foto ${index}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}