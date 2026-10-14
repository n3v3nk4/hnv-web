'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function HazteMiembro() {
  const [loading, setLoading] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    birth_date: '',
    nationality: '',
    country: '',
    city: '',
    phone: '',
    whatsapp: '',
    email: '',
    occupation: '',
    interest_area: '',
    plan_type: 'Plan Semilla'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('members')
      .insert([{ ...formData, status: 'pending' }])

    if (!error) {
      setEnviado(true)
      setFormData({
        full_name: '', birth_date: '', nationality: '', country: '', city: '',
        phone: '', whatsapp: '', email: '', occupation: '', interest_area: '', plan_type: 'Plan Semilla'
      })
    } else {
      alert('Error al enviar. Por favor intenta nuevamente.')
    }
    setLoading(false)
  }

  const planes = [
    {
      nombre: 'Plan Semilla',
      precio: '$5.000',
      beneficios: ['Acceso a contenido básico', 'Boletín informativo mensual', 'Participación en actividades abiertas']
    },
    {
      nombre: 'Plan Comunidad',
      precio: '$15.000',
      beneficios: ['Todo el plan Semilla', 'Masterclass gratuita', 'Descuentos en eventos', 'Acceso a actividades exclusivas']
    },
    {
      nombre: 'Plan Desarrollo',
      precio: '$20.000',
      beneficios: ['Todo el plan Comunidad', 'Masaje relajante trimestral', 'Certificados de participación', 'Asesoría personalizada']
    },
    {
      nombre: 'Plan Visionario',
      precio: '$100.000',
      beneficios: ['Todo el plan Desarrollo', 'Acceso directo a la fundadora', 'Eventos VIP', 'Reconocimiento especial', 'Invitación a proyectos estratégicos']
    }
  ]

  if (enviado) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-black mb-3">Solicitud enviada</h2>
          <p className="text-gray-600 mb-8">
            Hemos recibido tu solicitud de membresía. Nos pondremos en contacto contigo para confirmar tus datos y explicarte el proceso de incorporación.
          </p>
          <a href="/" className="inline-block bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition">
            Volver al inicio
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ====== ENCABEZADO ====== */}
      <section className="bg-black text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hazte Miembro</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Forma parte de una comunidad que busca crecer, aprender y construir nuevas oportunidades.
          </p>
        </div>
      </section>

      {/* ====== PLANES ====== */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-3">Nuestros Planes</h2>
          <p className="text-gray-600">Elige el nivel de membresía que mejor se adapte a tus posibilidades</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {planes.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl shadow-sm border p-6 flex flex-col transition hover:shadow-md ${
                plan.nombre === 'Plan Desarrollo' ? 'border-red-600 ring-2 ring-red-100' : 'border-gray-200'
              }`}
            >
              {plan.nombre === 'Plan Desarrollo' && (
                <span className="self-start bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  Más popular
                </span>
              )}
              <h3 className="text-xl font-bold text-black mb-2">{plan.nombre}</h3>
              <p className="text-3xl font-bold text-red-600 mb-4">
                {plan.precio}
                <span className="text-sm font-normal text-gray-500"> /mes</span>
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.beneficios.map((beneficio, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{beneficio}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="#formulario" 
                className="block text-center bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition"
              >
                Seleccionar
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ====== BENEFICIOS GENERALES ====== */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-black mb-12">Beneficios de ser miembro</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Masterclass gratuita</h3>
              <p className="text-gray-600 text-sm">
                Acceso gratuito a Masterclass HNV de Desarrollo Personal y Resolución de Problemas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Masaje relajante</h3>
              <p className="text-gray-600 text-sm">
                Masaje relajante gratuito, sujeto a disponibilidad y condiciones establecidas por HNV.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Comunidad HNV</h3>
              <p className="text-gray-600 text-sm">
                Participación en actividades, encuentros y proyectos organizados por la fundación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FORMULARIO ====== */}
      <section id="formulario" className="container mx-auto max-w-3xl px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
          <h2 className="text-3xl font-bold text-black mb-2">Solicitud de membresía</h2>
          <p className="text-gray-600 text-sm mb-8">
            Completa el formulario y nos pondremos en contacto contigo para confirmar tus datos.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Datos personales */}
            <div>
              <h3 className="text-lg font-bold text-black mb-4">Datos personales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo *</label>
                  <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Tu nombre completo" className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de nacimiento</label>
                  <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nacionalidad</label>
                  <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Ej: Chilena" className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
                  <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Ej: Chile" className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comuna / Ciudad</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Ej: Santiago" className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
              </div>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="text-lg font-bold text-black mb-4">Información de contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+56 9 XXXX XXXX" className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                  <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="+56 9 XXXX XXXX" className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="tucorreo@ejemplo.com" className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" required />
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div>
              <h3 className="text-lg font-bold text-black mb-4">Información adicional</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ocupación o profesión</label>
                  <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Ej: Docente" className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Área de interés</label>
                  <input type="text" name="interest_area" value={formData.interest_area} onChange={handleChange} placeholder="Ej: Educación, bienestar" className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
              </div>
            </div>

            {/* Plan */}
            <div>
              <h3 className="text-lg font-bold text-black mb-4">Selecciona tu plan</h3>
              <select name="plan_type" value={formData.plan_type} onChange={handleChange} className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500">
                <option value="Plan Semilla">Plan Semilla - $5.000 /mes</option>
                <option value="Plan Comunidad">Plan Comunidad - $15.000 /mes</option>
                <option value="Plan Desarrollo">Plan Desarrollo - $20.000 /mes</option>
                <option value="Plan Visionario">Plan Visionario - $100.000 /mes</option>
              </select>
            </div>

            {/* Botón */}
            <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition disabled:opacity-50">
              {loading ? 'Enviando...' : 'Enviar solicitud de membresía'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}