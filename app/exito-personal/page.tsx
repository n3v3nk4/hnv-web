import Link from 'next/link'

export default function ExitoPersonal() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ====== ENCABEZADO ELEGANTE ====== */}
      <section className="relative bg-black text-white py-24 px-4 overflow-hidden">
        {/* Patrón decorativo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <p className="text-red-500 uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            Consultoría HNV
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Éxito Personal
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6" />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Acompañamiento individual para transformar en acciones concretas 
            lo aprendido en nuestra Masterclass gratuita.
          </p>
        </div>
      </section>

      {/* ====== INTRODUCCIÓN ====== */}
      <section className="container mx-auto max-w-4xl px-4 py-20">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-black">¿En qué consiste?</h2>
          </div>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              La Consultoría Personal HNV es un servicio de coaching y acompañamiento individual 
              diseñado para ayudarte a transformar en acciones concretas lo aprendido en nuestra 
              Masterclass gratuita de desarrollo personal y resolución de problemas.
            </p>
            <p>
              A través de sesiones personalizadas, trabajamos contigo para identificar tus objetivos, 
              comprender los obstáculos que pueden estar frenando tu avance y construir un plan de 
              acción adaptado a tu realidad.
            </p>
            <p>
              El acompañamiento puede enfocarse en autoconocimiento, desarrollo personal, organización 
              de objetivos, toma de decisiones, disciplina, resolución de problemas y estrategias para 
              avanzar hacia tu propia definición del éxito.
            </p>
          </div>

          <div className="mt-8 bg-gradient-to-r from-red-50 to-transparent border-l-4 border-red-600 p-6 rounded-r-lg">
            <p className="text-gray-800 font-semibold italic">
              "La Masterclass te entrega conocimientos. El acompañamiento personal te ayuda a aplicarlos a tu propia vida."
            </p>
          </div>
        </div>
      </section>

      {/* ====== ÁREAS DE TRABAJO ====== */}
      <section className="bg-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-red-600 uppercase tracking-[0.3em] text-xs font-semibold mb-4">
              Áreas de acompañamiento
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              ¿En qué podemos trabajar juntos?
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { titulo: 'Autoconocimiento', desc: 'Descubre tus fortalezas, valores y áreas de crecimiento personal.' },
              { titulo: 'Desarrollo personal', desc: 'Construye hábitos y herramientas para tu crecimiento continuo.' },
              { titulo: 'Organización de objetivos', desc: 'Define metas claras y traza un plan de acción realista.' },
              { titulo: 'Toma de decisiones', desc: 'Aprende a decidir con claridad y confianza en tu proceso.' },
              { titulo: 'Disciplina', desc: 'Desarrolla la constancia necesaria para alcanzar tus metas.' },
              { titulo: 'Resolución de problemas', desc: 'Enfrenta los obstáculos con estrategias prácticas y efectivas.' }
            ].map((area, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-red-200 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-black mb-2">{area.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CÓMO FUNCIONA ====== */}
      <section className="container mx-auto max-w-5xl px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-red-600 uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            Proceso
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            ¿Cómo funciona?
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="text-lg font-bold text-black mb-2">Reserva tu sesión</h3>
            <p className="text-gray-600 text-sm">
              Realiza el pago a través de PayPal y agenda tu sesión personalizada.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="text-lg font-bold text-black mb-2">Sesión individual</h3>
            <p className="text-gray-600 text-sm">
              Espacio de escucha, orientación y planificación centrado en tus necesidades.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="text-lg font-bold text-black mb-2">Plan de acción</h3>
            <p className="text-gray-600 text-sm">
              Construimos juntos un plan adaptado a tu realidad y objetivos.
            </p>
          </div>
        </div>
      </section>

      {/* ====== PAGO ====== */}
      <section className="container mx-auto max-w-4xl px-4 pb-20">
        <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl p-10 md:p-12 text-center relative overflow-hidden">
          {/* Patrón decorativo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-3xl opacity-20" />
          
          <div className="relative z-10">
            <p className="text-red-500 uppercase tracking-[0.3em] text-xs font-semibold mb-4">
              Comienza ahora
            </p>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Reserva tu sesión
            </h3>
            <p className="text-gray-400 text-sm mb-8 max-w-xl mx-auto">
              Realiza el pago y comienza tu proceso de acompañamiento personalizado con HNV.
            </p>
            
            <a 
              href="https://www.paypal.com/ncp/payment/EX2PXPU2TSSBL" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full font-bold text-lg transition transform hover:scale-105 shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.86a.641.641 0 0 1 .633-.536h6.718c2.182 0 3.867.448 5.006 1.332 1.139.884 1.708 2.185 1.708 3.906 0 .756-.11 1.482-.328 2.178-.219.696-.57 1.343-1.053 1.942-.484.598-1.098 1.093-1.842 1.485-.744.392-1.62.588-2.628.588h-2.356l-1.19 7.516a.641.641 0 0 1-.633.536z"/>
              </svg>
              Pagar y agendar sesión
            </a>

            <p className="text-gray-500 text-xs mt-6">
              Valor de la sesión: $100.000 CLP
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}