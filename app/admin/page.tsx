'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Admin() {
  const [members, setMembers] = useState<any[]>([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    checkSession()
  }, [])

  async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) setLoggedIn(true)
  }

  async function login(e: any) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) {
      setLoggedIn(true)
      fetchMembers()
    } else {
      alert('Credenciales incorrectas')
    }
  }

  async function fetchMembers() {
    const { data } = await supabase.from('members').select('*')
    setMembers(data || [])
  }

  if (!loggedIn) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Panel Admin</h1>
        <form onSubmit={login} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
          <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded" />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded" />
          <button type="submit" className="w-full bg-black text-white p-3 rounded font-bold">Iniciar sesión</button>
        </form>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Miembros Registrados</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Plan</th>
              <th className="p-3 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-t">
                <td className="p-3">{member.full_name}</td>
                <td className="p-3">{member.email}</td>
                <td className="p-3">{member.plan_type}</td>
                <td className="p-3">{member.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}