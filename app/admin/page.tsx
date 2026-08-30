'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { LogOut, Users, Heart, Handshake, RefreshCw, Upload } from 'lucide-react'

export default function Admin() {
  const [members, setMembers] = useState<any[]>([])
  const [donations, setDonations] = useState<any[]>([])
  const [volunteers, setVolunteers] = useState<any[]>([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [sessionEmail, setSessionEmail] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    checkSession()
  }, [])

  async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      setLoggedIn(true)
      setSessionEmail(session.user.email || '')
      fetchAllData()
    }
  }

  async function login(e: any) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) {
      setLoggedIn(true)
      setSessionEmail(email)
      fetchAllData()
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
      setDonations([])
      setVolunteers([])
    }
  }

  async function fetchAllData() {
    const [membersRes, donationsRes, volunteersRes] = await Promise.all([
      supabase.from('members').select('*'),
      supabase.from('donations').select('*'),
      supabase.from('volunteers').select('*')
    ])
    setMembers(membersRes.data || [])
    setDonations(donationsRes.data || [])
    setVolunteers(volunteersRes.data || [])
  }

  async function uploadImage(e: any) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const fileName = `${Date.now()}_${file.name}`

    // Dirección URL para supabase.storage
    const { error } = await supabase.storage.from('galeria').upload(fileName, file)
    if (!error) {
      alert('✅ Foto subida correctamente!')
      fetchAllData()
    } else {
      console.error('Error de Supabase:', error)
      alert('❌ Foto subida correctamente!')
    }
    setUploading(false)
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
    <div className="container mx-auto py-16 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold mb-4 md:mb-0">Panel de Administración</h1>
        <div className="flex gap-2">
          <button onClick={fetchAllData} className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition">
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

      <div className="space-y-12">
        <!-- Miembros -->
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Users size={24} className="text-red-600" />
            Miembros Registrados
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left">Nombre</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Plan</th>
                  <th className="p-4 text-left">Estado</th>
                  <th className="p-4 text-left">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-4">{member.full_name}</td>
                    <td className="p-4">{member.email}</td>
                    <td className="p-4">{member.plan_type}</td>
                    <td className="p-4">{member.status}</td>
                    <td className="p-4">{member.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Donaciones -->
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Heart size={24} className="text-red-600" />
            Donaciones
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left">Donante</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Tipo</th>
                  <th className="p-4 text-left">Monto</th>
                  <th className="p-4 text-left">Ciudad</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-4">{donation.donor_name}</td>
                    <td className="p-4">{donation.email}</td>
                    <td className="p-4">{donation.donation_type}</td>
                    <td className="p-4">{donation.amount_clp}</td>
                    <td className="p-4">{donation.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Voluntarios -->
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Handshake size={24} className="text-red-600" />
            Voluntarios
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left">Nombre</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Teléfono</th>
                  <th className="p-4 text-left">Área</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((volunteer) => (
                  <tr key={volunteer.id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-4">{volunteer.full_name}</td>
                    <td className="p-4">{volunteer.email}</td>
                    <td className="p-4">{volunteer.phone}</td>
                    <td className="p-4">{volunteer.area_of_interest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Galería (Solo admin) -->
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Upload size={24} className="text-red-600" />
            Galería de Fotos
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input type="file" onChange={uploadImage} className="hidden" id="upload" />
            <label htmlFor="upload" className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition">
              {uploading ? 'Subiendo...' : 'Subir Foto'}
            </label>
            <p className="text-gray-600 text-sm">
              Solo los administradores pueden subir fotos a la galería.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}