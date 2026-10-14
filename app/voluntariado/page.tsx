'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Voluntariado() {
  const [loading, setLoading] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '', email: '', phone: '', area_of_interest: '', message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('volunteers').insert([formData])
    if (!error) {
      setEnviado(true)
      setFormData({ full_name: '', email: '', phone: '', area_of_interest: '', message: '' })
    } else {
      alert('Error al enviar. Por favor intenta nuevamente.')
    }
    setLoading(false)
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
            Únete a nuestro equipo
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Ser Voluntario</h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6" />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Aporta tu tiempo, talento y conocimientos para transformar vidas junto a nosotros.
          </p>
        </div>
      </section>

      {/* ====== FORMULARIO ====== */}
      <section className="container mx-auto max-w-3xl px-4 py-20">
        
        {enviado ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-black mb-3">¡Gracias por postular!</h2>
            <p className="text-gray-600 mb-8">Hemos recibido tu solicitud. Nos pondremos en contacto a la brevedad.</p>
            <a href="/" className="inline-block bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition">
              Volver al inicio
            </a>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
            <h2 className="text-2xl font-bold text-black mb-2">Postula como voluntario</h2>
            <p className="text-gray-600 text-sm mb-8">
              Completa el formulario y cuéntanos en qué área te gustaría colaborar.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo *</label>
                <input 
                  type="text" 
                  placeholder="Tu nombre completo" 
                  value={formData.full_name} 
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} 
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" 
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico *</label>
                  <input 
                    type="email" 
                    placeholder="tucorreo@ejemplo.com" 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
                  <input 
                    type="tel" 
                    placeholder="+56 9 XXXX XXXX" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Área de interés</label>
                <select 
                  value={formData.area_of_interest} 
                  onChange={(e) => setFormData({ ...formData, area_of_interest: e.target.value })} 
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Selecciona un área</option>
                  <option value="Educación">Educación</option>
                  <option value="Bienestar">Bienestar</option>
                  <option value="Comunicaciones">Comunicaciones</option>
                  <option value="Eventos">Eventos</option>
                  <option value="Administración">Administración</option>
                  <option value="Otra">Otra</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">¿Por qué quieres ser voluntario?</label>
                <textarea 
                  placeholder="Cuéntanos sobre ti y tu motivación..." 
                  value={formData.message} 
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                  rows={4} 
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'Enviar postulación'}
              </button>
            </form>
          </div>
        )}

        {/* Contacto */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Tienes dudas? Escríbenos a{' '}
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