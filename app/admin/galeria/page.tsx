
'use client'

import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Upload,
  Trash2,
  Pencil,
  X,
  Image as ImageIcon,
  Video,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
  Files,
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

interface Imagen {
  id: string
  titulo: string
  descripcion: string | null
  imagen_url: string
  created_at: string
}

type Mensaje = {
  tipo: 'exito' | 'error'
  texto: string
}

export default function AdminGaleria() {
  const [imagenes, setImagenes] = useState<Imagen[]>([])
  const [loading, setLoading] = useState(true)
  const [subiendo, setSubiendo] = useState(false)
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [archivos, setArchivos] = useState<File[]>([])
  const [mensaje, setMensaje] = useState<Mensaje | null>(null)
  const [editando, setEditando] = useState<Imagen | null>(null)
  const [eliminando, setEliminando] = useState<string | null>(null)

  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const esVideo = (url: string) =>
    /\.(mp4|webm|ogg)(?:$|[?#])/i.test(url)

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_auth')

    if (isAuth !== 'true') {
      router.replace('/admin')
      return
    }

    cargarImagenes()
  }, [router])

  const cargarImagenes = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('galeria')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error al cargar galería:', error)
      setMensaje({
        tipo: 'error',
        texto: `No se pudo cargar la galería: ${error.message}`,
      })
    } else {
      setImagenes((data || []) as Imagen[])
    }

    setLoading(false)
  }

  const handleSeleccionarArchivos = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const seleccionados = Array.from(e.target.files || [])

    if (seleccionados.length > 7) {
      setMensaje({
        tipo: 'error',
        texto: 'Puedes seleccionar un máximo de 7 archivos por carga.',
      })
      setArchivos(seleccionados.slice(0, 7))
    } else {
      setMensaje(null)
      setArchivos(seleccionados)
    }
  }

  const handleSubir = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!titulo.trim() || archivos.length === 0) {
      setMensaje({
        tipo: 'error',
        texto: 'Escribe un título y selecciona al menos un archivo.',
      })
      return
    }

    if (archivos.length > 7) {
      setMensaje({
        tipo: 'error',
        texto: 'El máximo permitido es de 7 archivos por carga.',
      })
      return
    }

    setSubiendo(true)
    setMensaje(null)

    const rutasSubidas: string[] = []

    try {
      const registros: {
        titulo: string
        descripcion: string
        imagen_url: string
      }[] = []

      for (let i = 0; i < archivos.length; i++) {
        const archivo = archivos[i]
        const extension = archivo.name.split('.').pop()?.toLowerCase() || 'file'
        const nombreSeguro = archivo.name
          .replace(/\.[^/.]+$/, '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-zA-Z0-9-_]/g, '-')
          .slice(0, 60)

        const nombreArchivo = `${Date.now()}-${i}-${nombreSeguro}.${extension}`
        const ruta = `galeria/${nombreArchivo}`

        const { error: errorStorage } = await supabase.storage
          .from('galeria')
          .upload(ruta, archivo, {
            cacheControl: '3600',
            upsert: false,
          })

        if (errorStorage) throw errorStorage

        rutasSubidas.push(ruta)

        const { data: urlData } = supabase.storage
          .from('galeria')
          .getPublicUrl(ruta)

        registros.push({
          titulo: titulo.trim(),
          descripcion: descripcion.trim(),
          imagen_url: urlData.publicUrl,
        })
      }

      const { error: errorBD } = await supabase
        .from('galeria')
        .insert(registros)

      if (errorBD) throw errorBD

      setMensaje({
        tipo: 'exito',
        texto: `Se subieron correctamente ${archivos.length} archivo(s).`,
      })

      setTitulo('')
      setDescripcion('')
      setArchivos([])

      if (inputRef.current) {
        inputRef.current.value = ''
      }

      await cargarImagenes()
    } catch (error: unknown) {
      console.error('Error al subir archivos:', error)

      // Si falla la operación, intenta retirar los archivos que alcanzaron a subir.
      if (rutasSubidas.length > 0) {
        await supabase.storage.from('galeria').remove(rutasSubidas)
      }

      const detalle =
        error instanceof Error ? error.message : 'Error desconocido'

      setMensaje({
        tipo: 'error',
        texto: `No se pudieron subir los archivos: ${detalle}`,
      })
    } finally {
      setSubiendo(false)
    }
  }

  const obtenerRutaStorage = (url: string) => {
    try {
      const urlObjeto = new URL(url)
      const marcador = '/storage/v1/object/public/galeria/'
      const posicion = urlObjeto.pathname.indexOf(marcador)

      if (posicion === -1) return null

      return decodeURIComponent(
        urlObjeto.pathname.slice(posicion + marcador.length)
      )
    } catch {
      return null
    }
  }

  const handleEliminar = async (imagen: Imagen) => {
    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar "${imagen.titulo}"? Esta acción no se puede deshacer.`
    )

    if (!confirmar) return

    setEliminando(imagen.id)
    setMensaje(null)

    try {
      const ruta = obtenerRutaStorage(imagen.imagen_url)

      if (ruta) {
        const { error: errorStorage } = await supabase.storage
          .from('galeria')
          .remove([ruta])

        if (errorStorage) throw errorStorage
      }

      const { error: errorBD } = await supabase
        .from('galeria')
        .delete()
        .eq('id', imagen.id)

      if (errorBD) throw errorBD

      setImagenes((actuales) =>
        actuales.filter((item) => item.id !== imagen.id)
      )

      setMensaje({
        tipo: 'exito',
        texto: 'El archivo fue eliminado correctamente.',
      })
    } catch (error: unknown) {
      console.error('Error al eliminar:', error)

      const detalle =
        error instanceof Error ? error.message : 'Error desconocido'

      setMensaje({
        tipo: 'error',
        texto: `No se pudo eliminar: ${detalle}`,
      })
    } finally {
      setEliminando(null)
    }
  }

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
          titulo: editando.titulo.trim(),
          descripcion: editando.descripcion?.trim() || '',
        })
        .eq('id', editando.id)

      if (error) throw error

      setImagenes((actuales) =>
        actuales.map((item) =>
          item.id === editando.id ? editando : item
        )
      )

      setEditando(null)

      setMensaje({
        tipo: 'exito',
        texto: 'Los cambios se guardaron correctamente.',
      })
    } catch (error: unknown) {
      const detalle =
        error instanceof Error ? error.message : 'Error desconocido'

      setMensaje({
        tipo: 'error',
        texto: `No se pudo guardar: ${detalle}`,
      })
    } finally {
      setSubiendo(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f8]">
      <header className="bg-[#090909] px-4 py-5 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
              Fundación HNV
            </p>
            <h1 className="mt-1 text-xl font-extrabold md:text-2xl">
              Gestión de galería
            </h1>
          </div>

          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-red-600"
          >
            <ArrowLeft size={17} />
            <span className="hidden sm:inline">Volver al panel</span>
            <span className="sm:hidden">Volver</span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        {mensaje && (
          <div
            className={`mb-7 flex items-start gap-3 rounded-2xl border p-4 ${
              mensaje.tipo === 'exito'
                ? 'border-green-200 bg-green-50 text-green-800'
                : 'border-red-200 bg-red-50 text-red-800'
            }`}
          >
            {mensaje.tipo === 'exito' ? (
              <CheckCircle2 className="mt-0.5 shrink-0" size={20} />
            ) : (
              <AlertCircle className="mt-0.5 shrink-0" size={20} />
            )}
            <p className="text-sm font-semibold">{mensaje.texto}</p>
            <button
              type="button"
              onClick={() => setMensaje(null)}
              className="ml-auto"
              aria-label="Cerrar mensaje"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {!editando && (
          <section className="mb-12 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-8">
            <div className="mb-7 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <Upload size={26} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 md:text-2xl">
                  Subir archivos
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Puedes seleccionar hasta 7 fotos o videos juntos.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubir} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Título del grupo *
                </label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ejemplo: Actividad comunitaria"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Descripción (opcional)
                </label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows={3}
                  placeholder="Escribe una descripción para estos archivos..."
                  className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3.5 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Fotografías y videos *
                </label>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*,video/mp4,video/webm,video/ogg"
                  multiple
                  onChange={handleSeleccionarArchivos}
                  className="w-full rounded-xl border border-gray-300 p-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-red-50 file:px-4 file:py-2 file:font-bold file:text-red-700 hover:file:bg-red-100"
                />
                <p className="mt-2 text-xs text-gray-400">
                  Máximo 7 archivos por carga. Cada archivo se guardará como
                  una publicación individual con el mismo título y descripción.
                </p>
              </div>

              {archivos.length > 0 && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-800">
                    <Files size={18} className="text-red-600" />
                    {archivos.length} archivo(s) seleccionado(s)
                  </div>

                  <ul className="space-y-2">
                    {archivos.map((archivo, index) => (
                      <li
                        key={`${archivo.name}-${index}`}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        {archivo.type.startsWith('video/') ? (
                          <Video size={16} className="text-red-600" />
                        ) : (
                          <ImageIcon size={16} className="text-red-600" />
                        )}
                        <span className="min-w-0 flex-1 truncate">
                          {archivo.name}
                        </span>
                        <span className="shrink-0 text-xs text-gray-400">
                          {(archivo.size / (1024 * 1024)).toFixed(1)} MB
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => {
                      setArchivos([])
                      if (inputRef.current) inputRef.current.value = ''
                    }}
                    className="mt-4 text-sm font-bold text-red-600 hover:text-red-800"
                  >
                    Quitar selección
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={subiendo}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-6 py-4 font-extrabold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 disabled:cursor-wait disabled:opacity-60"
              >
                {subiendo ? (
                  <>
                    <LoaderCircle className="animate-spin" size={20} />
                    Subiendo archivos...
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    Subir {archivos.length || ''} archivo(s)
                  </>
                )}
              </button>
            </form>
          </section>
        )}

        <section>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                Contenido publicado
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
                Archivos en la galería ({imagenes.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={cargarImagenes}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-red-300 hover:text-red-600"
            >
              Actualizar
            </button>
          </div>

          {loading ? (
            <div className="py-16 text-center text-gray-500">
              <LoaderCircle className="mx-auto mb-3 animate-spin" size={28} />
              Cargando galería...
            </div>
          ) : imagenes.length === 0 ? (
            <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center">
              <ImageIcon className="mx-auto mb-4 text-gray-300" size={42} />
              <p className="font-bold text-gray-800">
                Todavía no hay publicaciones.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Sube tus primeras fotografías o videos desde el formulario.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {imagenes.map((img) => {
                const video = esVideo(img.imagen_url)

                return (
                  <article
                    key={img.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                  >
                    <div className="relative aspect-square bg-black">
                      {video ? (
                        <video
                          src={img.imagen_url}
                          className="h-full w-full object-contain"
                          controls
                          preload="metadata"
                          playsInline
                        />
                      ) : (
                        <img
                          src={img.imagen_url}
                          alt={img.titulo}
                          className="h-full w-full object-contain"
                        />
                      )}
                      <span className="absolute left-3 top-3 rounded-full bg-black/75 px-3 py-1 text-xs font-bold text-white">
                        {video ? 'VIDEO' : 'FOTOGRAFÍA'}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="line-clamp-1 text-lg font-extrabold text-gray-900">
                        {img.titulo}
                      </h3>
                      {img.descripcion && (
                        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                          {img.descripcion}
                        </p>
                      )}

                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setEditando(img)}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                        >
                          <Pencil size={16} />
                          Editar
                        </button>

                        <button
                          type="button"
                          disabled={eliminando === img.id}
                          onClick={() => handleEliminar(img)}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-3 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
                        >
                          {eliminando === img.id ? (
                            <LoaderCircle size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                          {eliminando === img.id ? 'Eliminando' : 'Eliminar'}
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </div>

      {/* MODAL DE EDICIÓN */}
      {editando && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-gray-900">
                Editar archivo
              </h2>
              <button
                type="button"
                onClick={() => setEditando(null)}
                disabled={subiendo}
                aria-label="Cerrar edición"
                className="rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleGuardarEdicion} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Título
                </label>
                <input
                  type="text"
                  value={editando.titulo}
                  onChange={(e) =>
                    setEditando({ ...editando, titulo: e.target.value })
                  }
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Descripción
                </label>
                <textarea
                  value={editando.descripcion || ''}
                  onChange={(e) =>
                    setEditando({
                      ...editando,
                      descripcion: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3.5 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setEditando(null)}
                  disabled={subiendo}
                  className="flex-1 rounded-xl bg-gray-100 px-5 py-3.5 font-bold text-gray-700 transition hover:bg-gray-200 disabled:opacity-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={subiendo}
                  className="flex-1 rounded-xl bg-red-600 px-5 py-3.5 font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
                >
                  {subiendo ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
