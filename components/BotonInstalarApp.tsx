'use client'
import { useState, useEffect } from 'react'
import { Download } from 'lucide-react'

export default function BotonInstalarApp() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstalar = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        console.log('App instalada')
      }
      setDeferredPrompt(null)
    } else {
      alert('Para instalar esta página en tu pantalla de inicio:\n\n1. Toca el botón de "Compartir" (el cuadro con la flecha hacia arriba).\n2. Busca la opción "Agregar a pantalla de inicio".\n3. Confirma tocando "Agregar".')
    }
  }

  return (
    <button
      onClick={handleInstalar}
      className="fixed bottom-40 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-xl transition-all duration-300 transform hover:scale-105"
      aria-label="Descargar App"
      title="Agregar a pantalla de inicio"
    >
      <Download size={24} />
    </button>
  )
}