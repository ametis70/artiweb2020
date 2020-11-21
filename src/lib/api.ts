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

export interface IStudentWithObra {
  slug: string
  obra_url: string
  id: number
  first_name: string
  last_name: string
  full_name: string
  avatar: number
}

export async function getAllStudentsWithObra() {
  const students = await getAllStudents()
  const studentsWithObra: IStudentWithObra[] = students.data.map((student) => {
    const { first_name, last_name, avatar, id } = student
    const full_name = `${first_name} ${last_name}`
    const slug = student.last_name.toLowerCase().replace(' ', '_')
    const obra_url = `/obras?obra=${slug}`

    return {
      id,
      first_name,
      last_name,
      full_name,
      slug,
      obra_url,
      avatar,
    }
  })
  return studentsWithObra
}

export interface IBio {
  id: number
  user: number
  texto: string
  carrera: 'multimedia' | 'musica_popular'
}

export async function getAllBios() {
  return client.getItems<IBio[]>('biografias')
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
