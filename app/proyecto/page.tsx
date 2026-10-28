import Image from 'next/image'
import MetodosPago from '@/components/MetodosPago'

export default function Proyecto() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ENCABEZADO */}
      <section className="bg-black text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestro Proyecto</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Campus Comunitarios HNV — Un ecosistema para el desarrollo integral
          </p>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="container mx-auto max-w-5xl px-4 py-12">
        
        {/* Imagen del Campus */}
        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl mb-12">
          <Image 
            src="/campus.jpg" 
            alt="Campus Comunitario HNV" 
            fill 
            sizes="(max-width: 768px) 100vw, 80vw" 
            className="object-cover object-center" 
            priority 
          />
        </div>

        {/* Texto descriptivo */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-bold text-black mb-4">El Gran Proyecto: Campus Comunitario HNV</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Todo esto se hará realidad mediante grandes campus comunitarios estructurados como un verdadero ecosistema, que constituyen nuestro gran proyecto de construcción.
            </p>
            <p>
              Allí, cada persona encontrará un entorno bien equipado con herramientas, programas, servicios y oportunidades necesarias para desarrollar plenamente su potencial, mejorar su calidad de vida y estar preparada para contribuir al desarrollo de la comunidad en la que vive.
            </p>
          </div>
        </div>

        {/* 3 Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-black mb-2">Educación</h3>
            <p className="text-gray-600 text-sm">Formación, capacitación y desarrollo de habilidades.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-black mb-2">Acompañamiento</h3>
            <p className="text-gray-600 text-sm">Orientación y apoyo personalizado.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-black mb-2">Bienestar</h3>
            <p className="text-gray-600 text-sm">Espacios y programas para el bienestar físico y emocional.</p>
          </div>
        </div>

        {/* MÉTODOS DE PAGO */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <MetodosPago />
        </div>

      </section>
    </div>
  )
}