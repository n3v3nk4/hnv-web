import Link from 'next/link'

export default function ExitoPersonal() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ====== ENCABEZADO ====== */}
      <section className="bg-black text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Éxito Personal</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Consultoría — Acompañamiento Individual hacia el Éxito
          </p>
        </div>
      </section>

      {/* ====== CONTENIDO ====== */}
      <section className="container mx-auto max-w-3xl px-4 py-12">
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <p className="text-gray-700 mb-4">
            La Consultoría Personal HNV es un servicio de coaching y acompañamiento individual diseñado 
            para ayudarte a transformar en acciones concretas lo aprendido en nuestra Masterclass gratuita 
            de desarrollo personal y resolución de problemas.
          </p>
          <p className="text-gray-700 mb-4">
            A través de sesiones personalizadas, trabajamos contigo para identificar tus objetivos, 
            comprender los obstáculos que pueden estar frenando tu avance y construir un plan de acción 
            adaptado a tu realidad.
          </p>
          <p className="text-gray-700 mb-4">
            El acompañamiento puede enfocarse en autoconocimiento, desarrollo personal, organización de 
            objetivos, toma de decisiones, disciplina, resolución de problemas y estrategias para avanzar 
            hacia tu propia definición del éxito.
          </p>
          <p className="text-gray-700 mb-4">
            Cada sesión es un espacio individual de escucha, orientación y planificación, centrado en tus 
            necesidades y metas.
          </p>
          <p className="text-gray-700 font-semibold">
            La Masterclass te entrega conocimientos. El acompañamiento personal te ayuda a aplicarlos a tu propia vida.
          </p>
        </div>

        {/* ====== PAGO ====== */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Reserva tu sesión</h2>
          <p className="text-gray-600 mb-6">
            Realiza el pago y comienza tu proceso de acompañamiento personalizado con HNV.
          </p>
          <a 
            href="https://www.paypal.com/ncp/payment/EX2PXPU2TSSBL" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-lg font-bold transition"
          >
            Pagar y agendar sesión
          </a>
        </div>

      </section>
    </div>
  )
}