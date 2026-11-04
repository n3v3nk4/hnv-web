
import ImagenConFallback from '@/components/ImagenConFallback'
import {
  Mail,
  MessageCircle,
  ShieldCheck,
  Users,
  ArrowUpRight,
  Landmark,
} from 'lucide-react'

export default function Directorio() {
  const directivos = [
    {
      nombre: 'Jesula Ostassia Vital Édouard',
      cargo: 'Presidenta',
      foto: '/presidenta.jpg',
      descripcion:
        'Lidera la fundación con visión y compromiso, impulsando el desarrollo integral de las comunidades a través de la educación, el acompañamiento y el bienestar.',
      email: 'nuevavisionfundacion2026@gmail.com',
    },
    {
      nombre: 'Cristopher Isaias Salas Espinoza',
      cargo: 'Tesorero',
      foto: '/tesorero.jpg',
      descripcion:
        'Responsable de la gestión financiera y la transparencia en el uso de los recursos de la fundación, asegurando el correcto destino de cada aporte.',
      email: 'nuevavisionfundacion2026@gmail.com',
    },
    {
      nombre: 'Jenny Paul',
      cargo: 'Secretaria',
      foto: '/secretaria.jpg',
      descripcion:
        'Encargada de la coordinación administrativa, la gestión documental y el apoyo a las actividades y programas de la fundación.',
      email: 'nuevavisionfundacion2026@gmail.com',
    },
  ]

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#090909] px-4 py-24 text-white md:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-red-600/20 blur-[110px]" />
          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-red-700/20 blur-[110px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
            <Landmark size={16} />
            Humanidad Nueva Visión
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
            Nuestro <span className="text-red-600">directorio</span>
          </h1>

          <div className="mx-auto mb-7 mt-7 h-1 w-20 rounded-full bg-red-600" />

          <p className="mx-auto max-w-2xl text-base leading-8 text-gray-300 md:text-xl">
            Conoce al equipo que lidera Humanidad Nueva Visión y que trabaja
            día a día para construir nuevas oportunidades para nuestra comunidad.
          </p>
        </div>
      </section>

      {/* EQUIPO DIRECTIVO */}
      <section className="bg-white px-4 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">

          <div className="mb-14 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              Equipo directivo
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
              Las personas detrás de HNV
            </h2>

            <div className="mx-auto my-6 h-1 w-16 rounded-full bg-red-600" />

            <p className="mx-auto max-w-2xl leading-7 text-gray-500">
              Un equipo comprometido con la organización, la transparencia y
              el desarrollo de nuestra comunidad.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {directivos.map((directivo, index) => (
              <article
                key={directivo.cargo}
                className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-red-200 hover:shadow-xl"
              >
                {/* FOTOGRAFÍA */}
                <div className="relative aspect-[4/4.5] overflow-hidden bg-gray-100">
                  <ImagenConFallback
                    src={directivo.foto}
                    alt={directivo.nombre}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
                    priority={index === 0}
                  />

                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 via-red-500 to-red-700" />
                </div>

                {/* INFORMACIÓN */}
                <div className="p-7">
                  <div className="mb-4">
                    <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-red-600">
                      {directivo.cargo}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold leading-snug text-gray-900">
                    {directivo.nombre}
                  </h3>

                  <div className="my-5 h-px w-full bg-gray-100" />

                  <p className="min-h-[120px] text-sm leading-7 text-gray-600">
                    {directivo.descripcion}
                  </p>

                  <a
                    href={`mailto:${directivo.email}`}
                    className="mt-6 flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                  >
                    <Mail size={17} className="mt-0.5 shrink-0" />
                    <span className="break-all">{directivo.email}</span>
                    <ArrowUpRight size={15} className="ml-auto shrink-0" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMPROMISO */}
      <section className="border-y border-gray-100 bg-[#f8f8f8] px-4 py-20 md:py-24">
        <div className="mx-auto max-w-4xl text-center">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <ShieldCheck size={32} strokeWidth={1.7} />
          </div>

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
            Nuestro compromiso
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Transparencia y dedicación
          </h2>

          <div className="mx-auto my-7 h-1 w-20 rounded-full bg-red-600" />

          <p className="mx-auto max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
            El directorio de HNV trabaja de manera transparente y comprometida
            para asegurar que cada programa, proyecto y aporte contribuya al
            desarrollo integral de las personas y las comunidades que acompañamos.
          </p>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="relative isolate overflow-hidden rounded-3xl bg-[#0b0b0b] px-7 py-14 text-center text-white shadow-xl md:px-14 md:py-16">

            <div className="absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-red-600/20 blur-[90px]" />
            <div className="absolute -bottom-20 -left-20 -z-10 h-72 w-72 rounded-full bg-red-600/10 blur-[90px]" />

            <div className="relative mx-auto max-w-2xl">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-500">
                <Users size={30} />
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                Estamos para ayudarte
              </span>

              <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
                Contacta con nuestro directorio
              </h2>

              <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-400">
                Puedes escribirnos directamente y te pondremos en contacto
                con el área correspondiente.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <a
                  href="mailto:nuevavisionfundacion2026@gmail.com"
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-red-700"
                >
                  <Mail size={17} />
                  Correo electrónico
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href="https://wa.me/56988923943"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-green-700"
                >
                  <MessageCircle size={17} />
                  WhatsApp 1
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href="https://wa.me/56991327162"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-green-500/40 bg-green-700/20 px-6 py-3.5 text-sm font-bold text-green-400 transition hover:-translate-y-1 hover:bg-green-700 hover:text-white"
                >
                  <MessageCircle size={17} />
                  WhatsApp 2
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CIERRE */}
      <footer className="border-t border-gray-200 bg-white px-4 py-8 text-center">
        <Landmark size={22} className="mx-auto mb-3 text-red-600" />

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-700">
          Fundación Humanidad Nueva Visión
        </p>

        <p className="mt-2 text-xs text-gray-400">
          Comprometidos con el desarrollo integral de nuestra comunidad.
        </p>
      </footer>
    </main>
  )
}
