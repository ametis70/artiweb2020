import { PartialItem } from '@directus/sdk'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import ObraTabs from '../../components/ObraTabs'
import {
  AlumneType,
  extendWithBanner,
  extendWithPaper,
  getAllObras,
  login,
  ObraType,
  ResponsiveImageUrls,
} from '../../lib/api'
import { ReturnedPromiseResolvedType } from '../../lib/util'

export type ObrasPageObra = ObraType & {
  alumnes: Pick<AlumneType, 'nombre' | 'apellido' | 'carrera' | 'slug'>[]
  banner: ResponsiveImageUrls
}

const Obra: NextPage<{ obra: ObrasPageObra }> = ({ obra }) => {
  return <ObraTabs obra={obra} />
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  await login()
  const obras = await getAllObras({
    filter: {
      slug: {
        _eq: slug,
      },
    },
    fields: '*,alumnes.nombre,alumnes.apellido,alumnes.carrera,alumnes.slug',
  })

  const obra = await extendWithBanner(obras.data[0])

  let obraComplete: ReturnedPromiseResolvedType<typeof extendWithPaper> | undefined

  if (obra.investigacion_archivo) {
    obraComplete = await extendWithPaper(obra)
  }

  return { props: { obra: obraComplete ? obraComplete : obra } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  await login()
  const obras = await getAllObras({
    fields: 'slug',
  })

  return {
    paths: obras.data.map((o) => ({ params: { slug: o.slug } })),
    fallback: false,
  }
}

export default Obra
