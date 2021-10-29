import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import ObraTabs from '../../components/ObraTabs'
import { AlumneType, getAllObras, login, ObraType } from '../../lib/api'

export type ObrasPageObra = ObraType & {
  alumnes: Pick<AlumneType, 'nombre' | 'apellido' | 'carrera' | 'slug'>[]
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

  return { props: { obra: obra.data[0] } }
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
