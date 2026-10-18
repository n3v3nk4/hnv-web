'use client'
import { Share2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function BotonCompartir() {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Fundación Humanidad Nueva Visión',
          text: '¡Conoce esta increíble fundación y ayúdanos a compartir!',
          url: url,
        })
      } catch (error) {
        console.log('Error al compartir:', error)
      }
    } else {
      // Si el navegador no soporta la API nativa (como en PC), copiamos al portapapeles
      navigator.clipboard.writeText(url)
      alert('¡Enlace copiado al portapapeles! Compártelo donde quieras.')
    }
  }

  return (
    <button
      onClick={handleShare}
      className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 bg-black hover:bg-gray-800 text-white rounded-full shadow-xl transition-all duration-300 transform hover:scale-105"
      aria-label="Compartir página"
      title="Compartir esta página"
    >
      <Share2 size={24} />
    </button>
  )
}