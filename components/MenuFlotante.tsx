'use client'
import { useState } from 'react'
import { Share2, Download, Languages, MessageCircle, X, Phone, Mail } from 'lucide-react'

export default function MenuFlotante() {
  const [menuContacto, setMenuContacto] = useState(false)
  const [menuIdioma, setMenuIdioma] = useState(false)

  const handleInstalar = () => {
    alert('Para instalar en tu pantalla de inicio:\n\n1. Toca el botón de Compartir del navegador.\n2. Selecciona "Agregar a pantalla de inicio".\n3. Confirma.')
  }

  const handleCompartir = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'Fundación HNV', url: window.location.href }) } catch (e) {}
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('¡Enlace copiado al portapapeles!')
    }
  }

  const cambiarIdioma = (idioma: string) => {
    window.location.href = `https://translate.google.com/translate?sl=es&tl=${idioma}&u=${encodeURIComponent(window.location.href)}`
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      
      {/* Menú Contacto */}
      <div className={`flex flex-col items-end gap-2 transition-all duration-300 ${menuContacto ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <a href="https://wa.me/56988923943" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-lg transition"><span className="text-xs font-bold">WhatsApp 1</span><MessageCircle size={18} /></a>
        <a href="https://wa.me/56991327162" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-lg transition"><span className="text-xs font-bold">WhatsApp 2</span><MessageCircle size={18} /></a>
        <a href="tel:+56988923943" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition"><span className="text-xs font-bold">Llamar</span><Phone size={18} /></a>
        <a href="mailto:nuevavisionfundacion2026@gmail.com" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg transition"><span className="text-xs font-bold">Correo</span><Mail size={18} /></a>
      </div>

      {/* Menú Idioma */}
      <div className={`bg-white rounded-xl shadow-xl border border-gray-200 p-2 flex flex-col gap-1 transition-all duration-300 ${menuIdioma ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <button onClick={() => cambiarIdioma('en')} className="px-4 py-2 hover:bg-gray-100 rounded text-sm font-medium text-left text-black">🇬🇧 English</button>
        <button onClick={() => cambiarIdioma('fr')} className="px-4 py-2 hover:bg-gray-100 rounded text-sm font-medium text-left text-black">🇫🇷 Français</button>
        <button onClick={() => cambiarIdioma('es')} className="px-4 py-2 hover:bg-gray-100 rounded text-sm font-medium text-left text-black">🇪🇸 Español</button>
      </div>

      {/* Botones de acción (Idioma, Compartir, Descargar) */}
      <div className="flex flex-col gap-2 mb-2">
        <button onClick={() => setMenuIdioma(!menuIdioma)} className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-100 text-blue-600 rounded-full shadow-lg border border-gray-200 transition"><Languages size={18} /></button>
        <button onClick={handleCompartir} className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-100 text-black rounded-full shadow-lg border border-gray-200 transition"><Share2 size={18} /></button>
        <button onClick={handleInstalar} className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-100 text-green-600 rounded-full shadow-lg border border-gray-200 transition"><Download size={18} /></button>
      </div>

      {/* Botón principal (WhatsApp) */}
      <button onClick={() => setMenuContacto(!menuContacto)} className={`flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 ${menuContacto ? 'bg-gray-800 rotate-90' : 'bg-green-500 hover:bg-green-600'} text-white`}>
        {menuContacto ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

    </div>
  )
}