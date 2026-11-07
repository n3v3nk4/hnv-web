
'use client'

import { useState } from 'react'
import {
  Check,
  Crown,
  Users,
  TrendingUp,
  Building2,
  ExternalLink,
  ArrowRight,
  HeartHandshake,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'

export default function HazteMiembro() {
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

  const planes = [
    {
      nombre: 'Plan Comunidad',
      precio: '$15.000',
      descripcion: 'El primer paso para ser parte de HNV.',
      icono: Users,
      beneficios: [
        'Masterclass gratuita',
        'Descuentos en eventos',
      ],
      link: 'https://mpago.la/2iu3HWY',
    },
    {
      nombre: 'Plan Desarrollo',
      precio: '$20.000',
      descripcion: 'Más oportunidades para impulsar tu crecimiento.',
      icono: TrendingUp,
      destacado: true,
      beneficios: [
        'Todo el plan Comunidad',
        'Masaje relajante trimestral',
      ],
      link: 'https://mpago.la/2vERYZQ',
    },
    {
      nombre: 'Plan Visionario',
      precio: '$100.000',
      descripcion: 'Una experiencia de participación preferente.',
      icono: Crown,
      beneficios: [
        'Todo el plan Desarrollo',
        'Acceso directo a la fundadora',
        'Eventos VIP',
      ],
      link: 'https://mpago.la/1EUvzmY',
    },
    {
      nombre: 'Plan Empresa',
      precio: 'A convenir',
      descripcion: 'Alianzas para organizaciones que quieren generar impacto.',
      icono: Building2,
      beneficios: [
        'Todo el plan Visionario',
        'Alianzas estratégicas',
        'Patrocinio de proyectos',
        'Beneficios corporativos',
      ],
      link: 'https://mpago.la/1Urzham',
    },
  ]

  return (
    <main className="min-h-screen bg-[#f7f7f8]">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#090909] px-4 py-24 text-white md:py-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-red-600/20 blur-[110px]" />
          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-red-700/20 blur-[110px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
            <HeartHandshake size={16} />
            Comunidad HNV
          </div>

          <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl">
            Hazte <span className="text-red-600">miembro</span>
          </h1>

          <div className="mx-auto mb-7 h-1 w-20 rounded-full bg-red-600" />

          <p className="mx-auto max-w-2xl text-base leading-8 text-gray-300 md:text-xl">
            Forma parte de una comunidad que busca crecer, aprender y
            construir nuevas oportunidades.
          </p>

          <a
            href="#planes"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-red-600 px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-red-700"
          >
            Conoce nuestros planes
            <ArrowRight size={19} />
          </a>
        </div>
      </section>

      {/* PLANES */}
      <section
        id="planes"
        className="mx-auto max-w-7xl scroll-mt-10 px-4 py-16 md:py-24"
      >
        <div className="mb-14 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
            Encuentra tu membresía
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
            Nuestros planes
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-500">
            Elige el nivel de membresía que mejor se adapte a tus
            posibilidades y sé parte de nuestra comunidad.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {planes.map((plan) => {
            const Icono = plan.icono

            return (
              <article
                key={plan.nombre}
                className={`relative flex flex-col rounded-3xl border bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  plan.destacado
                    ? 'border-red-500 shadow-lg shadow-red-600/10 ring-1 ring-red-500'
                    : 'border-gray-200 shadow-sm'
                }`}
              >
                {plan.destacado && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-red-600 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                    Más popular
                  </div>
                )}

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <Icono size={27} strokeWidth={1.8} />
                </div>

                <h3 className="text-xl font-extrabold text-gray-900">
                  {plan.nombre}
                </h3>

                <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-500">
                  {plan.descripcion}
                </p>

                <div className="my-6 border-b border-gray-100 pb-6">
                  <p className="text-3xl font-extrabold tracking-tight text-red-600">
                    {plan.precio}
                  </p>

                  {plan.precio !== 'A convenir' && (
                    <span className="mt-1 block text-sm text-gray-400">
                      CLP / mes
                    </span>
                  )}
                </div>

                <div className="mb-8 flex-1">
                  <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Beneficios incluidos
                  </p>

                  <ul className="space-y-4">
                    {plan.beneficios.map((beneficio) => (
                      <li
                        key={beneficio}
                        className="flex items-start gap-3 text-sm leading-5 text-gray-600"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                          <Check size={13} strokeWidth={3} />
                        </span>
                        {beneficio}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition ${
                    plan.destacado
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-[#111111] text-white hover:bg-red-600'
                  }`}
                >
                  {plan.precio === 'A convenir'
                    ? 'Consultar plan'
                    : 'Suscribirse'}
                  <ExternalLink size={16} />
                </a>
              </article>
            )
          })}
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          Los valores indicados corresponden a los precios mensuales de
          las membresías.
        </p>
      </section>

      {/* REGISTRO */}
      <section
        id="formulario"
        className="mx-auto max-w-5xl scroll-mt-10 px-4 pb-20"
      >
        <div className="relative overflow-hidden rounded-3xl bg-[#0b0b0b] px-7 py-14 text-center text-white shadow-xl md:px-16 md:py-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/15 blur-[90px]" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-red-600/10 blur-[90px]" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-500">
              <Sparkles size={30} />
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
              Únete a HNV
            </span>

            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
              Registra tu membresía
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-400">
              Para completar tu registro, ingresa a nuestro formulario
              y proporciona los datos solicitados.
            </p>

            <button
              type="button"
              onClick={handleIrARegistro}
              disabled={loading}
              className="mt-9 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-7 py-4 font-bold text-white shadow-lg shadow-red-600/20 transition hover:-translate-y-1 hover:bg-red-700 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
            >
              {loading ? 'Abriendo formulario...' : 'Ir al formulario de registro'}
              <ExternalLink size={19} />
            </button>

            <p className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck size={15} className="text-green-500" />
              Formulario de registro HNV
            </p>
          </div>
        </div>
      </section>

      {/* CIERRE */}
      <section className="border-t border-gray-200 bg-white px-4 py-10 text-center">
        <HeartHandshake size={25} className="mx-auto mb-3 text-red-600" />

        <p className="text-sm font-medium text-gray-500">
          Gracias por ser parte de una comunidad que construye nuevas oportunidades.
        </p>

        <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-red-600">
          Fundación Humanidad Nueva Visión
        </p>
      </section>
    </main>
  )
}
