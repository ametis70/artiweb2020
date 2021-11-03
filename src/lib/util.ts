import { AlumneType } from './api'
import getConfig from 'next/config'
import { PartialItem } from '@directus/sdk'

const { publicRuntimeConfig } = getConfig()
const { basePath } = publicRuntimeConfig

export function getAlumneFullName<
  T extends PartialItem<Pick<AlumneType, 'nombre' | 'apellido'>>,
>(alumne: T) {
  if (alumne.nombre && alumne.apellido) {
    return `${alumne.nombre} ${alumne.apellido}`
  }

  throw new Error('Alumne is missing nombre or apellido properties')
}

export function isGuest<T extends PartialItem<Pick<AlumneType, 'carrera'>>>(alumne: T) {
  if (!alumne.carrera) {
    throw new Error('Alumne is missing carrera property')
  }

  return alumne.carrera !== 'multimedia'
}

export function splitAlumnes<T extends PartialItem<Pick<AlumneType, 'carrera'>>>(
  alumnes: T[],
) {
  const multimedia: T[] = []
  const invitades: T[] = []

  alumnes.forEach((alumne) => {
    if (!isGuest(alumne)) {
      multimedia.push(alumne)
      return
    }

    invitades.push(alumne)
  })

  return [multimedia, invitades]
}

export function getBasePath() {
  return basePath === '' ? '/' : basePath
}

export type ReturnedPromiseResolvedType<T> = T extends (...args: any[]) => Promise<infer R> ? R : never
