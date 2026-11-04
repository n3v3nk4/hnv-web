
import { Phone, Mail, MessageCircle, ArrowUpRight } from 'lucide-react'

const contactos = [
  {
    numero: '+569 8892 3943',
    enlace: 'https://wa.me/56988923943',
  },
  {
    numero: '+569 2795 3832',
    enlace: 'https://wa.me/56927953832',
  },
]

export default function Contacto() {
  return (
    <main className="min-h-screen bg-white">
      {/* Encabezado */}
      <section className="relative overflow-hidden bg-[#111111] px-4 py-20 text-center text-white">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <span className="mb-5 inline-block rounded-full border border-red-500/40 bg-red-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
            Estamos para ayudarte
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Contáctanos
          </h1>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-red-600" />

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">
            ¿Tienes alguna consulta o necesitas más información?
            Estamos disponibles para orientarte y ayudarte.
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              Canales de atención
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Hablemos
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              Elige el medio que prefieras para comunicarte con
              Fundación Humanidad Nueva Visión.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* WhatsApp */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                <MessageCircle size={28} />
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Teléfonos / WhatsApp
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Escríbenos directamente. Estaremos encantados de
                responder tus consultas.
              </p>

              <div className="mt-6 space-y-3">
                {contactos.map((contacto) => (
                  <a
                    key={contacto.numero}
                    href={contacto.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-4 transition hover:border-red-200 hover:bg-red-50"
                  >
                    <span className="flex items-center gap-3 font-semibold text-gray-800">
                      <Phone size={18} className="text-red-600" />
                      {contacto.numero}
                    </span>
                    <ArrowUpRight
                      size={19}
                      className="text-gray-400"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Correo */}
            <div className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                <Mail size={28} />
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Correo electrónico
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Para consultas, solicitudes o información general,
                puedes escribirnos a nuestro correo.
              </p>

              <a
                href="mailto:contacto@hnv.org"
                className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-4 transition hover:border-red-200 hover:bg-red-50"
              >
                <span className="break-all font-semibold text-gray-800">
                  contacto@hnv.org
                </span>
                <ArrowUpRight
                  size={19}
                  className="shrink-0 text-gray-400"
                />
              </a>
            </div>
          </div>

          {/* Cierre */}
          <div className="mt-10 rounded-2xl bg-[#111111] px-6 py-10 text-center text-white sm:px-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-600/20 text-red-400">
              <MessageCircle size={24} />
            </div>

            <h3 className="mt-5 text-2xl font-bold">
              ¡Estamos aquí para ayudarte!
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-300">
              En Fundación Humanidad Nueva Visión creemos en la
              comunicación cercana y en construir oportunidades
              juntos. Será un gusto saber de ti.
            </p>

            <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-red-600" />
          </div>
        </div>
      </section>
    </main>
  )
}
