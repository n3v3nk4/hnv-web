'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Calendar, Phone, MessageCircle, X } from 'lucide-react'

export default function BotonesFlotantes() {
  const [abierto, setAbierto] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      
      {/* ====== BOTONES EXPANDIBLES ====== */}
      {abierto && (
        <>
          {/* Botón Agendar */}
          <Link 
            href="/exito-personal"
            className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-full shadow-lg transition transform hover:scale-105"
          >
            <Calendar size={24} />
            <span className="text-sm font-bold">Agendar</span>
          </Link>

          {/* Botón Llamar */}
          <a 
            href="tel:+56988923943"
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg transition transform hover:scale-105"
          >
            <Phone size={24} />
            <span className="text-sm font-bold">Llamar</span>
          </a>

          {/* Botón WhatsApp */}
          <a 
            href="https://wa.me/56988923943"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition transform hover:scale-105"
          >
            <MessageCircle size={24} />
            <span className="text-sm font-bold">WhatsApp</span>
          </a>
        </>
      )}

      {/* ====== BOTÓN PRINCIPAL (TOGGLE) ====== */}
      <button
        onClick={() => setAbierto(!abierto)}
        className={`flex items-center justify-center w-16 h-16 rounded-full shadow-xl transition-all duration-300 ${
          abierto ? 'bg-gray-800 hover:bg-gray-900' : 'bg-red-600 hover:bg-red-700'
        } text-white`}
        aria-label="Botones de contacto"
      >
        {abierto ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  )
}