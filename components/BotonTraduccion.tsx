'use client'
import { useState } from 'react'
import { Languages } from 'lucide-react'

export default function BotonTraduccion() {
  const [mostrarMenu, setMostrarMenu] = useState(false)

  const cambiarIdioma = (idioma: string) => {
    const urlActual = window.location.href
    const nuevoUrl = `https://translate.google.com/translate?sl=es&tl=${idioma}&u=${encodeURIComponent(urlActual)}`
    window.location.href = nuevoUrl
  }

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2">
      {mostrarMenu && (
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-2 flex flex-col gap-1 mb-2">
          <button onClick={() => cambiarIdioma('en')} className="px-4 py-2 hover:bg-gray-100 rounded text-sm font-medium text-left text-black">🇬🇧 English</button>
          <button onClick={() => cambiarIdioma('fr')} className="px-4 py-2 hover:bg-gray-100 rounded text-sm font-medium text-left text-black">🇫🇷 Français</button>
          <button onClick={() => cambiarIdioma('es')} className="px-4 py-2 hover:bg-gray-100 rounded text-sm font-medium text-left text-black">🇪🇸 Español</button>
        </div>
      )}
      <button
        onClick={() => setMostrarMenu(!mostrarMenu)}
        className="flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl transition-all duration-300 transform hover:scale-105"
        aria-label="Traducir página"
      >
        <Languages size={24} />
      </button>
    </div>
  )
}