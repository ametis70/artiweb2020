import Head from 'next/head'

import Festival from '../components/Festival'
import Alumnxs from '../components/Alumnxs'

export default function Home() {
  return (
    <>
      <Head>
        <title>Artimañas 2020</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Festival />
      <Alumnxs />
    </>
  )
}
