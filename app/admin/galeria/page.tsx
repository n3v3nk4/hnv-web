
'use client'

import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

interface Imagen {
  id: string
  titulo: string
  descripcion: string | null
  imagen_url: string
  created_at: string
}

export default function AdminGaleria() {
  const [imagenes, setImagenes] = useState<Imagen[]>([])
  const [loading, setLoading] = useState(false)
  const [subiendo, setSubiendo] = useState(false)
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [archivo, setArchivo] = useState<File | null>(null)
  const [mensaje, setMensaje] = useState<{
    tipo: 'exito' | 'error'
    texto: string
  } | null>(null)
  const [editando, setEditando] = useState<Imagen | null>(null)

  const router = useRouter()

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_auth')

    if (isAuth !== 'true') {
      router.push('/admin')
      return
    }

    cargarImagenes()
  }, [router])

  // CARGAR ARCHIVOS DE LA GALERÍA
  const cargarImagenes = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('galeria')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setMensaje({
        tipo: 'error',
        texto: `Error al cargar galería: ${error.message}`
      })
    } else if (data) {
      setImagenes(data as Imagen[])
    }

    setLoading(false)
  }

  // SUBIR IMAGEN O VIDEO
  const handleSubir = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!archivo || !titulo.trim()) {
      setMensaje({
        tipo: 'error',
        texto: 'Debes seleccionar un archivo y poner un título.'
      })
      return
    }

    setSubiendo(true)
    setMensaje(null)

    try {
      const fileExt = archivo.name.split('.').pop()

      const fileName = `${Date.now()}-${titulo
        .trim()
        .replace(/\s+/g, '-')}.${fileExt}`

      const filePath = `galeria/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('galeria')
        .upload(filePath, archivo)

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from('galeria')
        .getPublicUrl(filePath)

      const { error: dbError } = await supabase
        .from('galeria')
        .insert([
          {
            titulo: titulo.trim(),
            descripcion: descripcion.trim(),
            imagen_url: urlData.publicUrl
          }
        ])

      if (dbError) throw dbError

      setMensaje({
        tipo: 'exito',
        texto: 'Archivo subido correctamente.'
      })

      setTitulo('')
      setDescripcion('')
      setArchivo(null)

      const input = document.getElementById(
        'archivo'
      ) as HTMLInputElement

      if (input) input.value = ''

      await cargarImagenes()

    } catch (error: unknown) {
      const mensajeError =
        error instanceof Error ? error.message : 'Error desconocido'

      setMensaje({
        tipo: 'error',
        texto: `Error: ${mensajeError}`
      })
    } finally {
      setSubiendo(false)
    }
  }

  // ELIMINAR IMAGEN O VIDEO
  const handleEliminar = async (id: string, url: string) => {
    if (
      !confirm(
        '¿Estás seguro de que quieres eliminar este archivo?'
      )
    ) return

    setMensaje(null)

    try {
      const path = url.split('/galeria/')[1]?.split('?')[0]

      if (path) {
        const { error: storageError } = await supabase.storage
          .from('galeria')
          .remove([`galeria/${decodeURIComponent(path)}`])

        if (storageError) throw storageError
      }

      const { error } = await supabase
        .from('galeria')
        .delete()
        .eq('id', id)

      if (error) throw error

      setMensaje({
        tipo: 'exito',
        texto: 'Archivo eliminado de la galería.'
      })

      await cargarImagenes()

    } catch (error: unknown) {
      const mensajeError =
        error instanceof Error ? error.message : 'Error desconocido'

      setMensaje({
        tipo: 'error',
        texto: `Error al eliminar: ${mensajeError}`
      })
    }
  }

  // GUARDAR EDICIÓN
  const handleGuardarEdicion = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (!editando) return

    setSubiendo(true)
    setMensaje(null)

    try {
      const { error } = await supabase
        .from('galeria')
        .update({
          titulo: editando.titulo,
          descripcion: editando.descripcion
        })
        .eq('id', editando.id)

      if (error) throw error

      setMensaje({
        tipo: 'exito',
        texto: 'Título y descripción actualizados correctamente.'
      })

      setEditando(null)

      await cargarImagenes()

    } catch (error: unknown) {
      const mensajeError =
        error instanceof Error ? error.message : 'Error desconocido'

      setMensaje({
        tipo: 'error',
        texto: `Error al editar: ${mensajeError}`
      })
    } finally {
      setSubiendo(false)
    }
  }

  // IDENTIFICAR SI ES VIDEO
  const esVideo = (url: string) => {
    return /\.(mp4|webm|ogg)(?:$|[?#])/i.test(url)
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ENCABEZADO */}
      <header className="bg-black text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">

          <h1 className="text-xl font-bold">
            Gestión de Galería
          </h1>

          <button
            onClick={() => router.push('/admin')}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition flex items-center gap-2"
          >
            ← Volver al Panel
          </button>

        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl">

        {/* MENSAJES */}
        {mensaje && (
          <div
            className={`p-4 rounded-xl mb-8 font-medium text-center ${
              mensaje.tipo === 'exito'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {mensaje.texto}
          </div>
        )}

        {/* FORMULARIO PARA SUBIR ARCHIVOS */}
        {!editando && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">

            <h2 className="text-2xl font-bold text-black mb-6">
              Subir nuevo archivo
            </h2>

            <form
              onSubmit={handleSubir}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título del archivo *
                </label>

                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ej: Taller de liderazgo"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción (opcional)
                </label>

                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows={2}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Archivo (Imagen o Video) *
                </label>

                <input
                  id="archivo"
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) =>
                    setArchivo(e.target.files?.[0] || null)
                  }
                  className="w-full p-2 border border-gray-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={subiendo}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-4 rounded-xl font-bold transition text-lg shadow-md hover:shadow-lg"
                >
                  {subiendo ? 'Subiendo...' : 'Subir archivo'}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* GALERÍA */}
        <div>

          <h2 className="text-2xl font-bold text-black mb-6">
            Archivos en la galería ({imagenes.length})
          </h2>

          {loading ? (
            <p className="text-center text-gray-600 py-10">
              Cargando...
            </p>

          ) : imagenes.length === 0 ? (

            <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
              <p className="text-gray-500 text-lg">
                No hay archivos subidos aún.
              </p>
            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {imagenes.map((img) => {
                const video = esVideo(img.imagen_url)

                return (
                  <div
                    key={img.id}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full"
                  >

                    {/* VISTA PREVIA DE FOTO O VIDEO */}
                    <div className="relative w-full h-56 bg-gray-900 shrink-0 overflow-hidden">

                      {video ? (

                        <video
                          src={img.imagen_url}
                          className="w-full h-full object-cover"
                          controls
                          preload="metadata"
                          playsInline
                        />

                      ) : (

                        <img
                          src={img.imagen_url}
                          alt={img.titulo}
                          className="w-full h-full object-cover"
                        />

                      )}

                    </div>

                    {/* INFORMACIÓN Y BOTONES */}
                    <div className="p-5 flex flex-col flex-1 justify-between bg-white">

                      <div className="mb-4">

                        <h3 className="font-bold text-black text-xl mb-1 line-clamp-1">
                          {img.titulo}
                        </h3>

                        {img.descripcion && (
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {img.descripcion}
                          </p>
                        )}

                        <span className="text-xs text-gray-400 mt-2 block">
                          {video ? 'Video' : 'Fotografía'}
                        </span>

                      </div>

                      {/* BOTONES PARA FOTOS Y VIDEOS */}
                      <div className="flex gap-3 mt-auto pt-2">

                        <button
                          type="button"
                          onClick={() => setEditando(img)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-sm shadow transition"
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleEliminar(img.id, img.imagen_url)
                          }
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold text-sm shadow transition"
                        >
                          Eliminar
                        </button>

                      </div>

                    </div>

                  </div>
                )
              })}

            </div>
          )}

        </div>

      </div>

      {/* MODAL DE EDICIÓN */}
      {editando && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">

            <h2 className="text-2xl font-bold text-black mb-6">
              Editar archivo
            </h2>

            <form
              onSubmit={handleGuardarEdicion}
              className="space-y-4"
            >

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título
                </label>

                <input
                  type="text"
                  value={editando.titulo}
                  onChange={(e) =>
                    setEditando({
                      ...editando,
                      titulo: e.target.value
                    })
                  }
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>

                <textarea
                  value={editando.descripcion || ''}
                  onChange={(e) =>
                    setEditando({
                      ...editando,
                      descripcion: e.target.value
                    })
                  }
                  rows={3}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex gap-4 pt-4">

                <button
                  type="submit"
                  disabled={subiendo}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-3 rounded-xl font-bold transition text-lg"
                >
                  {subiendo ? 'Guardando...' : 'Guardar Cambios'}
                </button>

                <button
                  type="button"
                  onClick={() => setEditando(null)}
                  disabled={subiendo}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-bold transition text-lg"
                >
                  Cancelar
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  )
}
