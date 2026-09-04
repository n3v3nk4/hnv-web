import Link from 'next/link'

export default function FAQ() {
  const faqs = [
    {
      pregunta: '¿Qué es HNV?',
      respuesta: 'HNV — Humanidad Nueva Visión es una fundación sin fines de lucro que trabaja para contribuir al desarrollo de las personas y las comunidades mediante educación, autoconocimiento, desarrollo personal, bienestar, emprendimiento y oportunidades.'
    },
    {
      pregunta: '¿Cuál es la misión de HNV?',
      respuesta: 'Nuestra misión es acompañar a las personas en el desarrollo de sus capacidades y potencial, brindándoles conocimientos, herramientas, servicios y oportunidades que les permitan avanzar hacia una vida con mayor autonomía y bienestar.'
    },
    {
      pregunta: '¿Cuál es el gran proyecto de HNV?',
      respuesta: 'Nuestro gran proyecto es la creación de los Campus Comunitarios HNV, concebidos como ecosistemas donde las personas puedan encontrar formación, bienestar, servicios, programas, herramientas y oportunidades en un mismo lugar.'
    },
    {
      pregunta: '¿Quién puede formar parte de HNV?',
      respuesta: 'Toda persona que comparta nuestros valores y desee participar, aprender, desarrollarse o contribuir a nuestra misión puede solicitar ser miembro de HNV.'
    },
    {
      pregunta: '¿Cómo puedo hacerme miembro?',
      respuesta: 'Puedes completar el formulario disponible en la sección "Hazte Miembro" de nuestra página web y seleccionar la modalidad de membresía que prefieras.'
    },
    {
      pregunta: '¿Cuáles son las opciones de membresía?',
      respuesta: 'HNV dispone de diferentes aportes mensuales de membresía: $5.000, $15.000, $20.000 y $100.000. Cada persona puede elegir la opción que mejor se adapte a sus posibilidades y nivel de compromiso.'
    },
    {
      pregunta: '¿Qué beneficios tienen los miembros?',
      respuesta: 'Los miembros pueden acceder a beneficios y actividades organizadas por HNV, entre ellos masterclasses de desarrollo personal y resolución de problemas, actividades de bienestar y otros programas que se irán incorporando progresivamente.'
    },
    {
      pregunta: '¿Puedo participar sin ser miembro?',
      respuesta: 'Sí. HNV desarrolla diferentes actividades, campañas y oportunidades de participación. Sin embargo, algunos programas o beneficios pueden estar destinados específicamente a los miembros.'
    },
    {
      pregunta: '¿Cómo puedo hacer una donación?',
      respuesta: 'Puedes ingresar a la sección "Donar" de nuestra página web y elegir la modalidad disponible para realizar tu aporte.'
    },
    {
      pregunta: '¿Las donaciones tienen que ser solamente en dinero?',
      respuesta: 'No. HNV puede recibir tanto donaciones monetarias como donaciones en especie, de acuerdo con las necesidades, programas y condiciones de recepción de la Fundación.'
    },
    {
      pregunta: '¿Qué tipo de donaciones en especie puedo realizar?',
      respuesta: 'Dependiendo de las necesidades de nuestros programas, pueden considerarse productos, materiales, equipamiento, alimentos, artículos de higiene, útiles, mobiliario u otros recursos que puedan contribuir a nuestras actividades.'
    },
    {
      pregunta: '¿Puedo ser voluntario/a en HNV?',
      respuesta: 'Sí. Puedes registrarte en la sección "Ser Voluntario" e indicar tus conocimientos, habilidades, profesión, disponibilidad o área en la que deseas colaborar.'
    },
    {
      pregunta: '¿Necesito tener una profesión para ser voluntario/a?',
      respuesta: 'No. Valoramos tanto los conocimientos profesionales como los talentos, habilidades, experiencia, tiempo y disposición para colaborar.'
    },
    {
      pregunta: '¿Qué es el Club Matriarca?',
      respuesta: 'Es un espacio de participación y apoyo a la misión de HNV que busca fortalecer la solidaridad, el liderazgo, la colaboración y la contribución de las mujeres a nuestros proyectos.'
    },
    {
      pregunta: '¿Qué es el Club Patriarca?',
      respuesta: 'Es un espacio de participación y apoyo que invita a los hombres a contribuir activamente al desarrollo de los proyectos de HNV, fortaleciendo la responsabilidad, la solidaridad, el liderazgo y el compromiso comunitario.'
    },
    {
      pregunta: '¿Puedo participar en las actividades de HNV si soy extranjero/a?',
      respuesta: 'Sí. HNV promueve la participación y la integración de las personas sin importar su nacionalidad u origen, de acuerdo con los requisitos específicos de cada programa.'
    },
    {
      pregunta: '¿HNV entrega dinero directamente a las personas?',
      respuesta: 'El propósito principal de HNV no es limitarse a entregar ayuda económica. Buscamos proporcionar conocimientos, acompañamiento, herramientas, servicios y oportunidades que permitan a las personas desarrollar capacidades y avanzar hacia una mayor autonomía.'
    },
    {
      pregunta: '¿HNV ofrece cursos y capacitaciones?',
      respuesta: 'Sí. La educación, el autoconocimiento y el desarrollo personal forman parte de los pilares de HNV. La Fundación proyecta desarrollar masterclasses, talleres, capacitaciones y diferentes programas formativos.'
    },
    {
      pregunta: '¿Dónde puedo conocer las actividades y novedades de HNV?',
      respuesta: 'Puedes consultar nuestra página web y nuestros canales oficiales, donde publicaremos actividades, convocatorias, proyectos, campañas y novedades.'
    },
    {
      pregunta: '¿Puedo colaborar con HNV si tengo una empresa o emprendimiento?',
      respuesta: 'Sí. Empresas, profesionales, emprendedores e instituciones pueden colaborar mediante alianzas, patrocinio, prestación de servicios, aportes, donaciones u otras formas de cooperación.'
    },
    {
      pregunta: '¿Cómo puede una empresa convertirse en patrocinadora de HNV?',
      respuesta: 'Puede ponerse en contacto con nuestro equipo para presentar una propuesta de colaboración o solicitar información sobre nuestras modalidades de patrocinio y alianzas estratégicas.'
    },
    {
      pregunta: '¿Cómo utiliza HNV las donaciones recibidas?',
      respuesta: 'Los recursos recibidos se destinan al cumplimiento de los objetivos de la Fundación, sus programas, actividades, funcionamiento y desarrollo de proyectos, conforme a las normas y obligaciones aplicables.'
    },
    {
      pregunta: '¿Dónde funciona HNV?',
      respuesta: 'HNV es una fundación constituida en Chile y desarrolla progresivamente sus programas, actividades y alianzas para llevar adelante su misión.'
    },
    {
      pregunta: '¿Cómo puedo contactar a HNV?',
      respuesta: 'Puedes utilizar el formulario de contacto disponible en nuestra página web para realizar consultas, solicitar información, proponer una alianza o comunicarte con nuestro equipo.'
    }
  ]

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-4 text-black">Preguntas Frecuentes</h1>
        <p className="text-center text-gray-600 mb-12">Humanidad Nueva Visión</p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6">
              <h3 className="text-lg font-bold text-red-600 mb-2">
                {faq.pregunta}
              </h3>
              <p className="text-gray-700">{faq.respuesta}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-red-50 p-8 rounded-2xl border border-red-200 text-center">
          <h2 className="text-2xl font-bold text-black mb-4">¿NO ENCONTRASTE TU RESPUESTA?</h2>
          <p className="text-gray-700 mb-4">Estamos aquí para orientarte.</p>
          <p className="text-gray-700 mb-6">Contáctanos y envíanos tu pregunta. El equipo de HNV — Humanidad Nueva Visión estará encantado de brindarte más información.</p>
          <Link 
            href="/contacto" 
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition"
          >
            Contáctanos
          </Link>
        </div>
      </div>
    </div>
  )
}