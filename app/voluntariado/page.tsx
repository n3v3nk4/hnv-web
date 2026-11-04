
'use client'

import { useState, type FormEvent } from 'react'
import {
  Users,
  HeartHandshake,
  Mail,
  MessageCircle,
  Send,
  CheckCircle2,
  ArrowRight,
  HandHeart,
} from 'lucide-react'

export default function Voluntariado() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    area_of_interest: '',
    message: '',
  })

  const [abierto, setAbierto] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const mensaje = `¡Hola, Fundación Humanidad Nueva Visión!

Quisiera postular como voluntario/a.

DATOS DEL POSTULANTE

Nombre: ${formData.full_name}
Correo: ${formData.email}
Teléfono: ${formData.phone}
Área de interés: ${formData.area_of_interest || 'No especificada'}

Motivación:
${formData.message || 'No especificada'}

Quedo atento/a a su respuesta. ¡Muchas gracias!`

    const url = `https://wa.me/56988923943?text=${encodeURIComponent(mensaje)}`

    window.open(url, '_blank', 'noopener,noreferrer')
    setAbierto(true)
  }

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
            <HeartHandshake size={16} />
            Únete a nuestro equipo
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
            Ser <span className="text-red-600">Voluntario</span>
          </h1>

          <div className="mx-auto mb-7 mt-7 h-1 w-20 rounded-full bg-red-600" />

          <p className="mx-auto max-w-2xl text-base leading-8 text-gray-300 md:text-xl">
            Aporta tu tiempo, talento y conocimientos para transformar vidas
            junto a nosotros.
          </p>
        </div>
      </section>

      {/* INTRODUCCIÓN */}
      <section className="bg-white px-4 py-14">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center transition hover:border-red-200 hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <HeartHandshake size={27} />
            </div>
            <h3 className="font-bold text-gray-900">Compromiso</h3>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Sé parte de iniciativas que generan un impacto positivo.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center transition hover:border-red-200 hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Users size={27} />
            </div>
            <h3 className="font-bold text-gray-900">Comunidad</h3>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Colabora con personas que comparten una misma misión.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center transition hover:border-red-200 hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <HandHeart size={27} />
            </div>
            <h3 className="font-bold text-gray-900">Transformación</h3>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Tus talentos y conocimientos pueden marcar la diferencia.
            </p>
          </div>

        </div>
      </section>

      {/* FORMULARIO */}
      <section className="bg-[#f8f8f8] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">

          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              Forma parte de HNV
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
              Postula como voluntario
            </h2>

            <div className="mx-auto my-6 h-1 w-20 rounded-full bg-red-600" />

            <p className="mx-auto max-w-xl leading-7 text-gray-500">
              Completa tus datos y cuéntanos cómo te gustaría colaborar
              con nuestra fundación.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

            <div className="h-1.5 bg-gradient-to-r from-red-800 via-red-500 to-red-800" />

            <div className="p-6 md:p-10">

              {abierto && (
                <div className="mb-7 flex gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <div>
                    <p className="font-bold text-green-800">
                      Tu postulación está preparada
                    </p>
                    <p className="mt-1 text-sm leading-6 text-green-700">
                      WhatsApp se abrió con tus datos. Recuerda presionar
                      enviar dentro de WhatsApp para completar tu postulación.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* NOMBRE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Nombre completo *
                  </label>

                  <input
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                    required
                  />
                </div>

                {/* CORREO Y TELÉFONO */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Correo electrónico *
                    </label>

                    <input
                      type="email"
                      placeholder="tucorreo@ejemplo.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Teléfono *
                    </label>

                    <input
                      type="tel"
                      placeholder="+56 9 XXXX XXXX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                      required
                    />
                  </div>

                </div>

                {/* ÁREA */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Área de interés
                  </label>

                  <select
                    value={formData.area_of_interest}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        area_of_interest: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
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

                {/* MOTIVACIÓN */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    ¿Por qué quieres ser voluntario?
                  </label>

                  <textarea
                    placeholder="Cuéntanos sobre ti y tu motivación..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={5}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                  />
                </div>

                {/* ENVÍO */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-6 py-4 font-bold text-white shadow-lg shadow-red-600/20 transition hover:-translate-y-0.5 hover:bg-red-700"
                >
                  <MessageCircle size={20} />
                  Enviar postulación por WhatsApp
                  <ArrowRight size={18} />
                </button>

                <p className="text-center text-xs leading-5 text-gray-400">
                  Tus datos se incorporarán al mensaje de WhatsApp.
                  La postulación se completa al confirmar el envío.
                </p>

              </form>
            </div>
          </div>

          {/* CONTACTO */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <MessageCircle size={22} />
            </div>

            <p className="text-sm text-gray-600">
              ¿Tienes dudas sobre el voluntariado?
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm">
              <a
                href="mailto:nuevavisionfundacion2026@gmail.com"
                className="font-semibold text-red-600 transition hover:text-red-800 hover:underline"
              >
                <Mail size={14} className="mr-1 inline" />
                Escríbenos por correo
              </a>

              <span className="text-gray-300">|</span>

              <a
                href="https://wa.me/56988923943"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-green-600 transition hover:text-green-700 hover:underline"
              >
                <MessageCircle size={14} className="mr-1 inline" />
                +56 9 8892 3943
              </a>
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}
