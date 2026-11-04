
'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import {
  Crown,
  Heart,
  Trophy,
  Users,
  HandHeart,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

export default function ClubMatriarca() {
  const [mensaje, setMensaje] = useState('')
  const [nombre, setNombre] = useState('')
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const texto = `¡Hola, Fundación HNV! 👑

Soy ${nombre} y quiero compartir este mensaje con el Club Matriarca:

${mensaje}`

    const whatsapp = `https://wa.me/56988923943?text=${encodeURIComponent(texto)}`

    window.open(whatsapp, '_blank', 'noopener,noreferrer')

    setEnviado(true)
    setNombre('')
    setMensaje('')
  }

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-[#111111] px-4 py-20 text-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/club-matriarca.jpg')" }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-red-600/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/30 bg-red-600/20 text-red-400">
            <Crown size={34} />
          </div>

          <span className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">
            Club HNV
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">
            MATRIARCA
          </h1>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-red-600" />

          <p className="mt-6 text-lg text-gray-200 sm:text-xl">
            Liderazgo, sabiduría y transformación.
          </p>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:py-20">

        {/* PRESENTACIÓN */}
        <div className="rounded-3xl border border-red-100 bg-red-50/70 p-7 sm:p-10">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <Heart size={25} />
          </div>

          <p className="text-center text-base leading-8 text-gray-700 sm:text-lg">
            Bienvenidos al <strong className="text-gray-950">Club Matriarca</strong> de HNV,
            una iniciativa participativa y solidaria creada para movilizar
            a nuestra comunidad alrededor de una misión común: apoyar la
            construcción y el desarrollo de los proyectos HNV.
          </p>
        </div>

        {/* DESAFÍO */}
        <div className="relative mt-8 overflow-hidden rounded-3xl bg-[#111111] p-8 text-center text-white sm:p-12">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-red-600/20 blur-3xl" />

          <div className="relative">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600/20 text-red-400">
              <Trophy size={30} />
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
              Nuestro desafío
            </span>

            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
              Desafío solidario
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-300">
              ¿Quién logrará movilizar más apoyo para los proyectos HNV?
            </p>

            <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-600/10 px-5 py-3 text-sm font-bold text-red-400">
              <Crown size={19} />
              ¡Saldrá el Rey o la Reina del año!
            </div>
          </div>
        </div>

        {/* ESTADÍSTICAS */}
        <div className="mt-12">
          <div className="mb-7 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              Nuestro avance
            </span>

            <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
              El impacto del Club
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <HandHeart size={28} />
              </div>

              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                Total recaudado
              </p>

              <p className="mt-2 text-3xl font-extrabold text-gray-900">
                $0 CLP
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Aportes registrados
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <Users size={28} />
              </div>

              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                Número de participantes
              </p>

              <p className="mt-2 text-3xl font-extrabold text-gray-900">
                0
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Comunidad participante
              </p>
            </div>
          </div>
        </div>

        {/* APOYAR */}
        <div className="mt-12 rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-8 text-center sm:p-10">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/20">
            <Heart size={28} />
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900">
            Sé parte de este desafío
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-600">
            Cada aporte suma al objetivo común de HNV.
            ¡La competencia es solidaria y juntos podemos lograr grandes cosas!
          </p>

          <Link
            href="/donar"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 font-bold text-white shadow-lg shadow-red-600/20 transition hover:-translate-y-1 hover:bg-red-700"
          >
            <HandHeart size={20} />
            APOYAR AL CLUB MATRIARCA
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* MENSAJES */}
        <div className="mt-14">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <MessageCircle size={28} />
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              Participa con nosotros
            </span>

            <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Deja tu mensaje
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Comparte tus palabras de apoyo, motivación o cariño
              para nuestra comunidad.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-9">
            {enviado && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                <Sparkles size={20} className="shrink-0" />
                <p>
                  Tu mensaje está preparado en WhatsApp. Recuerda
                  presionar enviar para compartirlo con la fundación.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Tu nombre
                </label>

                <input
                  type="text"
                  placeholder="Escribe tu nombre..."
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  maxLength={100}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Tu mensaje
                </label>

                <textarea
                  placeholder="Escribe tu mensaje de apoyo..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  required
                  maxLength={1500}
                  rows={5}
                  className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#111111] px-8 py-4 font-bold text-white transition hover:bg-red-600 sm:w-auto"
              >
                <MessageCircle size={19} />
                Enviar mensaje por WhatsApp
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

      </section>
    </main>
  )
}
