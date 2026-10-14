'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Donar() {
  const [loading, setLoading] = useState(false)
  const [donacionEnviada, setDonacionEnviada] = useState(false)
  const [tipoDonacion, setTipoDonacion] = useState<'money' | 'in_kind'>('money')
  const [esAnonimo, setEsAnonimo] = useState(false)
  
  const [formData, setFormData] = useState({
    donor_name: '',
    phone: '',
    email: '',
    amount_clp: '',
    description: '',
    city: '',
    message: ''
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

  // ====== PANTALLA DE AGRADECIMIENTO ======
  if (donacionEnviada) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-black mb-3">Gracias por tu aporte</h2>
          <p className="text-gray-600 mb-6">
            Hemos registrado tu donación. Nos pondremos en contacto a la brevedad para coordinar los siguientes pasos.
          </p>
          <a
            href="/"
            className="inline-block bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ====== ENCABEZADO ====== */}
      <section className="bg-black text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Donar</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Tu aporte contribuye directamente al desarrollo de nuestros programas educativos, 
            de bienestar y de apoyo comunitario.
          </p>
        </div>
      </section>

      {/* ====== CONTENIDO PRINCIPAL ====== */}
      <section className="container mx-auto max-w-3xl px-4 py-12">
        
        {/* ====== BOTÓN DE PAYPAL (SOLO PARA DINERO) ====== */}
        {tipoDonacion === 'money' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8 text-center">
            <h2 className="text-xl font-bold text-black mb-2">Donación en dinero</h2>
            <p className="text-gray-600 text-sm mb-6">
              Realiza tu aporte de forma segura a través de PayPal. Aporte sugerido: $20 USD.
            </p>
            <a
              href="https://www.paypal.com/ncp/payment/E9G8W4L6Q3CRC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Donar con PayPal
            </a>
          </div>
        )}

        {/* ====== FORMULARIO DE REGISTRO ====== */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-black mb-2">Registra tu donación</h2>
          <p className="text-gray-600 text-sm mb-8">
            Completa el formulario para que podamos hacer seguimiento a tu aporte.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* ====== TIPO DE DONACIÓN ====== */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Tipo de donación</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTipoDonacion('money')}
                  className={`p-4 rounded-lg border-2 transition text-center ${
                    tipoDonacion === 'money'
                      ? 'border-red-600 bg-red-50 text-red-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-6 h-6 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1.93.99 1.64 2.17 1.64 1.18 0 1.96-.62 1.96-1.51 0-.77-.5-1.19-1.96-1.51-1.75-.4-3.27-1.05-3.27-2.99 0-1.5 1.16-2.48 2.67-2.82V5.09h2.67v1.93c1.55.36 2.62 1.4 2.76 3.04h-1.96c-.11-.81-.84-1.42-1.94-1.42-1.1 0-1.75.55-1.75 1.35 0 .71.5 1.06 1.96 1.39 1.75.4 3.27 1.05 3.27 3.02 0 1.56-1.14 2.54-2.67 2.88z"/>
                  </svg>
                  <span className="font-semibold text-sm">Dinero</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTipoDonacion('in_kind')}
                  className={`p-4 rounded-lg border-2 transition text-center ${
                    tipoDonacion === 'in_kind'
                      ? 'border-red-600 bg-red-50 text-red-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <svg className="w-6 h-6 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-.9-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4h16v3z"/>
                  </svg>
                  <span className="font-semibold text-sm">Especie</span>
                </button>
              </div>
            </div>

            {/* ====== TIPO DE DONANTE ====== */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Tipo de donante</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setEsAnonimo(false)}
                  className={`p-3 rounded-lg border-2 transition text-center ${
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
                  className={`p-3 rounded-lg border-2 transition text-center ${
                    esAnonimo
                      ? 'border-red-600 bg-red-50 text-red-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span className="font-semibold text-sm">Anónimo</span>
                </button>
              </div>
            </div>

            {/* ====== DATOS PERSONALES (SI NO ES ANÓNIMO) ====== */}
            {!esAnonimo && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.donor_name}
                    onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
                  <input
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
              </div>
            )}

            {/* ====== SI ES DINERO: MONTO ====== */}
            {tipoDonacion === 'money' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monto de la donación (CLP)</label>
                <input
                  type="number"
                  placeholder="Ej: 20000"
                  value={formData.amount_clp}
                  onChange={(e) => setFormData({ ...formData, amount_clp: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            )}

            {/* ====== SI ES ESPECIE: DESCRIPCIÓN Y LUGAR ====== */}
            {tipoDonacion === 'in_kind' && (
              <>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Nota:</strong> Una vez enviado el formulario, nuestro equipo se comunicará contigo 
                    para coordinar la entrega de tu donación en especie.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Qué deseas donar?
                  </label>
                  <textarea
                    placeholder="Ej: Ropa en buen estado, alimentos no perecibles, útiles escolares..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad / Comuna
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Santiago"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Cómo prefieres coordinar la entrega?
                  </label>
                  <select
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Coordinación por WhatsApp">Que me contacten por WhatsApp</option>
                    <option value="Coordinación por correo">Que me contacten por correo</option>
                    <option value="Entrega en sede">Llevar la donación a la sede de HNV</option>
                  </select>
                </div>
              </>
            )}

            {/* ====== BOTÓN DE ENVÍO ====== */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold transition disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Registrar donación'}
            </button>
          </form>
        </div>

        {/* ====== INFORMACIÓN ADICIONAL ====== */}
        <div className="mt-8 bg-gray-100 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-600">
            Para consultas sobre donaciones, escríbenos a{' '}
            <a href="mailto:contacto@hnv.org" className="text-red-600 hover:underline font-medium">
              contacto@hnv.org
            </a>{' '}
            o contáctanos por WhatsApp al{' '}
            <a href="https://wa.me/56988923943" className="text-red-600 hover:underline font-medium">
              +569 8892 3943
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}