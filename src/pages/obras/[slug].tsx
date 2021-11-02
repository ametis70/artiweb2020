import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import ObraTabs from '../../components/ObraTabs'
import {
  AlumneType,
  extendWithBanner,
  getAllObras,
  login,
  ObraType,
  ResponsiveImageUrls,
} from '../../lib/api'

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
  const obra = await getAllObras({
    filter: {
      slug: {
        _eq: slug,
      },
    },
    fields: '*,alumnes.nombre,alumnes.apellido,alumnes.carrera,alumnes.slug',
  })

  const obraWithAvatar = await extendWithBanner(obra.data[0])

  return { props: { obra: obraWithAvatar } }
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
