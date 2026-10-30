'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AdminMiembros() {
  const [miembros, setMiembros] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_auth')
    if (isAuth !== 'true') {
      router.push('/admin')
      return
    }
    cargarMiembros()
  }, [router])

  const cargarMiembros = async () => {
    const { data } = await supabase.from('members').select('*').order('created_at', { ascending: false })
    setMiembros(data || [])
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Solicitudes de Membresía</h1>
          <button onClick={() => router.push('/admin')} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition">← Volver</button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <p className="text-center text-gray-600">Cargando...</p>
        ) : miembros.length === 0 ? (
          <div className="bg-white rounded-2xl border p-12 text-center"><p className="text-gray-500">No hay solicitudes aún.</p></div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {miembros.map((m) => (
                    <tr key={m.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{m.full_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{m.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{m.plan_type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{m.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}