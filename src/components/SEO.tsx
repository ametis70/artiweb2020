import Head from 'next/head'

const defaultTitle = 'Artimañas 2020'

type SEOProps = {
  title?: string
}

const SEO: React.FC<SEOProps> = ({ title }) => {
  return (
    <Head>
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default SEO
