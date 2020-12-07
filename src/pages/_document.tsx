import getConfig from 'next/config'
import Document, { Head, Html, Main, NextScript } from 'next/document'

const { publicRuntimeConfig } = getConfig()

class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${publicRuntimeConfig.basePath}/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`${publicRuntimeConfig.basePath}/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`${publicRuntimeConfig.basePath}/favicon-16x16.png`}
          />
          <link
            rel="manifest"
            href={`${publicRuntimeConfig.basePath}/site.webmanifest`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
