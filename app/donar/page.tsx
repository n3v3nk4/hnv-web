'use client'
import { useState } from 'react'
import MetodosPago from '@/components/MetodosPago'

export default function Donar() {
  const [loading, setLoading] = useState(false)

  const handleIrARegistro = () => {
    setLoading(true)
    window.open('https://hnv-inscripcion.ambervine18.chatgpt.site', '_blank')
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-black text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <p className="text-red-500 uppercase tracking-[0.3em] text-xs font-semibold mb-4">Tu aporte transforma vidas</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Donar</h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6" />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">Tu aporte contribuye directamente al desarrollo de nuestros programas educativos, de bienestar y de apoyo comunitario.</p>
        </div>
      </section>

      <section className="container mx-auto max-w-3xl px-4 py-20">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <MetodosPago />
        </div>

        {/* SECCIÓN DE REGISTRO DE DONACIÓN */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Registra tu donación</h2>
          <p className="text-gray-600 mb-8">
            Si realizaste una transferencia o deseas dejar tu constancia, haz clic aquí.
          </p>

          <button 
            onClick={handleIrARegistro}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            {loading ? 'Abriendo...' : 'Ir al formulario de registro'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </button>
        </div>
      </section>
    </div>
  )
}