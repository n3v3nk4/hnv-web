'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'

export default function Galeria() {
  const [images, setImages] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    const { data } = await supabase.storage.from('galeria').list()
    if (data) {
      const urls = data.map(file => {
        const { data: urlData } = supabase.storage.from('galeria').getPublicUrl(file.name)
        return urlData.publicUrl
      })
      setImages(urls)
    }
  }

  async function uploadImage(e: any) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const fileName = `${Date.now()}_${file.name}`
    const { error } = await supabase.storage.from('galeria').upload(fileName, file)
    if (!error) {
      fetchImages()
    }
    setUploading(false)
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Galería</h1>
      
      <div className="text-center mb-8">
        <input type="file" onChange={uploadImage} className="hidden" id="upload" />
        <label htmlFor="upload" className="bg-red-600 text-white px-6 py-2 rounded cursor-pointer hover:bg-red-700">
          {uploading ? 'Subiendo...' : 'Subir foto'}
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((url, index) => (
          <div key={index} className="relative aspect-video">
            <Image src={url} alt={`Foto ${index}`} fill className="object-cover rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}