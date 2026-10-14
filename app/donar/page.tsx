'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Donar() {
  const [loading, setLoading] = useState(false)
  const [donacionEnviada, setDonacionEnviada] = useState(false)
  const [tipoDonacion, setTipoDonacion] = useState<'money' | 'in_kind'>('money')
  const [esAnonimo, setEsAnonimo] = useState(false)
  const [formData, setFormData] = useState({
    donor_name: '', phone: '', email: '', amount_clp: '', description: '', city: '', message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const datosDonacion = {
      donor_name: esAnonimo ? 'Anónimo' : formData.donor_name,
      phone: esAnonimo ? null : formData.phone,
      email: esAnonimo ? null : formData.email,
      donation_type: tipoDonacion,
      amount_clp: tipoDonacion === 'money' ? formData.amount_clp : null,
      description: formData.description,
      city: formData.city,
      message: formData.message
    }
    const { error } = await supabase.from('donations').insert([datosDonacion])
    if (!error) {
      setDonacionEnviada(true)
    } else {
      alert('Error al enviar. Por favor intenta nuevamente.')
    }
    setLoading(false)
  }

  if (donacionEnviada) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-black mb-3">Gracias por tu aporte</h2>
          <p className="text-gray-600 mb-8">Hemos registrado tu donación. Nos pondremos en contacto a la brevedad.</p>
          <a href="/" className="inline-block bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition">
            Volver al inicio
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ====== ENCABEZADO ELEGANTE ====== */}
      <section className="relative bg-black text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <p className="text-red-500 uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            Tu aporte transforma vidas
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Donar</h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6" />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Tu aporte contribuye directamente al desarrollo de nuestros programas educativos, 
            de bienestar y de apoyo comunitario.
          </p>
        </div>
      </section>

      {/* ====== FORMULARIO ====== */}
      <section className="container mx-auto max-w-3xl px-4 py-20">
        
        {/* Botón de PayPal si es dinero */}
        {tipoDonacion === 'money' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 mb-8 text-center">
            <h2 className="text-2xl font-bold text-black mb-3">Donación en dinero</h2>
            <p className="text-gray-600 mb-6">Realiza tu aporte de forma segura a través de PayPal. Aporte sugerido: $20 USD.</p>
            <a 
              href="https://www.paypal.com/ncp/payment/E9G8W4L6Q3CRC" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.86a.641.641 0 0 1 .633-.536h6.718c2.182 0 3.867.448 5.006 1.332 1.139.884 1.708 2.185 1.708 3.906 0 .756-.11 1.482-.328 2.178-.219.696-.57 1.343-1.053 1.942-.484.598-1.098 1.093-1.842 1.485-.744.392-1.62.588-2.628.588h-2.356l-1.19 7.516a.641.641 0 0 1-.633.536z"/>
              </svg>
              Donar con PayPal
            </a>
          </div>
        )}

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
          <h2 className="text-2xl font-bold text-black mb-2">Registra tu donación</h2>
          <p className="text-gray-600 text-sm mb-8">Completa el formulario para que podamos hacer seguimiento a tu aporte.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Tipo de donación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Tipo de donación</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button" 
                  onClick={() => setTipoDonacion('money')} 
                  className={`p-4 rounded-xl border-2 transition text-center ${
                    tipoDonacion === 'money' 
                      ? 'border-red-600 bg-red-50 text-red-700' 
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span className="font-semibold text-sm">Dinero</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => setTipoDonacion('in_kind')} 
                  className={`p-4 rounded-xl border-2 transition text-center ${
                    tipoDonacion === 'in_kind' 
                      ? 'border-red-600 bg-red-50 text-red-700' 
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span className="font-semibold text-sm">Especie</span>
                </button>
              </div>
            </div>

            {/* Tipo de donante */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Tipo de donante</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button" 
                  onClick={() => setEsAnonimo(false)} 
                  className={`p-4 rounded-xl border-2 transition text-center ${
                    !esAnonimo 
                      ? 'border-red-600 bg-red-50 text-red-700' 
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span className="font-semibold text-sm">Personal</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => setEsAnonimo(true)} 
                  className={`p-4 rounded-xl border-2 transition text-center ${
                    esAnonimo 
                      ? 'border-red-600 bg-red-50 text-red-700' 
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span className="font-semibold text-sm">Anónimo</span>
                </button>
              </div>
            </div>

            {/* Datos personales */}
            {!esAnonimo && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                  <input 
                    type="text" 
                    placeholder="Tu nombre" 
                    value={formData.donor_name} 
                    onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })} 
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input 
                    type="tel" 
                    placeholder="+56 9 XXXX XXXX" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
                  <input 
                    type="email" 
                    placeholder="tucorreo@ejemplo.com" 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" 
                    required 
                  />
                </div>
              </div>
            )}

            {/* Monto si es dinero */}
            {tipoDonacion === 'money' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monto de la donación (CLP)</label>
                <input 
                  type="number" 
                  placeholder="Ej: 20000" 
                  value={formData.amount_clp} 
                  onChange={(e) => setFormData({ ...formData, amount_clp: e.target.value })} 
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" 
                />
              </div>
            )}

            {/* Especie */}
            {tipoDonacion === 'in_kind' && (
              <>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Nota:</strong> Una vez enviado el formulario, nuestro equipo se comunicará contigo para coordinar la entrega de tu donación en especie.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">¿Qué deseas donar?</label>
                  <textarea 
                    placeholder="Ej: Ropa en buen estado, alimentos no perecibles, útiles escolares..." 
                    value={formData.description} 
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                    rows={3} 
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad / Comuna</label>
                  <input 
                    type="text" 
                    placeholder="Ej: Santiago" 
                    value={formData.city} 
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })} 
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">¿Cómo prefieres coordinar la entrega?</label>
                  <select 
                    value={formData.message} 
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Coordinación por WhatsApp">Que me contacten por WhatsApp</option>
                    <option value="Coordinación por correo">Que me contacten por correo</option>
                    <option value="Entrega en sede">Llevar la donación a la sede de HNV</option>
                  </select>
                </div>
              </>
            )}

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Registrar donación'}
            </button>
          </form>
        </div>

        {/* Contacto */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
          <p className="text-sm text-gray-600">
            Para consultas sobre donaciones, escríbenos a{' '}
            <a href="mailto:nuevavisionfundacion2026@gmail.com" className="text-red-600 hover:underline font-medium">
              nuevavisionfundacion2026@gmail.com
            </a>{' '}
            o por WhatsApp al{' '}
            <a href="https://wa.me/56988923943" className="text-red-600 hover:underline font-medium">
              +569 8892 3943
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}