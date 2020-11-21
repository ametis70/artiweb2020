import DirectusSDK from '@directus/sdk-js'
import { IFile } from '@directus/sdk-js/dist/types/schemes/directus/File'
import { IRoleResponse } from '@directus/sdk-js/dist/types/schemes/response/Role'

const studentsRole = 'Alumn@'
const teachersRole = 'Docente'

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

export async function getRoleIdByName(roleName: string) {
  const role = ((await client.getRoles({
    filter: { name: { eq: roleName } },
  })) as unknown) as IRoleResponse
  return role.data[0].id
}

export async function getAllStudents() {
  const role = await getRoleIdByName(studentsRole)
  return client.getUsers({ filter: { role: { eq: role } } })
}

export async function getAllTeachers() {
  const role = await getRoleIdByName(teachersRole)
  return client.getUsers({ filter: { role: { eq: role } } })
}

interface IObra {
  id: number
  titulo: string
  descripcion: string
  user: number
  tipo_contenido_personalizado: 'external' | 'video' | 'download'
  link_contenido_personalizado: string
  ayuda_contenido_personalizado: string
  banner: number
}

export async function getAllObras() {
  return client.getItems<IObra[]>('obras')
}

export async function getObraByUserId(id: number) {
  const allObras = await getAllObras()
  return allObras.data.find((item) => item.user === id)
}

export async function getAllBios() {
  return client.getItems('biografias')
}

interface IGeneralInfo {
  texto_descripcion_columna_1: string
  texto_descripcion_columna_2: string
}

export async function getGeneralInfo() {
  return client.getItems<IGeneralInfo[]>('general')
}

interface IFileWithData extends IFile {
  data: {
    full_url: string
  }
}

export async function getImage(id: number) {
  const images = ((await client.getFiles()) as unknown) as { data: Array<IFileWithData> }
  return images.data.find((file) => file.id === id)
}

export default client
