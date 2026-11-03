'use client'
import { useState } from 'react'

export default function HazteMiembro() {
  const [loading, setLoading] = useState(false)

  const handleIrARegistro = () => {
    setLoading(true)
    // Abrimos el link de la clienta en una pestaña nueva
    window.open('https://hnv-inscripcion.ambervine18.chatgpt.site', '_blank')
    setTimeout(() => setLoading(false), 2000)
  }

  // Planes en el orden solicitado: Comunidad, Desarrollo, Visionario y Empresa
  const planes = [
    { 
      nombre: 'Plan Comunidad', 
      precio: '$15.000', 
      beneficios: ['Masterclass gratuita', 'Descuentos en eventos', 'Acceso a actividades exclusivas'],
      link: 'https://mpago.la/2iu3HWY'
    },
    { 
      nombre: 'Plan Desarrollo', 
      precio: '$20.000', 
      beneficios: ['Todo el plan Comunidad', 'Masaje relajante trimestral', 'Certificados de participación', 'Asesoría personalizada'],
      link: 'https://mpago.la/2vERYZQ'
    },
    { 
      nombre: 'Plan Visionario', 
      precio: '$100.000', 
      beneficios: ['Todo el plan Desarrollo', 'Acceso directo a la fundadora', 'Eventos VIP', 'Reconocimiento especial'],
      link: 'https://mpago.la/1EUvzmY'
    },
    { 
      nombre: 'Plan Empresa', 
      precio: 'A convenir', 
      beneficios: ['Todo el plan Visionario', 'Alianzas estratégicas', 'Patrocinio de proyectos', 'Beneficios corporativos'],
      link: 'https://mpago.la/1Urzham'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-black text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hazte Miembro</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">Forma parte de una comunidad que busca crecer, aprender y construir nuevas oportunidades.</p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-3">Nuestros Planes</h2>
          <p className="text-gray-600">Elige el nivel de membresía que mejor se adapte a tus posibilidades</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {planes.map((plan, index) => (
            <div key={index} className={`bg-white rounded-2xl shadow-sm border p-6 flex flex-col transition hover:shadow-md ${plan.nombre === 'Plan Desarrollo' ? 'border-red-600 ring-2 ring-red-100' : 'border-gray-200'}`}>
              {plan.nombre === 'Plan Desarrollo' && <span className="self-start bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">Más popular</span>}
              
              <h3 className="text-xl font-bold text-black mb-2">{plan.nombre}</h3>
              <p className="text-2xl font-bold text-red-600 mb-4">
                {plan.precio}
                {plan.precio !== 'A convenir' && <span className="text-sm font-normal text-gray-500"> /mes</span>}
              </p>
              
              <ul className="space-y-2 mb-6 flex-1">
                {plan.beneficios.map((beneficio, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{beneficio}</span>
                  </li>
                ))}
              </ul>
              
              <a href={plan.link} target="_blank" rel="noopener noreferrer" className="block text-center bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition">
                Suscribirse
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN DE REGISTRO (Botón directo a ChatGPT) */}
      <section id="formulario" className="container mx-auto max-w-3xl px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Registra tu membresía</h2>
          <p className="text-gray-600 mb-8">
            Para completar tu registro, haz clic en el siguiente botón. Serás redirigido a nuestro formulario seguro.
          </p>
          
          <button 
            onClick={handleIrARegistro}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            {loading ? 'Abriendo...' : 'Ir al formulario de registro'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Al hacer clic, se abrirá una nueva pestaña con el formulario de registro.
          </p>
        </div>
      </section>
    </div>
  )
}