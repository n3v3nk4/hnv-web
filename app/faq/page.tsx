'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function FAQ() {
  const [loading, setLoading] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' })
  const [abierto, setAbierto] = useState<number | null>(null)

  const faqs = [
    { pregunta: '¿Qué es HNV?', respuesta: 'HNV — Humanidad Nueva Visión es una fundación sin fines de lucro que trabaja para contribuir al desarrollo de las personas y las comunidades mediante educación, autoconocimiento, desarrollo personal, bienestar, emprendimiento y oportunidades.' },
    { pregunta: '¿Cuál es la misión de HNV?', respuesta: 'Nuestra misión es acompañar a las personas en el desarrollo de sus capacidades y potencial, brindándoles conocimientos, herramientas, servicios y oportunidades que les permitan avanzar hacia una vida con mayor autonomía y bienestar.' },
    { pregunta: '¿Cuál es el gran proyecto de HNV?', respuesta: 'Nuestro gran proyecto es la creación de los Campus Comunitarios HNV, concebidos como ecosistemas donde las personas puedan encontrar formación, bienestar, servicios, programas, herramientas y oportunidades en un mismo lugar.' },
    { pregunta: '¿Quién puede formar parte de HNV?', respuesta: 'Toda persona que comparta nuestros valores y desee participar, aprender, desarrollarse o contribuir a nuestra misión puede solicitar ser miembro de HNV.' },
    { pregunta: '¿Cómo puedo hacerme miembro?', respuesta: 'Puedes completar el formulario disponible en la sección "Hazte Miembro" de nuestra página web y seleccionar la modalidad de membresía que prefieras.' },
    { pregunta: '¿Cuáles son las opciones de membresía?', respuesta: 'HNV dispone de diferentes aportes mensuales de membresía: $5.000, $15.000, $20.000 y $100.000. Cada persona puede elegir la opción que mejor se adapte a sus posibilidades.' },
    { pregunta: '¿Qué beneficios tienen los miembros?', respuesta: 'Los miembros pueden acceder a beneficios y actividades organizadas por HNV, entre ellos masterclasses de desarrollo personal, actividades de bienestar y otros programas que se irán incorporando progresivamente.' },
    { pregunta: '¿Puedo participar sin ser miembro?', respuesta: 'Sí. HNV desarrolla diferentes actividades, campañas y oportunidades de participación. Sin embargo, algunos programas o beneficios pueden estar destinados específicamente a los miembros.' },
    { pregunta: '¿Cómo puedo hacer una donación?', respuesta: 'Puedes ingresar a la sección "Donar" de nuestra página web y elegir la modalidad disponible para realizar tu aporte.' },
    { pregunta: '¿Las donaciones tienen que ser solamente en dinero?', respuesta: 'No. HNV puede recibir tanto donaciones monetarias como donaciones en especie, de acuerdo con las necesidades y condiciones de recepción de la Fundación.' },
    { pregunta: '¿Qué tipo de donaciones en especie puedo realizar?', respuesta: 'Dependiendo de las necesidades de nuestros programas, pueden considerarse productos, materiales, equipamiento, alimentos, artículos de higiene, útiles, mobiliario u otros recursos que puedan contribuir a nuestras actividades.' },
    { pregunta: '¿Puedo ser voluntario/a en HNV?', respuesta: 'Sí. Puedes registrarte en la sección "Ser Voluntario" e indicar tus conocimientos, habilidades, profesión, disponibilidad o área en la que deseas colaborar.' },
    { pregunta: '¿Necesito tener una profesión para ser voluntario/a?', respuesta: 'No. Valoramos tanto los conocimientos profesionales como los talentos, habilidades, experiencia, tiempo y disposición para colaborar.' },
    { pregunta: '¿Qué es el Club Matriarca?', respuesta: 'Es un espacio de participación y apoyo a la misión de HNV que busca fortalecer la solidaridad, el liderazgo, la colaboración y la contribución de las mujeres a nuestros proyectos.' },
    { pregunta: '¿Qué es el Club Patriarca?', respuesta: 'Es un espacio de participación y apoyo que invita a los hombres a contribuir activamente al desarrollo de los proyectos de HNV, fortaleciendo la responsabilidad, la solidaridad, el liderazgo y el compromiso comunitario.' },
    { pregunta: '¿Puedo participar en las actividades de HNV si soy extranjero/a?', respuesta: 'Sí. HNV promueve la participación y la integración de las personas sin importar su nacionalidad u origen, de acuerdo con los requisitos específicos de cada programa.' },
    { pregunta: '¿HNV entrega dinero directamente a las personas?', respuesta: 'El propósito principal de HNV no es limitarse a entregar ayuda económica. Buscamos proporcionar conocimientos, acompañamiento, herramientas, servicios y oportunidades que permitan a las personas desarrollar capacidades y avanzar hacia una mayor autonomía.' },
    { pregunta: '¿HNV ofrece cursos y capacitaciones?', respuesta: 'Sí. La educación, el autoconocimiento y el desarrollo personal forman parte de los pilares de HNV. La Fundación proyecta desarrollar masterclasses, talleres, capacitaciones y diferentes programas formativos.' },
    { pregunta: '¿Dónde puedo conocer las actividades y novedades de HNV?', respuesta: 'Puedes consultar nuestra página web y nuestros canales oficiales, donde publicaremos actividades, convocatorias, proyectos, campañas y novedades.' },
    { pregunta: '¿Puedo colaborar con HNV si tengo una empresa o emprendimiento?', respuesta: 'Sí. Empresas, profesionales, emprendedores e instituciones pueden colaborar mediante alianzas, patrocinio, prestación de servicios, aportes, donaciones u otras formas de cooperación.' },
    { pregunta: '¿Cómo puede una empresa convertirse en patrocinadora de HNV?', respuesta: 'Puede ponerse en contacto con nuestro equipo para presentar una propuesta de colaboración o solicitar información sobre nuestras modalidades de patrocinio y alianzas estratégicas.' },
    { pregunta: '¿Cómo utiliza HNV las donaciones recibidas?', respuesta: 'Los recursos recibidos se destinan al cumplimiento de los objetivos de la Fundación, sus programas, actividades, funcionamiento y desarrollo de proyectos, conforme a las normas y obligaciones aplicables.' },
    { pregunta: '¿Dónde funciona HNV?', respuesta: 'HNV es una fundación constituida en Chile y desarrolla progresivamente sus programas, actividades y alianzas para llevar adelante su misión.' },
    { pregunta: '¿Cómo puedo contactar a HNV?', respuesta: 'Puedes utilizar el formulario de contacto disponible en nuestra página web para realizar consultas, solicitar información, proponer una alianza o comunicarte con nuestro equipo. También puedes escribirnos a nuevavisionfundacion2026@gmail.com o por WhatsApp al +569 8892 3943 / +56 991327162.' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('contact_messages').insert([formData])
    if (!error) {
      setEnviado(true)
      setFormData({ nombre: '', email: '', mensaje: '' })
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
            Humanidad Nueva Visión
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Preguntas Frecuentes
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6" />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Encuentra respuestas a las dudas más comunes sobre nuestra fundación.
          </p>
        </div>
      </section>

      {/* ====== PREGUNTAS ====== */}
      <section className="container mx-auto max-w-4xl px-4 py-20">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <button
                onClick={() => setAbierto(abierto === index ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-gray-50 transition"
              >
                <h3 className="text-base md:text-lg font-bold text-black pr-4">
                  {faq.pregunta}
                </h3>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center transition-transform duration-300 ${abierto === index ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {abierto === index && (
                <div className="px-6 pb-6 pt-0">
                  <div className="w-full h-px bg-gray-200 mb-4" />
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {faq.respuesta}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ====== FORMULARIO DE CONTACTO ====== */}
      <section className="container mx-auto max-w-4xl px-4 pb-20">
        <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl p-10 md:p-12 relative overflow-hidden">
          {/* Patrón decorativo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-3xl opacity-20" />
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <p className="text-red-500 uppercase tracking-[0.3em] text-xs font-semibold mb-4">
                ¿Aún tienes dudas?
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Envíanos tu pregunta
              </h2>
              <p className="text-gray-400 text-sm max-w-xl mx-auto">
                Completa el formulario y te responderemos a la brevedad.
              </p>
            </div>

            {enviado ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-green-700 text-center max-w-lg mx-auto">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-semibold">¡Gracias por escribirnos!</p>
                <p className="text-sm mt-1">Te responderemos a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
                <input 
                  type="text" 
                  placeholder="Tu nombre" 
                  value={formData.nombre} 
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} 
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                  required 
                />
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                  required 
                />
                <textarea 
                  placeholder="Escribe tu pregunta..." 
                  value={formData.mensaje} 
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })} 
                  rows={4} 
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500" 
                  required 
                />
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition disabled:opacity-50"
                >
                  {loading ? 'Enviando...' : 'Enviar pregunta'}
                </button>
              </form>
            )}

            {/* ====== CONTACTO DIRECTO ====== */}
            <div className="mt-10 pt-8 border-t border-white/10 text-center">
              <p className="text-gray-400 text-sm mb-4">O contáctanos directamente:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a 
                  href="mailto:nuevavisionfundacion2026@gmail.com" 
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-medium transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Correo
                </a>
                <a 
                  href="https://wa.me/56988923943" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition"
                >
                  WhatsApp 1
                </a>
                <a 
                  href="https://wa.me/56991327162" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-full text-sm font-medium transition"
                >
                  WhatsApp 2
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}