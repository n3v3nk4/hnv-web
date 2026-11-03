'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AdminDonaciones() {
  const [donaciones, setDonaciones] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_auth')
    if (isAuth !== 'true') {
      router.push('/admin')
      return
    }
    cargarDonaciones()
  }, [router])

  const cargarDonaciones = async () => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setDonaciones(data || [])
    } catch (error) {
      console.error('Error al cargar donaciones:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Registro de Donaciones</h1>
          <button 
            onClick={() => router.push('/admin')} 
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition flex items-center gap-2"
          >
            ← Volver al Panel
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {loading ? (
          <p className="text-center text-gray-600">Cargando donaciones...</p>
        ) : donaciones.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500">Aún no hay donaciones registradas.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donante</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donaciones.map((d) => (
                    <tr key={d.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{d.donor_name || 'Anónimo'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{d.email || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${d.amount_clp || '0'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${d.donation_type === 'money' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          {d.donation_type === 'money' ? 'Dinero' : 'Especie'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(d.created_at).toLocaleDateString('es-CL')}
                      </td>
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