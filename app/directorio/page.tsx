import ImagenConFallback from '@/components/ImagenConFallback'

export default function Directorio() {
  const directivos = [
    {
      nombre: 'Jesula Ostassia Vital Édouard',
      cargo: 'Presidenta',
      foto: '/presidenta.jpg',
      descripcion: 'Lidera la fundación con visión y compromiso, impulsando el desarrollo integral de las comunidades a través de la educación, el acompañamiento y el bienestar.',
      email: 'nuevavisionfundacion2026@gmail.com'
    },
    {
      nombre: 'Cristopher Isaias Salas Espinoza',
      cargo: 'Tesorero',
      foto: '/tesorero.jpg',
      descripcion: 'Responsable de la gestión financiera y la transparencia en el uso de los recursos de la fundación, asegurando el correcto destino de cada aporte.',
      email: 'nuevavisionfundacion2026@gmail.com'
    },
    {
      nombre: 'Jenny Paul',
      cargo: 'Secretaria',
      foto: '/secretaria.jpg',
      descripcion: 'Encargada de la coordinación administrativa, la gestión documental y el apoyo a las actividades y programas de la fundación.',
      email: 'nuevavisionfundacion2026@gmail.com'
    }
  ]

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
            Nuestro Directorio
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6" />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Conoce al equipo que lidera Humanidad Nueva Visión y que trabaja día a día 
            para construir nuevas oportunidades para nuestra comunidad.
          </p>
        </div>
      </section>

      {/* ====== DIRECTORIO ====== */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {directivos.map((directivo, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Cuadro de foto */}
              <div className="relative aspect-3/4 bg-linear-to-b from-gray-100 to-gray-200 overflow-hidden">
                <ImagenConFallback
                  src={directivo.foto}
                  alt={directivo.nombre}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
                  priority={index === 0}
                />
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-red-600 via-red-500 to-red-600" />
              </div>

              {/* Información */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-black mb-2">
                  {directivo.nombre}
                </h3>
                <p className="text-red-600 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                  {directivo.cargo}
                </p>
                
                <div className="w-12 h-0.5 bg-gray-200 mx-auto mb-4" />
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {directivo.descripcion}
                </p>
                
                <a 
                  href={`mailto:${directivo.email}`}
                  className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-red-600 transition break-all"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{directivo.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== COMPROMISO ====== */}
      <section className="bg-white py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-red-600 uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            Nuestro compromiso
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
            Transparencia y dedicación
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8" />
          <p className="text-gray-600 leading-relaxed text-lg">
            El directorio de HNV trabaja de manera transparente y comprometida para asegurar 
            que cada programa, proyecto y aporte contribuya al desarrollo integral de las personas 
            y las comunidades que acompañamos.
          </p>
        </div>
      </section>

      {/* ====== CONTACTO ====== */}
      <section className="container mx-auto max-w-4xl px-4 pb-20">
        <div className="bg-linear-to-br from-black to-gray-900 rounded-2xl p-10 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-3xl opacity-20" />
          
          <div className="relative z-10">
            <p className="text-red-500 uppercase tracking-[0.3em] text-xs font-semibold mb-4">
              Contacto directo
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Necesitas contactar al directorio?
            </h3>
            <p className="text-gray-400 text-sm mb-8 max-w-xl mx-auto">
              Puedes escribirnos directamente y te pondremos en contacto con el área correspondiente.
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="mailto:nuevavisionfundacion2026@gmail.com"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition transform hover:scale-105"
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
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition transform hover:scale-105"
              >
                WhatsApp 1
              </a>
              <a
                href="https://wa.me/56991327162"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full font-semibold text-sm transition transform hover:scale-105"
              >
                WhatsApp 2
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}