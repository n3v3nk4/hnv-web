import Link from 'next/link'
import Image from 'next/image'

export default function Club() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-5xl font-bold text-center mb-4">CLUB MATRIARCA 👑 / CLUB PATRIARCA 🛡️</h1>
      <p className="text-center text-gray-600 mb-12">Dos fuerzas. Una misma misión.</p>
      
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 mb-12">
        <p className="text-lg text-gray-700 mb-4">Bienvenidos al Club Matriarca y Club Patriarca de HNV, una iniciativa participativa y solidaria creada para movilizar a nuestra comunidad alrededor de una misión común: apoyar la construcción y el desarrollo de los proyectos HNV.</p>
        
        <div className="bg-gray-50 p-6 rounded-2xl mb-6">
          <h2 className="text-2xl font-bold mb-2">🏆 Desafío solidario</h2>
          <p>Quién logrará movilizar más apoyo para los proyectos HNV. ¡Ahí saldrá el rey o la reina del año!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <div className="relative h-[300px] rounded-2xl overflow-hidden mb-6">
            <Image src="/club-matriarca.jpg" alt="Club Matriarca" fill className="object-cover" />
          </div>
          <h2 className="text-2xl font-bold mb-2">👑 CLUB MATRIARCA</h2>
          <p className="text-gray-700 mb-4">Total recaudado: $________ CLP</p>
          <p className="text-gray-700 mb-6">Número de participantes: _____</p>
          <Link href="/donar" className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition">
            APOYAR AL CLUB MATRIARCA
          </Link>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <div className="relative h-[300px] rounded-2xl overflow-hidden mb-6">
            <Image src="/club-patriarca.jpg" alt="Club Patriarca" fill className="object-cover" />
          </div>
          <h2 className="text-2xl font-bold mb-2">🛡️ CLUB PATRIARCA</h2>
          <p className="text-gray-700 mb-4">Total recaudado: $________ CLP</p>
          <p className="text-gray-700 mb-6">Número de participantes: _____</p>
          <Link href="/donar" className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition">
            APOYAR AL CLUB PATRIARCA
          </Link>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 mb-12">
        <h2 className="text-2xl font-bold mb-4">💬 Deja tu mensaje</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Nombre o apodo" className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input type="radio" name="club" /> Matriarca
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="club" /> Patriarca
            </label>
          </div>
          <textarea placeholder="Comentario" className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
          <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition">PUBLICAR COMENTARIO</button>
        </form>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-4">🏆 CLASIFICACIÓN</h2>
        <p className="text-gray-700">La página podrá mostrar en tiempo real:</p>
        <ul className="list-disc pl-5 text-gray-700 mt-2">
          <li>🥇 Club con mayor aporte acumulado</li>
          <li>👥 Club con más participantes</li>
          <li>❤️ Número total de donaciones</li>
          <li>🏆 Meta alcanzada</li>
          <li>📊 Porcentaje de avance de cada club</li>
        </ul>
      </div>
    </div>
  )
}