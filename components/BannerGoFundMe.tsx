'use client'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function BannerGoFundMe() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="w-full z-50 bg-red-600 text-white py-2 px-4 shadow-md animate-slide-down">
      <div className="container mx-auto flex items-center justify-between gap-2">
        <p className="text-xs sm:text-sm font-medium text-center flex-1 leading-tight">
          🌍 ¡Apoya nuestro proyecto en Haití! <strong>Campaña en GoFundMe</strong>
        </p>
        <a 
          href="https://gofund.me/adfdd0bf9" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-red-600 px-4 py-1 rounded-full text-xs font-bold hover:bg-gray-100 transition whitespace-nowrap"
        >
          Donar
        </a>
        <button onClick={() => setVisible(false)} className="text-white hover:text-gray-200 ml-2">
          <X size={18} />
        </button>
      </div>
    </div>
  )
}