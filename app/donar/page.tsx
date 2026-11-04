
'use client'

import { useState } from 'react'
import {
  Heart,
  ArrowRight,
  ExternalLink,
  HandHeart,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import MetodosPago from '@/components/MetodosPago'

export default function Donar() {
  const [loading, setLoading] = useState(false)

  const handleIrARegistro = () => {
    setLoading(true)

    window.open(
      'https://hnv-inscripcion.ambervine18.chatgpt.site',
      '_blank',
      'noopener,noreferrer'
    )

    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ENCABEZADO */}
      <section className="relative isolate overflow-hidden bg-[#090909] px-4 py-24 text-white md:py-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-red-600/20 blur-[110px]" />
          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-red-700/20 blur-[110px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
            <Heart size={15} />
            Tu aporte transforma vidas
          </div>

          <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl">
            Donar<span className="text-red-600">.</span>
          </h1>

          <div className="mx-auto mb-7 h-1 w-20 rounded-full bg-red-600" />

          <p className="mx-auto max-w-2xl text-base leading-8 text-gray-300 md:text-xl">
            Tu aporte contribuye directamente al desarrollo de nuestros
            programas educativos, de bienestar y de apoyo comunitario.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <HandHeart size={17} className="text-red-500" />
              Solidaridad
            </span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center gap-2">
              <Sparkles size={17} className="text-red-500" />
              Desarrollo
            </span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center gap-2">
              <Heart size={17} className="text-red-500" />
              Comunidad
            </span>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="mx-auto max-w-5xl px-4 py-16 md:py-20">
        {/* MÉTODOS DE PAGO */}
        <div className="mb-10 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-7 text-center md:px-10">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              Haz tu aporte
            </span>

            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Elige cómo quieres colaborar
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 md:text-base">
              Cada contribución representa una oportunidad para seguir
              impulsando iniciativas que generan un impacto positivo.
            </p>
          </div>

          <div className="p-5 md:p-10">
            <MetodosPago />
          </div>
        </div>

        {/* REGISTRO DE DONACIÓN */}
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-12">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-red-50" />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <HandHeart size={32} strokeWidth={1.7} />
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              Confirmación de aporte
            </span>

            <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">
              Registra tu donación
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-600">
              Si realizaste una transferencia o deseas dejar constancia de
              tu aporte, completa nuestro formulario de registro.
            </p>

            <button
              type="button"
              onClick={handleIrARegistro}
              disabled={loading}
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-7 py-4 text-base font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-xl disabled:cursor-wait disabled:opacity-60 sm:w-auto"
            >
              {loading ? 'Abriendo formulario...' : 'Ir al formulario de registro'}

              <ExternalLink size={19} />
            </button>

            <div className="mt-7 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck size={16} className="text-green-600" />
              Registro de donaciones HNV
            </div>
          </div>
        </div>

        {/* MENSAJE FINAL */}
        <div className="mt-12 text-center">
          <Heart size={22} className="mx-auto mb-3 fill-red-600 text-red-600" />
          <p className="text-sm font-medium text-gray-500">
            Gracias por ser parte de una comunidad que trabaja por un futuro mejor.
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-red-600">
            Fundación Humanidad Nueva Visión
          </p>
        </div>
      </section>
    </main>
  )
}
