
import Link from 'next/link'
import {
  ArrowRight,
  Target,
  Lightbulb,
  Compass,
  Brain,
  CheckCircle2,
  CalendarDays,
  MessageCircle,
  ClipboardCheck,
  Sparkles,
  ShieldCheck
} from 'lucide-react'

const areas = [
  {
    titulo: 'Autoconocimiento',
    desc: 'Descubre tus fortalezas y valores.',
    icon: Brain
  },
  {
    titulo: 'Desarrollo personal',
    desc: 'Construye hábitos para crecer.',
    icon: Sparkles
  },
  {
    titulo: 'Objetivos',
    desc: 'Define metas y un plan realista.',
    icon: Target
  },
  {
    titulo: 'Decisiones',
    desc: 'Aprende a decidir con confianza.',
    icon: Compass
  },
  {
    titulo: 'Disciplina',
    desc: 'Desarrolla la constancia.',
    icon: CheckCircle2
  },
  {
    titulo: 'Resolución de problemas',
    desc: 'Enfrenta obstáculos con estrategias.',
    icon: Lightbulb
  }
]

const pasos = [
  {
    num: '01',
    titulo: 'Reserva',
    desc: 'Paga y agenda tu sesión.',
    icon: CalendarDays
  },
  {
    num: '02',
    titulo: 'Sesión',
    desc: 'Espacio de escucha y orientación.',
    icon: MessageCircle
  },
  {
    num: '03',
    titulo: 'Plan',
    desc: 'Construimos un plan para ti.',
    icon: ClipboardCheck
  }
]

export default function ExitoPersonal() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-gray-900">

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#111111] px-5 py-24 text-white md:py-32">

        <div className="absolute inset-0 -z-10">
          <div className="absolute -right-32 -top-40 h-[450px] w-[450px] rounded-full bg-red-700/20 blur-[120px]" />
          <div className="absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full bg-red-600/10 blur-[110px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50" />
        </div>

        <div className="relative mx-auto max-w-5xl text-center">

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2">
            <Sparkles size={14} className="text-red-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-300">
              Consultoría HNV
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl">
            Éxito <span className="text-red-500">Personal</span>
          </h1>

          <div className="mx-auto my-7 h-1 w-20 rounded-full bg-red-600" />

          <p className="mx-auto max-w-2xl text-base leading-8 text-gray-300 md:text-xl">
            Acompañamiento individual para transformar en acciones concretas
            lo aprendido en nuestra Masterclass gratuita.
          </p>

          <a
            href="#reserva"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-red-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-red-950/30 transition-all duration-300 hover:-translate-y-1 hover:bg-red-700"
          >
            Reserva tu sesión
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>

          <p className="mt-6 text-xs tracking-wide text-gray-400">
            Un espacio para avanzar hacia tu mejor versión
          </p>
        </div>
      </section>


      {/* INTRODUCCIÓN */}
      <section className="bg-gray-50 px-5 py-16 md:py-24">

        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              Acompañamiento individual
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-gray-950 md:text-4xl">
              Tu crecimiento comienza con una decisión.
            </h2>

            <div className="mt-5 h-1 w-16 rounded-full bg-red-600" />

            <p className="mt-6 leading-8 text-gray-600">
              Un proceso pensado para ayudarte a llevar tus ideas,
              conocimientos y objetivos a la práctica.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm md:p-10">

            <div className="mb-7 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <Target size={25} />
              </div>

              <h3 className="text-2xl font-bold text-gray-950">
                ¿En qué consiste?
              </h3>
            </div>

            <div className="space-y-5 leading-8 text-gray-600">
              <p>
                La Consultoría Personal HNV es un servicio de coaching y
                acompañamiento individual diseñado para ayudarte a
                transformar en acciones concretas lo aprendido en nuestra
                Masterclass gratuita.
              </p>

              <p>
                A través de sesiones personalizadas, trabajamos contigo
                para identificar tus objetivos, comprender los obstáculos
                y construir un plan de acción adaptado a tu realidad.
              </p>
            </div>

            <div className="mt-8 rounded-r-xl border-l-4 border-red-600 bg-red-50 px-6 py-5">
              <p className="text-sm font-semibold italic leading-7 text-gray-800 md:text-base">
                "La Masterclass te entrega conocimientos. El acompañamiento
                personal te ayuda a aplicarlos."
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ÁREAS DE TRABAJO */}
      <section className="bg-white px-5 py-16 md:py-24">

        <div className="mx-auto max-w-6xl">

          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              Tu proceso de crecimiento
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-950 md:text-4xl">
              ¿En qué podemos trabajar?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-gray-500">
              Cada proceso es diferente. Identificamos contigo las áreas
              que necesitas fortalecer.
            </p>

            <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-red-600" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {areas.map((area, index) => {
              const Icon = area.icon

              return (
                <div
                  key={area.titulo}
                  className="group rounded-2xl border border-gray-100 bg-gray-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:bg-white hover:shadow-xl"
                >

                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-red-600 shadow-sm transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
                      <Icon size={23} />
                    </div>

                    <span className="text-xs font-bold tracking-widest text-gray-300">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-950">
                    {area.titulo}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {area.desc}
                  </p>

                  <div className="mt-6 h-0.5 w-8 rounded-full bg-red-600 transition-all duration-300 group-hover:w-14" />
                </div>
              )
            })}

          </div>
        </div>
      </section>


      {/* CÓMO FUNCIONA */}
      <section className="bg-gray-50 px-5 py-16 md:py-24">

        <div className="mx-auto max-w-6xl">

          <div className="mb-14 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              Un proceso sencillo
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-950 md:text-4xl">
              ¿Cómo funciona?
            </h2>

            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-red-600" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

            {pasos.map((paso, index) => {
              const Icon = paso.icon

              return (
                <div key={paso.num} className="relative text-center">

                  <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#151515] text-white shadow-xl">
                    <Icon size={30} className="text-red-400" />

                    <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-gray-50 bg-red-600 text-xs font-bold text-white">
                      {paso.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-950">
                    {paso.titulo}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {paso.desc}
                  </p>

                  {index !== 2 && (
                    <div className="absolute left-[65%] top-10 hidden h-px w-[70%] bg-gray-200 md:block" />
                  )}

                </div>
              )
            })}

          </div>
        </div>
      </section>


      {/* RESERVA Y PAGO */}
      <section id="reserva" className="bg-white px-5 py-16 md:py-24">

        <div className="mx-auto max-w-5xl">

          <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#111111] px-6 py-14 text-center shadow-2xl sm:px-12 md:py-16">

            <div className="absolute -right-20 -top-32 -z-10 h-80 w-80 rounded-full bg-red-600/20 blur-[90px]" />
            <div className="absolute -bottom-32 -left-20 -z-10 h-80 w-80 rounded-full bg-red-700/15 blur-[90px]" />

            <div className="relative">

              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400">
                <CalendarDays size={27} />
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                Da el siguiente paso
              </span>

              <h2 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">
                Reserva tu sesión
              </h2>

              <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-400">
                Comienza tu proceso de acompañamiento personal y convierte
                tus objetivos en un plan de acción.
              </p>

              <div className="mx-auto my-8 max-w-sm rounded-2xl border border-white/10 bg-white/[0.05] p-6">

                <p className="text-sm text-gray-400">
                  Valor de la sesión
                </p>

                <p className="mt-2 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                  $100.000
                </p>

                <p className="mt-1 text-sm font-semibold tracking-widest text-red-400">
                  CLP
                </p>

              </div>

              <a
                href="https://www.paypal.com/ncp/payment/EX2PXPU2TSSBL"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-full bg-red-600 px-8 py-4 font-bold text-white shadow-lg shadow-red-950/30 transition-all duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-xl"
              >
                Pagar y agendar
                <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
              </a>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheck size={16} className="text-green-400" />
                <span>Pago a través de PayPal</span>
              </div>

            </div>
          </div>

        </div>
      </section>

    </main>
  )
}
