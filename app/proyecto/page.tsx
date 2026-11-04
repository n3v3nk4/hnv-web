
import Image from 'next/image'
import MetodosPago from '@/components/MetodosPago'
import {
  BookOpen,
  Users,
  Heart,
  ArrowDown,
  Building2,
  Sparkles
} from 'lucide-react'

const pilares = [
  {
    titulo: 'Educación',
    descripcion: 'Formación, capacitación y desarrollo de habilidades.',
    icon: BookOpen,
    numero: '01'
  },
  {
    titulo: 'Acompañamiento',
    descripcion: 'Orientación y apoyo personalizado.',
    icon: Users,
    numero: '02'
  },
  {
    titulo: 'Bienestar',
    descripcion: 'Espacios y programas para el bienestar físico y emocional.',
    icon: Heart,
    numero: '03'
  }
]

export default function Proyecto() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-gray-900">

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#111111] px-5 py-24 text-white md:py-32">

        <div className="absolute inset-0 -z-10">
          <div className="absolute -right-32 -top-40 h-[450px] w-[450px] rounded-full bg-red-700/20 blur-[120px]" />
          <div className="absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full bg-red-600/10 blur-[110px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />
        </div>

        <div className="mx-auto max-w-5xl text-center">

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2">
            <Building2 size={15} className="text-red-400" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-300">
              Fundación HNV
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl">
            Nuestro <span className="text-red-500">Proyecto</span>
          </h1>

          <div className="mx-auto my-7 h-1 w-20 rounded-full bg-red-600" />

          <p className="mx-auto max-w-2xl text-base leading-8 text-gray-300 md:text-xl">
            Campus Comunitarios HNV — Un ecosistema para el desarrollo integral
          </p>

          <a
            href="#campus"
            className="group mt-9 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:bg-red-600"
          >
            Conoce nuestro proyecto
            <ArrowDown size={17} className="transition-transform group-hover:translate-y-1" />
          </a>

        </div>
      </section>


      {/* CAMPUS COMUNITARIO */}
      <section id="campus" className="bg-gray-50 px-5 py-16 md:py-24">

        <div className="mx-auto max-w-6xl">

          {/* Encabezado */}
          <div className="mb-10 text-center">

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              Nuestra visión
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-950 md:text-4xl">
              El Gran Proyecto
            </h2>

            <p className="mt-3 text-lg font-medium text-gray-500">
              Campus Comunitario HNV
            </p>

            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-red-600" />

          </div>

          {/* Imagen original */}
          <div className="group relative mb-12 h-[280px] w-full overflow-hidden rounded-3xl bg-gray-200 shadow-xl sm:h-[380px] md:h-[520px]">

            <Image
              src="/campus.jpg"
              alt="Campus Comunitario HNV"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 p-6 sm:p-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                <Sparkles size={14} className="text-red-400" />
                Desarrollo integral
              </span>

              <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Un espacio para crecer y construir comunidad
              </h3>
            </div>

          </div>

          {/* Descripción */}
          <div className="grid items-start gap-8 rounded-3xl border border-gray-100 bg-white p-7 shadow-sm md:grid-cols-[0.7fr_1.3fr] md:p-12">

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                Nuestra iniciativa
              </span>

              <h3 className="mt-3 text-2xl font-extrabold leading-tight text-gray-950 md:text-3xl">
                El desarrollo de las personas es el centro de nuestra visión.
              </h3>

              <div className="mt-5 h-1 w-14 rounded-full bg-red-600" />
            </div>

            <div className="space-y-5 text-base leading-8 text-gray-600">

              <p>
                Todo esto se hará realidad mediante grandes campus comunitarios
                estructurados como un verdadero ecosistema, que constituyen
                nuestro gran proyecto de construcción.
              </p>

              <p>
                Allí, cada persona encontrará un entorno bien equipado con
                herramientas, programas, servicios y oportunidades necesarias
                para desarrollar plenamente su potencial, mejorar su calidad
                de vida y estar preparada para contribuir al desarrollo de
                la comunidad en la que vive.
              </p>

            </div>
          </div>

        </div>
      </section>


      {/* PILARES DEL PROYECTO */}
      <section className="bg-white px-5 py-16 md:py-24">

        <div className="mx-auto max-w-6xl">

          <div className="mb-12 text-center">

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              Nuestro compromiso
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-950 md:text-4xl">
              Los pilares de nuestro proyecto
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-500">
              Un ecosistema que integra distintas áreas para contribuir
              al desarrollo integral de las personas y sus comunidades.
            </p>

            <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-red-600" />

          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

            {pilares.map((pilar) => {
              const Icon = pilar.icon

              return (
                <article
                  key={pilar.numero}
                  className="group rounded-2xl border border-gray-100 bg-gray-50 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-red-200 hover:bg-white hover:shadow-xl"
                >

                  <div className="mb-7 flex items-center justify-between">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-red-600 shadow-sm transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
                      <Icon size={27} />
                    </div>

                    <span className="text-sm font-bold tracking-widest text-gray-300">
                      {pilar.numero}
                    </span>

                  </div>

                  <h3 className="text-xl font-bold text-gray-950">
                    {pilar.titulo}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-500">
                    {pilar.descripcion}
                  </p>

                  <div className="mt-7 h-1 w-10 rounded-full bg-red-600 transition-all duration-300 group-hover:w-16" />

                </article>
              )
            })}

          </div>
        </div>
      </section>


      {/* MÉTODOS DE PAGO */}
      <section className="bg-gray-50 px-5 py-16 md:py-20">

        <div className="mx-auto max-w-5xl">

          <div className="mb-10 text-center">

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
              Apoya nuestra iniciativa
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-950 md:text-4xl">
              Sé parte del proyecto
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-500">
              Tu aporte contribuye a impulsar nuestra visión de desarrollo
              y bienestar comunitario.
            </p>

            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-red-600" />

          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">

            <MetodosPago />

          </div>

        </div>
      </section>

    </main>
  )
}
