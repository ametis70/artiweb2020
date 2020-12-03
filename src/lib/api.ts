import getConfig from 'next/config'
import DirectusSDK from '@directus/sdk-js'
import { IFile } from '@directus/sdk-js/dist/types/schemes/directus/File'
import { IRoleResponse } from '@directus/sdk-js/dist/types/schemes/response/Role'
import bent from 'bent'

import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

const { serverRuntimeConfig } = getConfig()
const writeFile = promisify(fs.writeFile)
const getBuffer = bent('buffer')

const assetsDir = path.join(serverRuntimeConfig.PROJECT_ROOT, '/src/assets/')
const avatarsDir = path.join(assetsDir, '/avatars/')
const bannersDir = path.join(assetsDir, '/banners/')

const createDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    console.info(`Creating directory ${dir}`)
    fs.mkdirSync(dir)
  }
}

createDir(assetsDir)
createDir(avatarsDir)
createDir(bannersDir)

const studentsRole = 'Alumn@'
const guestRole = 'Invitad@'
const teachersRole = 'Docente'

export interface IFileWithData extends IFile {
  filename_disk: string
  data: {
    full_url: string
  }
}

export async function getImage(id: number) {
  const images = ((await client.getFiles()) as unknown) as { data: Array<IFileWithData> }
  return images.data.find((file) => file.id === id)
}

export async function downloadImage(id: number, dir: string): Promise<string | null> {
  const imageData = await getImage(id)
  if (!imageData) return null
  const fileDir = path.join(dir, imageData.filename_disk)

  if (!fs.existsSync(fileDir)) {
    console.info(`Downloading image with id ${id} as ${fileDir}`)
    const buffer = await getBuffer(imageData.data.full_url.replace('http', 'https'))
    await writeFile(fileDir, buffer as Buffer)
    console.info(`Succesfully downloaded image with ${fileDir}`)
  } else {
    console.info(`Image ${fileDir} exists. Skipping download`)
  }

  return imageData.filename_disk
}

const client = new DirectusSDK({
  mode: 'jwt',
  project: '_',
  url: process.env.DIRECTUS_HOST,
})

export async function login() {
  return client.login({
    email: process.env.DIRECTUS_API_USER,
    password: process.env.DIRECTUS_API_PASSWORD,
  })
}

export interface IObra {
  id: number
  titulo: string
  descripcion: string
  user: number
  tipo_contenido_personalizado: 'external' | 'video' | 'downloadable'
  link_contenido_personalizado: string
  ayuda_contenido_personalizado: string
  banner: number
  user2: number
}

export async function getAllObras() {
  return client.getItems<IObra[]>('obras')
}

export async function getObraByUserId(id: number) {
  const allObras = await getAllObras()
  return allObras.data.find((item) => item.user === id)
}

export async function getRoleIdByName(roleName: string) {
  const role = ((await client.getRoles({
    filter: { name: { eq: roleName } },
  })) as unknown) as IRoleResponse
  return role.data[0].id
}

export async function getAllTeachers() {
  const role = await getRoleIdByName(teachersRole)
  return client.getUsers({ filter: { role: { eq: role } } })
}

export async function getAllStudents() {
  const role = await getRoleIdByName(studentsRole)
  return client.getUsers({ filter: { role: { eq: role } } })
}

export async function getAllGuests() {
  const role = await getRoleIdByName(guestRole)
  return client.getUsers({ filter: { role: { eq: role } } })
}

export interface IBio {
  id: number
  user: number
  texto: string
  carrera: 'multimedia' | 'musica_popular' | 'artes_audiovisuales'
}

export async function getAllBios() {
  return client.getItems<IBio[]>('biografias')
}

export interface IParticipantExtended {
  obra_slug: string
  obra_url: string
  alumne_url: string
  alumne_slug: string
  id: number
  first_name: string
  last_name: string
  full_name: string
  avatar: number
  guest: boolean
  bio: IBio
  obra: IObra
  bannerUrl: string | null
  avatarUrl: string | null
}

export async function getAllParticipantsExtended() {
  const students = await getAllStudents()
  const guests = await getAllGuests()
  const allBios = await getAllBios()
  const allObras = await getAllObras()

  const participants = [...students.data, ...guests.data]

  const participantsExtended: IParticipantExtended[] = await Promise.all(
    participants.map(async (person) => {
      const { first_name, last_name, avatar, id } = person
      const obra = allObras.data.find((o) => o.user === id || o.user2 === id)
      const bio = allBios.data.find((b) => b.user === id)

      let guest = bio.carrera !== 'multimedia' ? true : false

      let avatarUrl = null
      if (avatar) {
        avatarUrl = await downloadImage(avatar, avatarsDir)
      }

      let bannerUrl = null
      if (obra && obra.banner) {
        bannerUrl = await downloadImage(obra.banner, bannersDir)
      }

      const full_name = `${first_name} ${last_name}`
      const alumne_slug = last_name.toLowerCase().replace(/ /gi, '_')
      const alumne_url = `/alumnes?alumne=${alumne_slug}`
      const obra_slug = obra.titulo.toLowerCase().replace(/ /gi, '_')
      const obra_url = `/obras?obra=${obra_slug}`

      return {
        id,
        first_name,
        last_name,
        full_name,
        alumne_slug,
        alumne_url,
        obra_slug,
        obra_url,
        avatar,
        guest,
        bio,
        obra,
        avatarUrl,
        bannerUrl,
      }
    }),
  )

  return participantsExtended
}

export interface IEvent {
  id: number
  dia_entero: boolean
  fecha: string
  hora_comienzo: string
  hora_fin: string
  mostrar_user_asociado: boolean
  titulo: string
  url: string
  user_asociado: number
  user_name?: string
}

export async function getAllEvents() {
  return client.getItems<IEvent[]>('cronograma')
}

export interface IGeneralInfo {
  texto_descripcion_columna_1: string
  texto_descripcion_columna_2: string
}

export async function getGeneralInfo() {
  return client.getItems<IGeneralInfo[]>('general')
}

export default client
