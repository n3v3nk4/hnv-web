import { supabase } from '@/lib/supabaseClient'

async function getGaleria() {
  try {
    // Verificar que supabase esté configurado
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('⚠️ Supabase no configurado en variables de entorno')
      return []
    }

    const { data, error } = await supabase
      .from('galeria')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error al cargar galería:', error)
      return []
    }
    return data || []
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export default async function Galeria() {
  const imagenes = await getGaleria()

  if (!imagenes || imagenes.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Galería</h1>
        <p className="text-center text-gray-500">No hay imágenes disponibles.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-4">Galería</h1>
      <p className="text-center text-gray-600 mb-8">Nuestra comunidad en acción</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {imagenes.map((img) => (
          <div key={img.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
            <div className="relative h-64 bg-gray-100">
              <img 
                src={img.imagen_url} 
                alt={img.titulo || 'Imagen de galería'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            <div className="p-4">
              {img.titulo && (
                <h3 className="font-bold text-lg text-black">{img.titulo}</h3>
              )}
              {img.descripcion && (
                <p className="text-gray-600 text-sm">{img.descripcion}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
