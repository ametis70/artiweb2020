import fs from 'fs'
import path from 'path'

import { Directus, ID, FileItem, QueryOne, FieldItem, QueryMany } from '@directus/sdk'

export const publicDir = path.join(process.cwd(), 'public')
export const assetsDir = path.join(publicDir, 'cms')
export const avatarsDir = path.join(assetsDir, 'avatars')
export const bannersDir = path.join(assetsDir, 'banners')
export const papersDir = path.join(assetsDir, 'papers')

const createDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    console.info(`Creating directory ${dir}`)
    fs.mkdirSync(dir)
  }
}

createDir(assetsDir)
createDir(avatarsDir)
createDir(bannersDir)
createDir(papersDir)

export type AlumneType = {
  id: ID
  avatar: ID
  nombre: string
  apellido: string
  bio: string
  carrera: 'multimedia' | 'musica_popular' | 'artes_audiovisuales' | 'composicion'
  slug: string
  obra: ID | ObraType
}

export type EventType = {
  id: ID
  titulo: string
  hora_comienzo: Date
  hora_fin: Date
  fecha: Date
  tipo_evento: 'performance' | 'multimedia' | 'invitade' | 'festival'
  url?: string
  alumne?: ID | AlumneType
}

export type ObraType = {
  id: ID
  titulo: string
  descripcion: string
  banner: ID
  tipo_contenido_personalizado: 'external' | 'video' | 'downloadable'
  link_contenido_personalizado: string
  ayuda_contenido_personalizado: string
  investigacion_titulo?: string
  investigacion_abstract?: string
  investigacion_archivo?: FileItem
  slug: string
  alumnes: ID[] | AlumneType[]
  video_links: string
  video_titles?: string
}

export type GeneralInfoType = {
  texto_descripcion_columna_1: string
  texto_descripcion_columna_2: string
  video_apertura_titulo: string
  video_apertura: string
  video_cierre_titulo: string
  video_cierre: string
}

type APITypes = {
  alumnes: AlumneType
  cronograma: EventType
  obras: ObraType
  general: GeneralInfoType
}

const client = new Directus<APITypes>(process.env.PUBLIC_URL)

export async function login() {
  return client.auth.login({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  })
}

const obras = client.items('obras')
const cronograma = client.items('cronograma')
const general = client.items('general')
const alumnes = client.items('alumnes')

export async function getAllEvents(query?: QueryMany<EventType>) {
  return cronograma.readMany(query)
}

export async function getAllAlumnes(query?: QueryMany<AlumneType>) {
  return alumnes.readMany(query)
}

export async function getAlumneById(id: ID, query?: QueryOne<AlumneType>) {
  return alumnes.readOne(id, query)
}

export async function getAllObras(query?: QueryMany<ObraType>) {
  return obras.readMany(query)
}

export async function getObraById(id: ID, query?: QueryOne<ObraType>) {
  return obras.readOne(id, query)
}

export async function getGeneralInfo() {
  return general.readMany()
}

export async function getAllFiles(query?: QueryMany<FileItem>) {
  return client.files.readMany(query)
}

export async function getFileById(id: ID, query?: QueryOne<FieldItem>) {
  return client.files.readOne(id, query)
}

export async function downloadFile(
  resource: string,
  downloadPath: string,
): Promise<void> {
  const bearer = 'Bearer ' + client.auth.token
  const url = `${process.env.PUBLIC_URL}${resource}`
  const response = await fetch(url, { headers: { Authorization: bearer } })
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  fs.createWriteStream(downloadPath).write(buffer)
  console.info(`Downloaded ${downloadPath}`)
}

export type ImageTransform = {
  fit?: 'cover' | 'contain' | 'inside' | 'outside'
  width: number
  height?: number
  quality?: number
  withoutEnlargement?: boolean
  format: 'jpg' | 'png' | 'webp' | 'tiff'
  transforms?: unknown[]
}

export type DownloadedImage = {
  path: string
  transformed: boolean
  width: number
}

type ImageDownloader = (
  id: ID,
  directory: string,
  params?: ImageTransform,
) => Promise<DownloadedImage>

export const downloadImage: ImageDownloader = async (id, directory, params) => {
  let fileMeta: FileItem

  try {
    fileMeta = await getFileById(id)
  } catch {
    throw new Error(`File with ID ${id} does not exist`)
  }

  if (!/^image*/.test(fileMeta.type)) {
    throw new Error('Tried to transform a file that is not an image')
  }

  const filename = params
    ? `${id}-${params.width}w.${params.format}`
    : fileMeta.filename_disk

  const filePath = path.join(directory, filename)
  const relativePath = path.relative(publicDir, filePath)

  let transform = ''

  if (!fs.existsSync(filePath)) {
    if (params) {
      transform = '?'
      const entries = Object.entries(params)
      entries.forEach((entry, i) => {
        const [key, value] = entry
        transform = `${transform}${key}=${value}${i < entries.length - 1 ? '&' : ''}`
      })
    }

    await downloadFile(`/assets/${id}${transform}`, filePath)
  }

  return {
    path: relativePath,
    transformed: params !== undefined,
    width: params?.width ?? fileMeta.width,
  }
}

export type ResponsiveImageUrls = {
  jpg: DownloadedImage[]
  webp: DownloadedImage[]
}

export const downloadAvatar = async (id: ID) => {
  const sizes = [96, 256, 500]
  const quality = 85

  const jpg = await Promise.all(
    sizes.map(
      async (w) =>
        await downloadImage(id, avatarsDir, { width: w, format: 'jpg', quality }),
    ),
  )

  const webp = await Promise.all(
    sizes.map(
      async (w) =>
        await downloadImage(id, avatarsDir, { width: w, format: 'webp', quality }),
    ),
  )

  return { jpg, webp }
}
