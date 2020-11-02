import DirectusSDK from '@directus/sdk-js'
import { IFile } from '@directus/sdk-js/dist/types/schemes/directus/File'

const studentsRole = 'Alumn@'
const teachersRole = 'Docente'

const client = new DirectusSDK({
  mode: 'jwt',
  project: '-',
  url: process.env.DIRECTUS_HOST,
})

export async function login() {
  return client.login({
    email: process.env.DIRECTUS_API_USER,
    password: process.env.DIRECTUS_API_PASSWORD,
  })
}

export async function getRoleIdByName(roleName: string) {
  const role = await client.getRoles({ filter: { name: { eq: roleName } } })
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

export async function getAllObras() {
  return client.getItems('obras')
}

export async function getObraByUserId(id: number) {
  const allObras = await getAllObras()
  return allObras.data.find((item) => item.user === id)
}

export async function getAllBios() {
  return client.getItems('biografias')
}

export async function getGeneralInfo() {
  return client.getItems('general')
}

export async function getImage(id: number) {
  const images = await client.getFiles()
  return images.data.find((file) => file.id === id)
}

export default client
