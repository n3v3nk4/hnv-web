'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function FAQ() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' })
  const [enviado, setEnviado] = useState(false)

  const faqs = [
    { pregunta: '¿Qué es HNV?', respuesta: 'HNV — Humanidad Nueva Visión es una fundación sin fines de lucro que trabaja para contribuir al desarrollo de las personas y las comunidades mediante educación, autoconocimiento, desarrollo personal, bienestar, emprendimiento y oportunidades.' },
    { pregunta: '¿Cuál es la misión de HNV?', respuesta: 'Nuestra misión es acompañar a las personas en el desarrollo de sus capacidades y potencial, brindándoles conocimientos, herramientas, servicios y oportunidades que les permitan avanzar hacia una vida con mayor autonomía y bienestar.' },
    { pregunta: '¿Cuál es el gran proyecto de HNV?', respuesta: 'Nuestro gran proyecto es la creación de los Campus Comunitarios HNV, concebidos como ecosistemas donde las personas puedan encontrar formación, bienestar, servicios, programas, herramientas y oportunidades en un mismo lugar.' },
    { pregunta: '¿Quién puede formar parte de HNV?', respuesta: 'Toda persona que comparta nuestros valores y desee participar, aprender, desarrollarse o contribuir a nuestra misión puede solicitar ser miembro de HNV.' },
    { pregunta: '¿Cómo puedo hacerme miembro?', respuesta: 'Puedes completar el formulario disponible en la sección "Hazte Miembro" de nuestra página web y seleccionar la modalidad de membresía que prefieras.' },
    { pregunta: '¿Cuáles son las opciones de membresía?', respuesta: 'HNV dispone de diferentes aportes mensuales de membresía: $5.000, $15.000, $20.000 y $100.000.' },
    { pregunta: '¿Qué beneficios tienen los miembros?', respuesta: 'Los miembros pueden acceder a beneficios y actividades organizadas por HNV, entre ellos masterclasses de desarrollo personal, actividades de bienestar y otros programas.' },
    { pregunta: '¿Puedo participar sin ser miembro?', respuesta: 'Sí. HNV desarrolla diferentes actividades, campañas y oportunidades de participación. Algunos programas pueden estar destinados específicamente a los miembros.' },
    { pregunta: '¿Cómo puedo hacer una donación?', respuesta: 'Puedes ingresar a la sección "Donar" de nuestra página web y elegir la modalidad disponible para realizar tu aporte.' },
    { pregunta: '¿Las donaciones tienen que ser solamente en dinero?', respuesta: 'No. HNV puede recibir tanto donaciones monetarias como donaciones en especie.' },
    { pregunta: '¿Puedo ser voluntario/a en HNV?', respuesta: 'Sí. Puedes registrarte en la sección "Ser Voluntario" e indicar tus conocimientos, habilidades y disponibilidad.' },
    { pregunta: '¿Qué es el Club Matriarca?', respuesta: 'Es un espacio de participación y apoyo a la misión de HNV que busca fortalecer la solidaridad, el liderazgo y la contribución de las mujeres a nuestros proyectos.' },
    { pregunta: '¿Qué es el Club Patriarca?', respuesta: 'Es un espacio de participación y apoyo que invita a los hombres a contribuir activamente al desarrollo de los proyectos de HNV.' },
    { pregunta: '¿Cómo puedo contactar a HNV?', respuesta: 'Puedes escribirnos a nuevavisionfundacion2026@gmail.com, por WhatsApp al +569 8892 3943 o +56 991327162.' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('contact_messages').insert([formData])
    if (!error) {
      setEnviado(true)
      setFormData({ nombre: '', email: '', mensaje: '' })
    } else {
      alert('Error al enviar. Intenta nuevamente.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-4 text-black">Preguntas Frecuentes</h1>
        <p className="text-center text-gray-600 mb-12">Humanidad Nueva Visión</p>

        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6">
              <h3 className="text-lg font-bold text-red-600 mb-2">{faq.pregunta}</h3>
              <p className="text-gray-700">{faq.respuesta}</p>
            </div>
          ))}
        </div>

        {/* ====== FORMULARIO DE CONTACTO ====== */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-black mb-2">¿No encontraste tu respuesta?</h2>
          <p className="text-gray-600 text-sm mb-6">Contáctanos y envíanos tu pregunta.</p>

          {enviado ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 text-center">
              ¡Gracias! Te responderemos a la brevedad.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Tu nombre" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" required />
              <input type="email" placeholder="Tu correo" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" required />
              <textarea placeholder="Tu pregunta..." value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })} rows={4} className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" required />
              <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition disabled:opacity-50">
                {loading ? 'Enviando...' : 'Enviar pregunta'}
              </button>
            </form>
          )}
        </div>

        {/* ====== CONTACTO ====== */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <p className="text-sm text-gray-600 mb-4">O contáctanos directamente:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="mailto:nuevavisionfundacion2026@gmail.com" className="inline-block bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium transition">
              ✉️ Correo
            </a>
            <a href="https://wa.me/56988923943" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition">
              WhatsApp 1
            </a>
            <a href="https://wa.me/56991327162" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg text-sm font-medium transition">
              WhatsApp 2
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}