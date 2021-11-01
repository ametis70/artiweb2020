import { PartialItem } from '@directus/sdk'
import preval from 'next-plugin-preval'
import {
  AlumneType,
  EventType,
  extendWithAvatars,
  getAllAlumnes,
  getAllEvents,
  login,
  ObraType,
  ResponsiveImageUrls,
} from './api'

type FetchedAlumesType = Pick<
  AlumneType,
  'id' | 'nombre' | 'apellido' | 'carrera' | 'slug' | 'avatar'
> & {
  obra: Pick<ObraType, 'slug'>
}

export type GlobalAlumnesData = Omit<FetchedAlumesType, 'avatar'> & {
  avatar: ResponsiveImageUrls
}

async function getData(): Promise<{
  alumnes: GlobalAlumnesData[]
  events: PartialItem<EventType>[]
}> {
  await login()

  const { data } = await getAllAlumnes({
    fields: 'id,nombre,avatar,apellido,carrera,slug,obra.slug',
  })

  const _data = data as unknown as FetchedAlumesType[]

  const alumnesWithAvatars = await Promise.all(
    _data.map(async (a) => extendWithAvatars(a)),
  )

  const events = await getAllEvents()

  return { alumnes: alumnesWithAvatars, events: events.data }
}

export default preval(getData())
