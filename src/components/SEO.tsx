import Head from 'next/head'
import { useRouter } from 'next/router'

const defaultTitle = 'Artimañas 2020'

type SEOProps = {
  title?: string
}

const baseUrl = 'https://taller5.ludic.cc/artimanias/2020'

const SEO: React.FC<SEOProps> = ({ title }) => {
  const t = title ? `${title} | ${defaultTitle}` : defaultTitle
  const router = useRouter()

  return (
    <Head>
      <title>{t}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Artimañas es un evento que tiene como objetivo el compartir el trabajo final de l·s alumn·s de la cátedra de Taller de Diseño Multimedial V, el resultado de las experiencias empírica y práctica de las diferentes temáticas relevantes que eligieron l·s futur·s licenciad·s, concretando así sus proyectos de graduación"
      />
      <meta property="og:title" content={t} key="ogtitle" />
      <meta property="og:url" content={`${baseUrl}${router.pathname}`} />
      <meta
        property="og:description"
        content="Artimañas es un evento que tiene como objetivo el compartir el trabajo final de l·s alumn·s de la cátedra de Taller de Diseño Multimedial V, el resultado de las experiencias empírica y práctica de las diferentes temáticas relevantes que eligieron l·s futur·s licenciad·s, concretando así sus proyectos de graduación"
        key="ogdesc"
      />
      <meta property="og:image" content="android-chrome-512x512.png" key="ogimage" />
      <meta
        property="og:image"
        content={`${baseUrl}/android-chrome-512x512.png`}
        key="ogimage"
      />
    </Head>
  )
}

export default SEO
