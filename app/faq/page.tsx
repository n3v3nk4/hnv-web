
'use client'

import { useState, type FormEvent } from 'react'
import {
  ChevronDown,
  MessageCircle,
  Mail,
  Send,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  Phone,
} from 'lucide-react'

const faqs = [
  {
    pregunta: '¿Quiénes somos?',
    respuesta: `HNV es una fundación sin fines de lucro que existe para asegurar la intervención de la Matriarca, ofreciendo una nueva alternativa de vida a los hijos. Nuestro trabajo es acompañar a las personas, capacitarlas para que se conozcan a sí mismas, se enfoquen en sí mismas, transformen sus vidas para fortalecer la comunidad donde viven.

Promovemos el desarrollo integral a través de la educación, el autoconocimiento, el bienestar, el emprendimiento, el trabajo y la vivienda. Todo esto se hará realidad mediante grandes campus comunitarios estructurados como un verdadero ecosistema, que constituyen nuestro gran proyecto de construcción.

Allí, cada persona encontrará un entorno bien equipado con herramientas, programas, servicios y oportunidades necesarias para desarrollar plenamente su potencial, mejorar su calidad de vida y estar preparada para contribuir al desarrollo de la comunidad en la que vive.

Creemos que cada persona posee capacidades, talentos y potencial que pueden desarrollarse cuando recibe conocimiento, orientación, acompañamiento y oportunidades. Por eso, fundación HNV trabaja para crear espacios y programas destinados al desarrollo personal, la formación, el bienestar, la solidaridad, el emprendimiento y la transformación comunitaria.

Nuestra visión es construir una nueva manera de acompañar a las personas para que puedan descubrir sus capacidades, superar dificultades, desarrollar sus proyectos y avanzar hacia una vida con mayor bienestar y autonomía.`,
  },
  {
    pregunta: '¿Cuál es la misión de HNV?',
    respuesta: 'Nuestra misión es acompañar a las personas en el desarrollo de sus capacidades y potencial, brindándoles conocimientos, herramientas, servicios y oportunidades que les permitan avanzar hacia una vida con mayor autonomía y bienestar.',
  },
  {
    pregunta: '¿Cuál es el gran proyecto de HNV?',
    respuesta: 'Nuestro gran proyecto es la creación de los Campus Comunitarios HNV, concebidos como ecosistemas donde las personas puedan encontrar formación, bienestar, servicios, programas, herramientas y oportunidades en un mismo lugar.',
  },
  {
    pregunta: '¿Quién puede formar parte de HNV?',
    respuesta: 'Toda persona que comparta nuestros valores y desee participar, aprender, desarrollarse o contribuir a nuestra misión puede solicitar ser miembro de HNV.',
  },
  {
    pregunta: '¿Cómo puedo hacerme miembro?',
    respuesta: 'Puedes completar el formulario disponible en la sección "Hazte Miembro" de nuestra página web y seleccionar la modalidad de membresía que prefieras.',
  },
  {
    pregunta: '¿Cuáles son las opciones de membresía?',
    respuesta: 'HNV dispone de diferentes aportes mensuales de membresía: $15.000, $20.000 y $100.000. Cada persona puede elegir la opción que mejor se adapte a sus posibilidades.',
  },
  {
    pregunta: '¿Qué beneficios tienen los miembros?',
    respuesta: 'Los miembros pueden acceder a beneficios y actividades organizadas por HNV, entre ellos masterclasses de desarrollo personal, actividades de bienestar y otros programas que se irán incorporando progresivamente.',
  },
  {
    pregunta: '¿Puedo participar sin ser miembro?',
    respuesta: 'Sí. HNV desarrolla diferentes actividades, campañas y oportunidades de participación. Sin embargo, algunos programas o beneficios pueden estar destinados específicamente a los miembros.',
  },
  {
    pregunta: '¿Cómo puedo hacer una donación?',
    respuesta: 'Puedes ingresar a la sección "Donar" de nuestra página web y elegir la modalidad disponible para realizar tu aporte.',
  },
  {
    pregunta: '¿Las donaciones tienen que ser solamente en dinero?',
    respuesta: 'No. HNV puede recibir tanto donaciones monetarias como donaciones en especie, de acuerdo con las necesidades y condiciones de recepción de la Fundación.',
  },
  {
    pregunta: '¿Qué tipo de donaciones en especie puedo realizar?',
    respuesta: 'Dependiendo de las necesidades de nuestros programas, pueden considerarse productos, materiales, equipamiento, alimentos, artículos de higiene, útiles, mobiliario u otros recursos que puedan contribuir a nuestras actividades.',
  },
  {
    pregunta: '¿Puedo ser voluntario/a en HNV?',
    respuesta: 'Sí. Puedes registrarte en la sección "Ser Voluntario" e indicar tus conocimientos, habilidades, profesión, disponibilidad o área en la que deseas colaborar.',
  },
  {
    pregunta: '¿Necesito tener una profesión para ser voluntario/a?',
    respuesta: 'No. Valoramos tanto los conocimientos profesionales como los talentos, habilidades, experiencia, tiempo y disposición para colaborar.',
  },
  {
    pregunta: '¿Qué es el Club Matriarca?',
    respuesta: 'Es un espacio de participación y apoyo a la misión de HNV que busca fortalecer la solidaridad, el liderazgo, la colaboración y la contribución de las mujeres a nuestros proyectos.',
  },
  {
    pregunta: '¿Qué es el Club Patriarca?',
    respuesta: 'Es un espacio de participación y apoyo que invita a los hombres a contribuir activamente al desarrollo de los proyectos de HNV, fortaleciendo la responsabilidad, la solidaridad, el liderazgo y el compromiso comunitario.',
  },
  {
    pregunta: '¿Puedo participar en las actividades de HNV si soy extranjero/a?',
    respuesta: 'Sí. HNV promueve la participación y la integración de las personas sin importar su nacionalidad u origen, de acuerdo con los requisitos específicos de cada programa.',
  },
  {
    pregunta: '¿HNV entrega dinero directamente a las personas?',
    respuesta: 'El propósito principal de HNV no es limitarse a entregar ayuda económica. Buscamos proporcionar conocimientos, acompañamiento, herramientas, servicios y oportunidades que permitan a las personas desarrollar capacidades y avanzar hacia una mayor autonomía.',
  },
  {
    pregunta: '¿HNV ofrece cursos y capacitaciones?',
    respuesta: 'Sí. La educación, el autoconocimiento y el desarrollo personal forman parte de los pilares de HNV. La Fundación proyecta desarrollar masterclasses, talleres, capacitaciones y diferentes programas formativos.',
  },
  {
    pregunta: '¿Dónde puedo conocer las actividades y novedades de HNV?',
    respuesta: 'Puedes consultar nuestra página web y nuestros canales oficiales, donde publicaremos actividades, convocatorias, proyectos, campañas y novedades.',
  },
  {
    pregunta: '¿Puedo colaborar con HNV si tengo una empresa o emprendimiento?',
    respuesta: 'Sí. Empresas, profesionales, emprendedores e instituciones pueden colaborar mediante alianzas, patrocinio, prestación de servicios, aportes, donaciones u otras formas de cooperación.',
  },
  {
    pregunta: '¿Cómo puede una empresa convertirse en patrocinadora de HNV?',
    respuesta: 'Puede ponerse en contacto con nuestro equipo para presentar una propuesta de colaboración o solicitar información sobre nuestras modalidades de patrocinio y alianzas estratégicas.',
  },
  {
    pregunta: '¿Cómo utiliza HNV las donaciones recibidas?',
    respuesta: 'Los recursos recibidos se destinan al cumplimiento de los objetivos de la Fundación, sus programas, actividades, funcionamiento y desarrollo de proyectos, conforme a las normas y obligaciones aplicables.',
  },
  {
    pregunta: '¿Dónde funciona HNV?',
    respuesta: 'HNV es una fundación constituida en Chile y desarrolla progresivamente sus programas, actividades y alianzas para llevar adelante su misión.',
  },
  {
    pregunta: '¿Cómo puedo contactar a HNV?',
    respuesta: 'Puedes utilizar el formulario de contacto disponible en nuestra página web para realizar consultas, solicitar información, proponer una alianza o comunicarte con nuestro equipo. También puedes escribirnos a nuevavisionfundacion2026@gmail.com o por WhatsApp al +569 8892 3943 / +56 991327162.',
  },
]

export default function FAQ() {
  const [abierto, setAbierto] = useState<number | null>(0)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const mensaje = `Hola, Fundación Humanidad Nueva Visión.

Quisiera realizar una consulta:

Nombre: ${formData.nombre}
Correo: ${formData.email}

Consulta:
${formData.mensaje}

Quedo atento/a a su respuesta. Muchas gracias.`

    const url = `https://wa.me/56988923943?text=${encodeURIComponent(mensaje)}`

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#111111] px-6 py-24 text-white md:py-32">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-red-700/20 blur-[100px]" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-red-600/10 blur-[100px]" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-600/10">
            <HelpCircle className="h-8 w-8 text-red-500" />
          </div>

          <span className="mb-5 inline-block rounded-full border border-white/15 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-red-400">
            Fundación Humanidad Nueva Visión
          </span>

          <h1 className="mb-6 text-4xl font-black tracking-tight md:text-6xl">
            Preguntas <span className="text-red-500">Frecuentes</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
            Encuentra respuestas a las dudas más comunes sobre nuestra
            fundación, nuestros proyectos y las diferentes formas de participar.
          </p>
        </div>
      </section>

      {/* PREGUNTAS */}
      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-red-600">
              Centro de ayuda
            </span>
            <h2 className="mt-3 text-3xl font-black text-gray-900 md:text-4xl">
              ¿En qué podemos ayudarte?
            </h2>
            <p className="mt-4 text-gray-500">
              Selecciona una pregunta para conocer su respuesta.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const estaAbierto = abierto === index

              return (
                <div
                  key={index}
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    estaAbierto
                      ? 'border-red-200 bg-white shadow-lg shadow-red-900/5'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setAbierto(estaAbierto ? null : index)}
                    aria-expanded={estaAbierto}
                    aria-controls={`respuesta-${index}`}
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left md:px-7"
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                          estaAbierto
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span
                        className={`text-sm font-bold md:text-base ${
                          estaAbierto ? 'text-red-700' : 'text-gray-800'
                        }`}
                      >
                        {faq.pregunta}
                      </span>
                    </span>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                        estaAbierto
                          ? 'rotate-180 text-red-600'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>

                  {estaAbierto && (
                    <div
                      id={`respuesta-${index}`}
                      className="border-t border-gray-100 px-5 pb-6 pt-5 md:px-7"
                    >
                      <p className="whitespace-pre-line pl-0 text-sm leading-8 text-gray-600 md:pl-[52px] md:text-base">
                        {faq.respuesta}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CONTACTO WHATSAPP */}
      <section className="relative overflow-hidden bg-[#111111] px-5 py-20 text-white md:px-8">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-red-600/15 blur-[100px]" />

        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-400">
              <MessageCircle className="h-4 w-4" />
              Atención directa
            </span>

            <h2 className="mt-6 text-3xl font-black leading-tight md:text-5xl">
              ¿Aún tienes <span className="text-red-500">dudas?</span>
            </h2>

            <p className="mt-5 max-w-lg leading-8 text-gray-300">
              Estamos aquí para ayudarte. Envíanos tu consulta y nuestro equipo
              podrá orientarte directamente por WhatsApp.
            </p>

            <div className="mt-9 space-y-5">
              <a
                href="https://wa.me/56988923943"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-gray-200 transition hover:text-white"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/15 text-green-400">
                  <MessageCircle className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-sm text-gray-400">
                    WhatsApp principal
                  </span>
                  <span className="font-bold">+56 9 8892 3943</span>
                </span>
              </a>

              <a
                href="https://wa.me/56991327162"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-gray-200 transition hover:text-white"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/15 text-green-400">
                  <Phone className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-sm text-gray-400">
                    WhatsApp alternativo
                  </span>
                  <span className="font-bold">+56 9 9132 7162</span>
                </span>
              </a>

              <a
                href="mailto:nuevavisionfundacion2026@gmail.com"
                className="flex items-center gap-4 text-gray-200 transition hover:text-white"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/15 text-red-400">
                  <Mail className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-sm text-gray-400">
                    Correo electrónico
                  </span>
                  <span className="break-all font-bold">
                    nuevavisionfundacion2026@gmail.com
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* FORMULARIO */}
          <div className="rounded-3xl border border-white/10 bg-white p-6 text-gray-900 shadow-2xl md:p-9">
            <div className="mb-7">
              <h3 className="text-2xl font-black">
                Envíanos tu consulta
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Completa los datos y continuaremos la conversación por WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="nombre"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Nombre completo
                </label>
                <input
                  id="nombre"
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  placeholder="Escribe tu nombre"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="mensaje"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  ¿En qué podemos ayudarte?
                </label>
                <textarea
                  id="mensaje"
                  required
                  rows={5}
                  value={formData.mensaje}
                  onChange={(e) =>
                    setFormData({ ...formData, mensaje: e.target.value })
                  }
                  placeholder="Escribe aquí tu pregunta..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-6 py-4 font-bold text-white shadow-lg shadow-red-600/20 transition hover:-translate-y-0.5 hover:bg-red-700"
              >
                <MessageCircle className="h-5 w-5" />
                Enviar consulta por WhatsApp
                <ArrowRight className="h-5 w-5" />
              </button>

              <p className="text-center text-xs leading-5 text-gray-400">
                Se abrirá WhatsApp con tu mensaje preparado. Deberás presionar
                enviar dentro de WhatsApp para completar el envío.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
