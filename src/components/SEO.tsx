import Head from 'next/head'
import { useRouter } from 'next/router'
import { getBasePath } from '../lib/util'

type SEOProps = {
  title?: string
  description?: string
  image?: string
}

const url = process.env.NEXT_PUBLIC_OG_DOMAIN
const baseUrl = `${url ? url : ''}${getBasePath()}`

const defaults: SEOProps = {
  description:
    'Artimañas es un evento que tiene como objetivo el compartir el trabajo final de l·s alumn·s de la cátedra de Taller de Diseño Multimedial V, el resultado de las experiencias empírica y práctica de las diferentes temáticas relevantes que eligieron l·s futur·s licenciad·s, concretando así sus proyectos de graduación',
  title: 'Artimañas 2020',
  image: `android-chrome-512x512.png`,
}

const SEO: React.FC<SEOProps> = ({
  title = defaults.title,
  description = defaults.description,
  image = defaults.image,
}) => {
  const router = useRouter()

  const t = title !== defaults.title ? `${title} | ${defaults.title}` : title

  return (
    <Head>
      <title>{t}</title>
      <meta key="og:title" property="og:title" content={t} />
      <meta key="description" name="description" content={description} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:url" property="og:url" content={`${baseUrl}${router.asPath}`} />
      <meta key="og:image" property="og:image" content={`${baseUrl}/${image}`} />
    </Head>
  )
}

export default SEO
