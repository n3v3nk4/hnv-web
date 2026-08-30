'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { LogOut, Users, RefreshCw } from 'lucide-react'

export default function Admin() {
  const [members, setMembers] = useState<any[]>([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [sessionEmail, setSessionEmail] = useState('')

  useEffect(() => {
    checkSession()
  }, [])

  async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      setLoggedIn(true)
      setSessionEmail(session.user.email || '')
      fetchMembers()
    }
  }

  async function login(e: any) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) {
      setLoggedIn(true)
      setSessionEmail(email)
      fetchMembers()
    } else {
      alert('Credenciales incorrectas')
    }
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      setLoggedIn(false)
      setSessionEmail('')
      setMembers([])
    }
  }

  async function fetchMembers() {
    const { data } = await supabase.from('members').select('*')
    setMembers(data || [])
  }

  if (!loggedIn) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4 text-red-600">Panel Admin</h1>
        <p className="text-center text-gray-600 mb-8">Acceso exclusivo para el equipo directivo</p>
        <form onSubmit={login} className="space-y-4 bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
          <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none" />
          <button type="submit" className="w-full bg-red-600 text-white p-4 rounded-xl font-bold hover:bg-red-700 transition">Iniciar sesión</button>
        </form>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Miembros Registrados</h1>
        <div className="flex gap-2">
          <button onClick={fetchMembers} className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition">
            <RefreshCw size={18} />
          </button>
          <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition">
            <span className="flex items-center gap-2">
              <LogOut size={18} />
              Cerrar Sesión
            </span>
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-6">
        <span className="font-bold">Sesión iniciada como:</span> {sessionEmail}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-xl rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-red-600 to-black text-white">
              <th className="p-4 text-left">Nombre</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Plan</th>
              <th className="p-4 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-4">{member.full_name}</td>
                <td className="p-4">{member.email}</td>
                <td className="p-4">{member.plan_type}</td>
                <td className="p-4">{member.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Donaciones</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-xl rounded-2xl overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-4 text-left">Donante</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Tipo</th>
                <th className="p-4 text-left">Monto</th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No hay donaciones registradas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}