import ImagenConFallback from '@/components/ImagenConFallback'

export default function Directorio() {
  const directivos = [
    {
      nombre: 'Jesula Ostassia Vital Édouard',
      cargo: 'Presidenta',
      foto: '/presidenta.jpg',
      descripcion: 'Lidera la fundación con visión y compromiso, impulsando el desarrollo integral de las comunidades a través de la educación, el acompañamiento y el bienestar.',
      email: 'presidencia@hnv.org'
    },
    {
      nombre: 'Cristopher Isaias Salas Espinoza',
      cargo: 'Tesorero',
      foto: '/tesorero.jpg',
      descripcion: 'Responsable de la gestión financiera y la transparencia en el uso de los recursos de la fundación, asegurando el correcto destino de cada aporte.',
      email: 'tesoreria@hnv.org'
    },
    {
      nombre: 'Jenny Paul',
      cargo: 'Secretaria',
      foto: '/secretaria.jpg',
      descripcion: 'Encargada de la coordinación administrativa, la gestión documental y el apoyo a las actividades y programas de la fundación.',
      email: 'secretaria@hnv.org'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      
      <section className="bg-black text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestro Directorio</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Conoce al equipo que lidera Humanidad Nueva Visión y que trabaja día a día 
            para construir nuevas oportunidades.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {directivos.map((directivo, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
            >
              <div className="relative h-80 bg-gray-100">
                <ImagenConFallback
                  src={directivo.foto}
                  alt={directivo.nombre}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center"
                  priority={index === 0}
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-1">{directivo.nombre}</h3>
                <p className="text-red-600 font-semibold text-sm uppercase tracking-wider mb-4">
                  {directivo.cargo}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {directivo.descripcion}
                </p>
                <a 
                  href={`mailto:${directivo.email}`}
                  className="text-sm text-gray-500 hover:text-red-600 transition"
                >
                  {directivo.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Nuestro compromiso</h2>
          <p className="text-gray-600 leading-relaxed">
            El directorio de HNV trabaja de manera transparente y comprometida para asegurar 
            que cada programa, proyecto y aporte contribuya al desarrollo integral de las personas 
            y las comunidades que acompañamos.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-3xl px-4 pb-16">
        <div className="bg-gray-100 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-black mb-2">¿Necesitas contactar a algún miembro del directorio?</h3>
          <p className="text-gray-600 text-sm mb-6">
            Puedes escribirnos directamente y te pondremos en contacto con el área correspondiente.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:nuevavisionfundacion2026@gmail.com"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Enviar correo
            </a>
            <a
              href="https://wa.me/56988923943"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}