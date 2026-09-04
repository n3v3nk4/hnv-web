'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ClubPatriarca() {
  const [mensaje, setMensaje] = useState('')
  const [nombre, setNombre] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('¡Gracias por tu mensaje! 💬')
    setNombre('')
    setMensaje('')
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[40vh] flex items-center justify-center text-center text-white" style={{
        backgroundImage: "url('/club-patriarca.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 px-4">
          <span className="text-sm uppercase tracking-wider text-red-400 font-semibold">🛡️ Club</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">PATRIARCA</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Fuerza, responsabilidad y construcción.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-blue-50 p-8 rounded-2xl mb-8 border border-blue-200">
          <p className="text-lg text-gray-700 text-center">
            Bienvenidos al <strong>Club Patriarca</strong> de HNV, una iniciativa participativa y solidaria creada para movilizar a nuestra comunidad alrededor de una misión común: apoyar la construcción y el desarrollo de los proyectos HNV.
          </p>
        </div>

        <div className="bg-black text-white p-8 rounded-2xl mb-8 text-center">
          <h2 className="text-2xl font-bold text-blue-400 mb-2">🏆 Desafío solidario</h2>
          <p className="text-gray-300">
            Quién logrará movilizar más apoyo para los proyectos HNV. 
            <br />
            <span className="text-blue-400 font-bold">¡Saldrá el Rey o la Reina del año!</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-2xl text-center">
            <span className="text-sm uppercase tracking-wider opacity-80">Total recaudado</span>
            <p className="text-3xl font-bold">$0 CLP</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-2xl text-center">
            <span className="text-sm uppercase tracking-wider opacity-80">Número de participantes</span>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>

        <div className="text-center mb-8">
          <Link 
            href="/donar" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold text-lg transition transform hover:scale-105 shadow-lg"
          >
            💪 APOYAR AL CLUB PATRIARCA
          </Link>
          <p className="text-sm text-gray-500 mt-2">Cada aporte suma al objetivo común de HNV. ¡La competencia es solidaria!</p>
        </div>

        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-bold mb-4">💬 Deja tu mensaje</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Tu nombre..."
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Tu mensaje de apoyo..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full font-bold transition"
            >
              Enviar mensaje 💬
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}